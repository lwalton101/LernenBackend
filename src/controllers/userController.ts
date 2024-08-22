import {Request, Response} from "express";
import {getUserByID} from "../db/user";

export const getUserByIDRequest = async (req: Request<{ id: number }>, res: Response) => {
    const user = await getUserByID(req.params.id);
    if (!user) {
        res.status(400).send({message: "No user found with that id"});
        return;
    }

    res.send(user);
};