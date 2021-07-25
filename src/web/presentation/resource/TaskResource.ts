import { TaskStatusResource } from "./TaskStatusResource";

/**
 * @openapi
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       description: タスク
 *       properties:
 *         task_id:
 *           type: string
 *           description: タスクID
 *           example: 1
 *         task_name:
 *           type: string
 *           description: タスク名
 *           example: テスト
 *         task_status:
 *           type: object
 *           $ref: "#/components/schemas/TaskStatus"
 *         user_id:
 *           type: string
 *           description: ユーザーID
 *           example: 1
 *         created_at:
 *           type: string
 *           description: 作成日
 *           format: date-time
 *         updated_at:
 *           type: string
 *           description: 更新日
 *           format: date-time
 */
class TaskResource {
    constructor(
        public taskId: string,
        public taskName: string,
        public taskStatus: TaskStatusResource,
        public userId: string,
        public createdAt: Date,
        public updatedAt: Date) {}
}

export { TaskResource };
