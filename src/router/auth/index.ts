import Express from "express";
import { container } from "../../container";
import { LogInController } from "../../presentation/controller/auth/LogInController";
import { LogInRequest } from "../../presentation/request/auth/LogInRequest";

const router = Express.Router();

router.post("/login", async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    try {
        const request = new LogInRequest(req.body.userMail, req.body.userPassword);
        const controller = container.get<LogInController>("LogInController");
        const response = await controller.api(request);
        return res.json({token: response.token});    
    } catch (err) {
        return next(err);
    }
});

export default router;
