import {Request, Response} from "express";
import {CreateQuestionModel} from "../models/CreateQuestionModel";
import {verifySubquestion} from "../models/db/Subquestion";

export const createQuestionRequest = (req: Request<{}, {}, CreateQuestionModel>, res: Response) => {

    if (!req.body) {
        res.status(400).send({message: "Please include a body!"});
        return;
    }

    for (let subquestion of req.body.subquestions) {
        const verify = verifySubquestion(subquestion);
        if (verify) {
            res.status(400).send({message: `A Subquestion is wrong! Error: ${verify}`});
            return;
        }
    }

    if (!req.body.title) {
        res.status(400).send({message: "Please include a title!"});
        return;
    }

    if (!req.body.user_id) {
        res.status(400).send({message: "Please include a user id!"});
        return;
    }

    if (!req.body.created_at) {
        res.status(400).send({message: "Please include a creation date!"});
        return;
    }

    if (!req.body.published) {
        res.status(400).send({message: "Please include a published status"});
        return;
    }

    res.send({message: "Creating question"})
};