import Express from "express";
import Router from "./web/router";
import "reflect-metadata";
import cors from "cors";
import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "dubg-task-backend",
            version: "0.0.1",
            description: "dubg-task-backend API仕様書",
        },
    },
    apis: [
        "./src/web/router/**/*.ts",
        "./src/web/presentation/**/*.ts"
    ],
}

const app = Express();

app.use(Express.json());
app.use(Express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(Router);

app.use("/spec/api.json", (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    res.setHeader('Content-Type','application/json');
    res.send(swaggerJSDoc(options));
});

app.use("/spec", swaggerUi.serve, swaggerUi.setup(swaggerJSDoc(options)));

app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(err);
    return res.json("Server Error.");
});

app.listen(8080, () => {
    console.log("<================ START ================>");
    console.log("開発用URL   : http://localhost:8080");
    console.log("API仕様書URL: http://localhost:8080/spec");
    console.log("<=======================================>");
});
