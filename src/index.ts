import Express from "express";
import Router from "./router";
import "reflect-metadata";
import cors from "cors";

const app = Express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(Router);

app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    return res.json("Server Error.");
});

app.listen(8080, () => console.log("START"));
