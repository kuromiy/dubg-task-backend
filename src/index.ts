import Express from "express";
import Router from "./router";
import "reflect-metadata";

const app = Express();

app.use(Router);

app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    return res.json("Server Error.");
});

app.listen(3001, () => console.log("START"));
