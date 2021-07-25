/**
 * @openapi
 * components:
 *   schemas:
 *     TaskStatus:
 *       type: object
 *       description: タスク状態
 *       properties:
 *         task_status_id:
 *           type: string
 *           description: タスク状態ID
 *           example: 1
 *         task_status_name:
 *           type: string
 *           description: タスク状態名
 *           example: 未完了
 */
class TaskStatusResource {
    constructor(
        public taskStatusId: string,
        public taskStatusName: string) {}
}

export { TaskStatusResource };
