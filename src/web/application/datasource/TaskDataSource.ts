import { PrismaClient } from "@prisma/client";
import { Task } from "../../../domain/task/Task";
import { TaskRepository } from "../../../domain/task/TaskRepository";
import { TaskStatus } from "../../../domain/task/TaskStatus";
import { v4 } from "uuid";
import { ApplicationLogger } from "../../utils/logger/ApplicationLogger";

class TaskDataSource implements TaskRepository {
    constructor(
        private _prisma: PrismaClient,
        private _logger: ApplicationLogger) {}

    public async register(task: Task): Promise<number> {
        const registeredUser = await this._prisma.tasks.create({
            data: {
                task_id: task.taskId,
                task_name: task.taskName,
                task_status: task.taskStatus.taskStatusId,
                user_id: task.userId,
            }
        });
        if (!registeredUser) return 0;

        return 1;
    }

    public async findByTaskName(taskName: string, userId: string): Promise<Task | null> {
        const foundTask = await this._prisma.tasks.findFirst({
            where: {
                task_name: taskName,
                user_id: userId,
            }
        });
        if (!foundTask) return null;

        const taskStatus = TaskStatus.createNewTask();
        const task = Task.recreate(foundTask.task_id, foundTask.task_name, taskStatus, foundTask.user_id, foundTask.created_at, foundTask.updated_at);
        return task;
    }

    public async count(taskName: string, taskStatusId: string, userId: string): Promise<number> {
        const count = await this._prisma.tasks.count({
            where: {
                task_name: taskName,
                task_status: taskStatusId,
                user_id: userId,
            },
        });

        return count;
    }

    public async search(taskName: string, taskStatusId: string, userId: string, limit: number, offset: number): Promise<Task[]> {
        const taskSources = await this._prisma.tasks.findMany({
            where: {
                task_name: taskName,
                task_status: taskStatusId,
                user_id: userId,
            },
            skip: offset * limit,
            take: limit,    
        });

        const tasks = taskSources.map(value => {
            const taskStatus = TaskStatus.createNewTask();
            const task = Task.recreate(value.task_id, value.task_name, taskStatus, value.user_id, value.created_at, value.updated_at);
            return task;
        });
        return tasks;
    }

    public async generateTaskId(): Promise<string> {
        return v4().toString().replace(/-/g, '');
    }
}

export { TaskDataSource };
