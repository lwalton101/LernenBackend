import {NextFunction, Request, Response} from "express";
import {verifyToken} from "../token";

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    if (!req.headers.token) {
        res.status(401);
        res.send({message: "Please include a token"})
        return;
    }
    let userId;

    try {
        userId = verifyToken(req.headers.token as string);
    } catch (e) {
        res.status(401).send({message: "Invalid Token"});
        return;
    }

    req.userID = userId.toString();

    next();
};