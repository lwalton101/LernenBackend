import {Request, Response} from "express";
import {getUserByID} from "../db/user";

export const getUserByIDRequest = async (req: Request<{ id: string }>, res: Response) => {
    const userId = parseInt(req.params.id);

    if (isNaN(userId)) {
        res.status(400).send({message: "Id must be a number"});
        return;
    }

    const user = await getUserByID(userId);
    if (!user) {
        res.status(400).send({message: "No user found with that id"});
        return;
    }

    res.send(user);
};