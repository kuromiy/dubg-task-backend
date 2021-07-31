class TaskRegisterInput {
    constructor(private _taskName: string, private _childTaskNames: Array<string>, private _userId: string) {}

    public get taskName(): string {
        return this._taskName;
    }

    public get childTaskNames(): Array<string> {
        return this._childTaskNames;
    }

    public get userId(): string {
        return this._userId;
    }
}

export { TaskRegisterInput };
