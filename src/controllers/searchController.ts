import {Request, Response} from "express";
import {SearchQueryModel} from "../models/SearchQueryModel";
import {getAllQuestions} from "../db/question";
import {getFullQuestion} from "../models/db/Question";

export const searchRequest = async (req: Request<{}, {}, SearchQueryModel>, res: Response) => {
    if (req.body.Questions == undefined) {
        res.status(400).send({message: "You must have a Questions key!"});
        return;
    }
    if (req.body.Users == undefined) {
        res.status(400).send({message: "You must have a Users key!"});
        return;
    }
    if (req.body.SearchQuery == undefined) {
        res.status(400).send({message: "You must have a SearchQuery key!"});
        return;
    }
    if (req.body.maxDifficulty == undefined) {
        res.status(400).send({message: "You must have a max difficulty key!"});
        return;
    }
    if (req.body.minDifficulty == undefined) {
        res.status(400).send({message: "You must have a min difficulty key!"});
        return;
    }
    if (req.body.maxReadability == undefined) {
        res.status(400).send({message: "You must have a max readability key!"});
        return;
    }
    if (req.body.minReadability == undefined) {
        res.status(400).send({message: "You must have a min readability key!"});
        return;
    }
    if (req.body.tags == undefined) {
        res.status(400).send({message: "You must have a tags key!"});
        return;
    }

    if (!req.userID) {
        res.status(400).send({message: "This should be impossible!"});
        return;
    }

    let questions = await getAllQuestions();
    if (!questions) {
        res.status(500).send({message: "Something went wrong"});
        return;
    }

    questions = questions.filter((q) => q.published);
    let fullQs = [];
    for (let question of questions) {
        try {
            const fullQ = await getFullQuestion(question.question_id as number, req.userID);
            fullQs.push(fullQ);
        } catch (e: any) {
            if (e instanceof Error) {
                res.status(400).send({message: e.message});
                return;
            }
            res.status(400).send({message: "Unknown error occurred"});
        }
    }

    for (let tag of req.body.tags) {
        fullQs = fullQs.filter((fq) => {
            if (!fq.tags) {
                return false;
            }
            return (fq.tags as string[]).includes(tag);
        })
    }

    res.status(200).send({message: "Search done!", results: fullQs})


};
