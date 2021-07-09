class TaskRegisterRequest {
    constructor(private _taskName: string, private _userId: string) {}

    public get taskName(): string {
        return this._taskName;
    }

    public get userId(): string {
        return this._userId;
    }
}

export { TaskRegisterRequest };
