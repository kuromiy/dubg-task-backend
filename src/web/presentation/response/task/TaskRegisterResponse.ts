import { TaskResource } from "../../resource/TaskResource";

/**
 * @openapi
 * components:
 *   schemas:
 *     TaskRegisterResponse:
 *       type: object
 *       description: タスク登録APIレスポンス
 *       properties:
 *         task:
 *           type: object
 *           $ref: "#/components/schemas/Task"
 */
class TaskRegisterResponse {
    constructor(private _taskResource: TaskResource) {}

    public get taskResource(): TaskResource {
        return this._taskResource;
    }
}

export { TaskRegisterResponse };
