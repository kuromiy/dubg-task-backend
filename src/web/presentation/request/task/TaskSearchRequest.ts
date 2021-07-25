/**
 * @openapi
 * components:
 *   parameters:
 *     task_name:
 *       in: query
 *       name: task_name
 *       description: タスク名
 *       schema:
 *         type: string
 *     task_status_id:
 *       in: query
 *       name: task_status_id
 *       description: タスク状態ID
 *       schema:
 *         type: string
 *     limit:
 *       in: query
 *       name: limit
 *       description: リミット
 *       schema:
 *         type: integer
 *     offset:
 *       in: query
 *       name: offset
 *       description: オフセット
 *       schema:
 *         type: integer
 */
class TaskSearchRequest {
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

export { TaskSearchRequest };
