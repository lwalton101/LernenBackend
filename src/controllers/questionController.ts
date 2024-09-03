import {Request, Response} from "express";
import {CreateQuestionModel, verifyCreateQuestionModel} from "../models/CreateQuestionModel";
import {createQuestion, getAllQuestionsByUser, pickNRandomQuestions, updateQuestion} from "../db/question";
import {createSubquestion, deleteSubquestionsByQuestionID} from "../db/subquestion";
import {createTag} from "../db/tag";
import {createQuestionTag, deleteQuestionTagsByQuestionID, getTagsByQuestionID} from "../db/questiontag";
import {getFullQuestion} from "../models/db/Question";

export const createQuestionRequest = async (req: Request<{}, {}, CreateQuestionModel>, res: Response) => {
    const error = verifyCreateQuestionModel(req.body);
    if (error) {
        res.status(400).send({message: error});
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
    let questionTags = (await getTagsByQuestionID(questionId));
    if (questionTags == null) {
        res.status(500).send({message: "Unexpected server error"});
        return;
    }
    const tagIDs = questionTags.map((qt) => qt.tag_id);
    for (let tag of req.body.tags) {
        const tagID = await createTag(tag);
        if (!tagID) {
            res.status(500).send({message: "Tag ID should not be undefined"});
            return;
        }
        if (tagIDs.includes(tagID)) {
            tagIDs.splice(tagIDs.indexOf(tagID), 1);
        } else {
            await createQuestionTag(questionId, tagID);
        }
    }

    res.send({message: "Creating question", id: questionId})
};

export const updateQuestionRequest = async (req: Request<{ id: string }, {}, CreateQuestionModel>, res: Response) => {
    const error = verifyCreateQuestionModel(req.body);
    if (error) {
        res.status(400).send({message: error});
        return;
    }

    const questionId = parseInt(req.params.id);
    if (isNaN(questionId)) {
        res.status(400).send({message: "Question Id must be a number"});
        return;
    }

    await updateQuestion(questionId, {
        created_at: req.body.created_at,
        published: req.body.published,
        title: req.body.title,
        user_id: req.body.user_id
    });

    await deleteSubquestionsByQuestionID(questionId);
    for (let subquestion of req.body.subquestions) {
        subquestion.question_id = questionId;
        await createSubquestion(subquestion);
    }

    await deleteQuestionTagsByQuestionID(questionId);
    let questionTags = (await getTagsByQuestionID(questionId));
    if (questionTags == null) {
        res.status(500).send({message: "Unexpected server error"});
        return;
    }
    for (let tag of req.body.tags) {
        const tagID = await createTag(tag);
        if (!tagID) {
            res.status(500).send({message: "Tag ID should not be undefined"});
            return;
        }
        await createQuestionTag(questionId, tagID);
    }

    res.send({message: "Updated question"})
};

export const getQuestionRequest = async (req: Request<{ id: string }>, res: Response) => {
    const questionId = parseInt(req.params.id);
    if (isNaN(questionId)) {
        res.status(400).send({message: "Question Id must be a number"});
        return;
    }

    if (!req.userID) {
        res.status(400).send({message: "This should be impossible!"});
        return;
    }

    try {
        const question = await getFullQuestion(questionId, req.userID);
        res.status(200).send(question);
    } catch (e: any) {
        if (e instanceof Error) {
            res.status(400).send({message: e.message});
            return;
        }
        res.status(400).send({message: "Unknown error occurred"});
    }

    return;
};

export const browseRequest = async (req: Request<{ amount: string }>, res: Response) => {
    const amount = parseInt(req.params.amount);
    if (!amount) {
        res.status(400).send({message: "Amount must be a number"});
        return;
    }

    if (!req.userID) {
        res.status(400).send({message: "This should be impossible!"});
        return;
    }

    const questions = await pickNRandomQuestions(amount, req.userID);
    res.send(questions);
};

export const getAllQuestionsByUserRequest = async (req: Request<{ id: string }>, res: Response) => {
    if (!req.params.id) {
        res.status(400).send({message: "You must pass an id"});
        return;
    }

    let questions = await getAllQuestionsByUser(req.params.id);
    if (!questions) {
        res.status(500).send({message: "Internal Server Error"});
        return;
    }

    questions = questions.filter((q) => q.published);
    res.send(questions);
};


