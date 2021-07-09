import Express from "express";
import { AuthMiddleware } from "../middleware/AuthMiddleware";
import AuthRouter from "./auth";
import TaskRouter from "./task";

const router = Express.Router();

router.use("/auth", AuthRouter);
router.use("/tasks",AuthMiddleware, TaskRouter);

router.get("/test", (req: Express.Request, res: Express.Response) => {
    return res.json("This server is live.");
});

export default router;
