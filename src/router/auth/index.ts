import Express from "express";
import { container } from "../../container";
import { AuthMiddleware } from "../../middleware/AuthMiddleware";
import { LogInController } from "../../presentation/controller/auth/LogInController";
import { LogInRequest } from "../../presentation/request/auth/LogInRequest";

const router = Express.Router();

router.post("/login", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        console.log(req.body);
        const request = new LogInRequest(req.body.userMail, req.body.userPassword);
        const controller = container.get<LogInController>("LogInController");
        const response = await controller.api(request);
        return res.json({token: response.token});    
    } catch (err) {
        return next(err);
    }
});

router.get("/test", AuthMiddleware, async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        console.log(req.body.userId);
        return res.json({message: "認証成功"});
    } catch (err) {
        return next(err);
    }
});

export default router;
