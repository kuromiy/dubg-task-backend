import Express from "express";

const app = Express();

app.get("/status", (req: Express.Request, res: Express.Response) => {
    return res.json("This server is live.");
});

app.listen(3001, () => console.log("START"));
