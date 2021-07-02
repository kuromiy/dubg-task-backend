import Express from "express";
import AuthRouter from "./auth";

const router = Express.Router();

router.use("/auth", AuthRouter);

router.get("/status", (req: Express.Request, res: Express.Response) => {
    return res.json("This server is live.");
});

export default router;
