/**
 * @openapi
 * components:
 *   schemas:
 *     TaskRegisterRequest:
 *       type: object
 *       description: タスク登録APIリクエスト
 *       required:
 *         - task_name
 *       properties:
 *         task_name:
 *           type: string
 *           description: タスク名
 */
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
