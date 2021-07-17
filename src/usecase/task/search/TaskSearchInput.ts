class TaskSearchInput {
    constructor(
        private _taskName: string,
        private _taskStatusId: string,
        private _userId: string,
        private _limit: number,
        private _offset: number) {}

    public get taskName(): string {
        return this._taskName;
    }

    public get taskStatusId(): string {
        return this._taskStatusId;
    }

    public get userId(): string {
        return this._userId;
    }

    public get limit(): number {
        return this._limit;
    }

    public get offset(): number {
        return this._offset;
    }
}

export { TaskSearchInput };
