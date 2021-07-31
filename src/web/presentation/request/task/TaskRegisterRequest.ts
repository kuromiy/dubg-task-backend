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
 *         child_task_names:
 *           type: array
 *           description: 子タスク名
 *           items:
 *             type: string
 */
class TaskRegisterRequest {
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

export { TaskRegisterRequest };
