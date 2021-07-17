import { Task } from "../../domain/task/Task";
import { TaskRepository } from "../../domain/task/TaskRepository";
import { ApplicationLogger } from "../../utils/logger/ApplicationLogger";

class TaskMemorySource implements TaskRepository {
    private _tasks: Array<Task>;

    constructor(private _logger: ApplicationLogger) {
        this._tasks = new Array<Task>();

        const task = Task.create("1", "テスト", "TEST001");
        this._tasks.push(task);
    }

    public async register(task: Task): Promise<number> {
        this._tasks.push(task);
        return 1;
    }

    public async findByTaskName(taskName: string, userId: string): Promise<Task | null> {
        const findTask = this._tasks.find(task => task.taskName === taskName && task.userId === userId);
        return findTask ? findTask : null;
    }

    public async count(taskName: string, taskStatusId: string, userId: string): Promise<number> {
        const filterTask = this._tasks.filter(task => task.taskStatus.taskStatusId === taskStatusId && task.userId === userId);
        console.log(filterTask);
        console.log(taskName);

        if (taskName !== "") {
            // taskNameが存在する場合
            console.log("Hi11");
            const count = filterTask.filter(task => task.taskName === taskName);
            return count.length;
        } else {
            return filterTask.length;
        }
    }

    public async search(taskName: string, taskStatusId: string, userId: string, limit: number, offset: number): Promise<Task[]> {
        const filterTask = this._tasks.filter(task => task.taskStatus.taskStatusId === taskStatusId && task.userId === userId);

        if (taskName !== "") {
            // taskNameが存在する場合
            const tasks = filterTask.filter(task => task.taskName === taskName);
            return tasks;
        } else {
            return filterTask;
        }
    }

    public async generateTaskId(): Promise<string> {
        return (this._tasks.length + 1).toString();
    }
}

export { TaskMemorySource };
