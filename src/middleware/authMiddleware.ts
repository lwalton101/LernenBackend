import {NextFunction, Request, Response} from "express";
import {BasicAuthenticatedModel} from "../models/BasicAuthenticatedModel";
import {verifyToken} from "../token";

export const authMiddleware = (req: Request<{}, {}, BasicAuthenticatedModel>, res: Response, next: NextFunction): void => {
    if (!req.body.token) {
        res.status(400);
        res.send({message: "Please include a token"})
        return;
    }
    let userId;

    try {
        userId = verifyToken(req.body.token);
    } catch (e) {
        res.status(400).send({message: "Invalid Token"});
        return;
    }

    req.userID = userId;

    next();
};