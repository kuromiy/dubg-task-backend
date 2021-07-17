import Express from "express";
import { container } from "../../container";
import { TaskRegisterController } from "../../presentation/controller/task/TaskRegisterController";
import { TaskSearchController } from "../../presentation/controller/task/TaskSearchController";
import { TaskRegisterRequest } from "../../presentation/request/task/TaskRegisterRequest";
import { TaskSearchRequest } from "../../presentation/request/task/TaskSearchRequest";

const router = Express.Router();

/**
 * @openapi
 * /tasks:
 *     post:
 *         summary: タスク登録
 *         description: 新規タスクを登録する。
 *         requestBody:
 *             description:
 *             content:
 *                 application/json:
 *                     schema:
 *                         type: object
 *                         properties:
 *                             taskName:
 *                                 type: string
 *                                 description: タスク名
 *         responses:
 *             200:
 *                 description: test
 *                 content:
 *                     application/json:
 *                         schema:
 *                             type: object
 *                             properties:
 *                                 task:
 *                                     type: object
 *                                     properties:
 *                                         taskId:
 *                                             type: string
 *                                             description: タスクID
 */
router.post("", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const request = new TaskRegisterRequest(req.body.taskName, req.body.userId);
        const controller = container.get<TaskRegisterController>("TaskRegisterController");
        const response = await controller.api(request);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

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
        const controller = container.get<TaskSearchController>("TaskSearchController");
        const response = await controller.api(request);
        return res.json(response);
    } catch (err) {
        return next(err);
    }
});

export default router;