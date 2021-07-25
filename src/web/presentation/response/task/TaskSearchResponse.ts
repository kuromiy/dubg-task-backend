import { TaskResource } from "../../resource/TaskResource";

/**
 * @openapi
 * components:
 *   schemas:
 *     TaskSearchResponse:
 *       type: object
 *       description: タスク検索APIレスポンス
 *       properties:
 *         tasks:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Task"
 */
class TaskSearchResponse {
    constructor(private _count: number, private _taskResources: Array<TaskResource>) {}

    public get count(): number {
        return this._count;
    }

    public get taskResources(): Array<TaskResource> {
        return this._taskResources;
    }
}

export { TaskSearchResponse };
