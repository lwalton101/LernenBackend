import {Request, Response} from "express";
import {Rating} from "../models/db/Rating";
import {getRatingByID, uploadOrUpdateRating} from "../db/rating";

export const uploadRatingRequest = async (req: Request<{}, {}, Rating>, res: Response) => {
    if (!req.userID) {
        return;
    }

    if (!req.body.difficulty || req.body.difficulty > 5 || req.body.difficulty < 1) {
        res.status(400).send({message: "Difficulty key must be between 1 and 5"});
        return;
    }

    if (!req.body.readability || req.body.readability > 5 || req.body.readability < 1) {
        res.status(400).send({message: "Readabilty key must be between 1 and 5"});
        return;
    }

    if (!req.body.question_id) {
        res.status(400).send({message: "There must be a question_id key"});
        return;
    }

    await uploadOrUpdateRating(req.body, req.userID)
    res.send(req.body);
};

export const getRatingRequest = async (req: Request<{ id: string }>, res: Response) => {
    const questionId = parseInt(req.params.id);
    if (isNaN(questionId)) {
        res.status(400).send({message: "Question Id must be a number"});
        return;
    }

    const ratings = await getRatingByID(questionId.toString());
    res.send(ratings)
}
