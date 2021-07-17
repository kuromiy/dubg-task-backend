import { Task } from "../../../domain/task/Task";

class TaskSearchOutput {
    constructor(private _count: number, private _tasks: Array<Task>) {}

    public get count(): number {
        return this._count;
    }

    public get tasks(): Array<Task> {
        return this._tasks;
    }
}

export { TaskSearchOutput };
