import { NextFunction, Request, Response } from "express";
import { container } from "../container";
import { TokenUtils } from "../utils/token/TokenUtils";

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.get("Authorization");
    const token = tokenWithBearer?.split(" ")[1];
    const tokenUtils = container.get<TokenUtils>("TokenUtils");

    try {
        if (token) {
            const uid = await tokenUtils.verify(token);
            req.body.userId = uid;
            return next();
        }
    
        return res.status(403).json({message: "認証失敗"});
    } catch (err) {
        return next(new Error("認証エラー"));
    }
};

export { AuthMiddleware };
