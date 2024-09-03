import {Request, Response} from "express";
import {getUserByID, updateUserColumn} from "../db/user";
import {sanitizeUser} from "../models/db/SanitizedUser";

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
    const sanitizedUser = sanitizeUser(user);
    res.send(sanitizedUser);
};

export const getSelfRequest = async (req: Request, res: Response) => {
    if (!req.userID) {
        res.status(401).send({message: "Something went wrong with auth"});
        return;
    }
    const userID = parseInt(req.userID)
    if (isNaN(userID)) {
        res.status(400).send({message: "Id must be a number"});
        return;
    }

    const user = await getUserByID(userID);
    if (!user) {
        //This should never happen as the auth middleware should not allow a request to make it this far without a valid user id
        res.status(400).send({message: "No user found with that id."});
        return;
    }
    const sanitizedUser = sanitizeUser(user);
    res.send(sanitizedUser);
};

export const updateProfilePicRequest = async (req: Request, res: Response) => {
    if (!req.userID) {
        res.status(401).send({message: "Something went wrong with auth"});
        return;
    }

    if (!req.file) {
        res.status(400).send({message: "No File was uploaded"});
        return;
    }
    await updateUserColumn("profile_pic", req.userID, req.file.originalname);
    res.send("sanitizedUser");
};