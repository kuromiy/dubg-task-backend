import Express from "express";
import { container } from "../../container";
import { TaskRegisterController } from "../../presentation/controller/task/TaskRegisterController";
import { TaskRegisterRequest } from "../../presentation/request/task/TaskRegisterRequest";

const router = Express.Router();

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

export default router;