import {Request, Response} from "express";
import {CompletedSubquestion} from "../models/db/CompletedSubquestion";
import {createCompletedSubquestion, getCompletedSubquestion} from "../db/completedSubquestion";

export const submitResultRequest = async (req: Request<{}, {}, { results: CompletedSubquestion[] }>, res: Response) => {
    if (!req.body.results) {
        res.status(400).send({message: "You need to supply a body!"});
        return;
    }
    for (let enteredSubquestion of req.body.results) {
        const completedSubquestion = await getCompletedSubquestion(req.userID as string, enteredSubquestion.subquestion_id);
        if (completedSubquestion) {
            res.status(400).send({message: "You have already attempted this question"});
            return;
        }

        await createCompletedSubquestion(req.userID as string, enteredSubquestion.subquestion_id, enteredSubquestion.marks);
        res.send({message: "Submitted results!"});
    }
};

export const getResultRequest = async (req: Request<{ id: string }>, res: Response) => {
    const enteredSubquestionID = parseInt(req.params.id);
    if (isNaN(enteredSubquestionID)) {
        res.status(400).send({message: "Enter a valid user id!"});
    }
    const completedSubquestion = await getCompletedSubquestion(req.userID as string, enteredSubquestionID);
    if (!completedSubquestion) {
        res.status(404).send({message: "You have not completed this question!"});
        return;
    }
    res.status(200).send({message: "Successful!", subquestion: completedSubquestion});
    return;
};

