import Express from "express";
import { container } from "../../container";
import { TYPES } from "../../container/types";
import { TaskRegisterController } from "../../presentation/controller/task/TaskRegisterController";
import { TaskSearchController } from "../../presentation/controller/task/TaskSearchController";
import { TaskRegisterRequest } from "../../presentation/request/task/TaskRegisterRequest";
import { TaskSearchRequest } from "../../presentation/request/task/TaskSearchRequest";

const router = Express.Router();

/**
 * @openapi
 * /tasks:
 *   post:
 *     summary: タスク登録
 *     description: 新規タスクを登録する。
 *     tags:
 *       - tasks
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: "#/components/schemas/TaskRegisterRequest"
 *     responses:
 *       200:
 *         description: 新規タスク登録成功レスポンス
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/TaskRegisterResponse"
 */
router.post("", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const request = new TaskRegisterRequest(req.body.taskName, req.body.childTaskNames, req.body.userId);
        const controller = container.get<TaskRegisterController>(TYPES.TaskRegisterController);
        const response = await controller.api(request);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

/**
 * @openapi
 * /tasks/search:
 *   get:
 *     summary: タスク検索
 *     description: 指定した条件でタスクを検索する。
 *     tags:
 *       - tasks
 *     parameters:
 *       - $ref: "#/components/parameters/task_name"
 *       - $ref: "#/components/parameters/task_status_id"
 *       - $ref: "#/components/parameters/limit"
 *       - $ref: "#/components/parameters/offset"
 *     responses:
 *       200:
 *         description: 
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/TaskSearchResponse"
 */
router.get("/search", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        console.log(req.query);
        console.log(typeof req.query.taskName);
        let taskName = "";
        if (req.query.taskName) {
            taskName = String(req.query.taskName);
        }
        console.log(`taskName: ${taskName}`);
        const request = new TaskSearchRequest(taskName, String(req.query.taskStatusId), req.body.userId, Number(req.query.limit), Number(req.query.offset));
        const controller = container.get<TaskSearchController>(TYPES.TaskSearchController);
        const response = await controller.api(request);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

export default router;