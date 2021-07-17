import { Task } from "../../../domain/task/Task";

class TaskRegisterOutput {
    constructor(private _task: Task) {}

    public get task(): Task {
        return this._task;
    }
}

export { TaskRegisterOutput };
