class TaskStatus {
    private _taskStatusId: string;
    private _taskStatusName: string;

    private constructor(taskStatusId: string, taskStatusName: string) {
        this._taskStatusId = taskStatusId;
        this._taskStatusName = taskStatusName;
    }

    public static createNewTask(): TaskStatus {
        return new TaskStatus("001", "NEW_TASK");
    }

    public get taskStatusId(): string {
        return this._taskStatusId;
    }

    public get taskStatusName(): string {
        return this._taskStatusName;
    }
}

export { TaskStatus };
