import { PrismaClient } from "@prisma/client";
import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { TaskStatus } from "../../../domain/task/TaskStatus";
import { v4 } from "uuid";
import { ApplicationLogger } from "../../utils/logger/ApplicationLogger";
import { injectable, inject } from "inversify";
import { TYPES } from "../../container/types";

@injectable()
class TaskDataSource implements TaskRepository {
    constructor(
        @inject(TYPES.PrismaClient) private _prisma: PrismaClient,
        @inject(TYPES.ApplicationLogger) private _logger: ApplicationLogger) {}

    public async register(task: Task): Promise<Task | null> {
        // 親タスク登録
        console.log("親タスク登録");
        const registeredUser = await this._prisma.tasks.create({
            data: {
                task_name: task.taskName,
                task_status: task.taskStatus.taskStatusId,
                user_id: task.userId,
            }
        });
        if (!registeredUser) return null;

        // 子タスク登録
        console.log("子タスク登録");
        const registeredChildTasks = task.childTasks.map(async childTask => {
            const registeredChildTask = await this._prisma.tasks.create({
                data: {
                    task_name: childTask.taskName,
                    task_status: childTask.taskStatus.taskStatusId,
                    parent_task_id: registeredUser.task_id,
                    user_id: childTask.userId,
                }
            });

            if (!registeredChildTask) throw new Error("");

            console.log("子タスク再構築");
            const res = Task.recreate(
                registeredChildTask.task_id,
                registeredChildTask.task_name,
                TaskStatus.createNewTask(),
                new Array<Task>(),
                registeredChildTask.user_id,
                registeredChildTask.created_at,
                registeredChildTask.updated_at);
            return res;
        });

        // 子タスク再構築
        console.log("子タスク再構築開始");
        console.log(`task_id: ${registeredUser.task_id}`);
        const rese = await Promise.all(registeredChildTasks);

        // 親タスク再構築
        console.log("親タスク再構築");
        const resTask = Task.recreate(
            registeredUser.task_id,
            registeredUser.task_name,
            TaskStatus.createNewTask(),
            rese,
            registeredUser.user_id,
            registeredUser.created_at,
            registeredUser.updated_at);
        return resTask;
    }

    public async findByTaskName(taskName: string, userId: string): Promise<Task | null> {
        const foundTask = await this._prisma.tasks.findFirst({
            where: {
                task_name: taskName,
                user_id: userId,
            }
        });
        if (!foundTask) return null;

        const foundChildTasks = await this._prisma.tasks.findMany({
            where: {
                parent_task_id: foundTask.task_id,
                user_id: userId,
            }
        });

        const childTasks = foundChildTasks.map(value => {
            return Task.recreate(value.task_id, value.task_name, TaskStatus.createNewTask(), new Array<Task>(), value.user_id, value.created_at, value.updated_at);
        });

        const taskStatus = TaskStatus.createNewTask();
        const task = Task.recreate(foundTask.task_id, foundTask.task_name, taskStatus, childTasks, foundTask.user_id, foundTask.created_at, foundTask.updated_at);
        return task;
    }

    public async count(taskName: string, taskStatusId: string, userId: string): Promise<number> {
        this._logger.info("TaskDataSource#count");
        let whereClause = {};
        if (taskName === "") {
            whereClause = {
                task_status: taskStatusId,
                user_id: userId,
            };
        } else {
            whereClause = {
                task_name: taskName,
                task_status: taskStatusId,
                user_id: userId,
            };
        }

        console.log(whereClause);
        const count = await this._prisma.tasks.count({
            where: whereClause,
        });

        return count;
    }

    public async search(taskName: string, taskStatusId: string, userId: string, limit: number, offset: number): Promise<Task[]> {
        // TODO 子タスクの取得出来るように修正する。
        let whereClause = {};
        if (taskName === "") {
            whereClause = {
                task_status: taskStatusId,
                user_id: userId,
            };
        } else {
            whereClause = {
                task_name: taskName,
                task_status: taskStatusId,
                user_id: userId,
            };
        }

        const taskSources = await this._prisma.tasks.findMany({
            where: whereClause,
            skip: offset * limit,
            take: limit,    
        });

        const tasks = taskSources.map(value => {
            const taskStatus = TaskStatus.createNewTask();
            const task = Task.recreate(value.task_id, value.task_name, taskStatus, new Array<Task>(), value.user_id, value.created_at, value.updated_at);
            return task;
        });
        return tasks;
    }

    public async generateTaskId(): Promise<string> {
        return v4().toString().replace(/-/g, '');
    }
}

export { TaskDataSource };
