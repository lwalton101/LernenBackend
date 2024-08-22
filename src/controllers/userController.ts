import {Request, Response} from "express";

export const getUserByIDRequest = (req: Request<{ id: number }>, res: Response) => {
    res.send(req.params.id)
};