import {Request, Response} from "express";
import {CreateQuestionModel} from "../models/CreateQuestionModel";
import {verifySubquestion} from "../models/db/Subquestion";
import {createQuestion} from "../db/question";
import {createSubquestion} from "../db/subquestion";
import {createTag} from "../db/tag";
import {createQuestionTag} from "../db/questiontag";

export const createQuestionRequest = async (req: Request<{}, {}, CreateQuestionModel>, res: Response) => {

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
    if (!req.body.tags) {
        res.status(400).send({message: "Please include at least one tag!"});
        return;
    }

    if ((req.body.tags.length > 5)) {
        res.status(400).send({message: "You can have no more than 5 tags!"});
        return;
    }


    const questionId = await createQuestion({
        created_at: req.body.created_at,
        published: req.body.published,
        title: req.body.title,
        user_id: req.body.user_id
    });

    if (!questionId) {
        res.status(400).send({message: "Something went wrong!"});
        return;
    }

    for (let subquestion of req.body.subquestions) {
        subquestion.question_id = questionId;
        await createSubquestion(subquestion);
    }

    for (let tag of req.body.tags) {
        const tagID = await createTag(tag);
        if (!tagID) {
            res.status(500).send({message: "Tag ID should not be undefined"});
            return;
        }
        await createQuestionTag(questionId, tagID);
    }

    res.send({message: "Creating question"})
};