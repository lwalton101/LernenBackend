import {Request, Response} from "express";
import {CreateQuestionModel, verifyCreateQuestionModel} from "../models/CreateQuestionModel";
import {createQuestion, getQuestion, updateQuestion} from "../db/question";
import {createSubquestion, deleteSubquestionsByQuestionID, getSubquestionsByQuestionID} from "../db/subquestion";
import {createTag, getTagByID} from "../db/tag";
import {createQuestionTag, deleteQuestionTagsByQuestionID, getTagsByQuestionID} from "../db/questiontag";

export const createQuestionRequest = async (req: Request<{}, {}, CreateQuestionModel>, res: Response) => {
    const error = verifyCreateQuestionModel(req.body);
    if (error) {
        res.status(400).send({message: error});
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

    res.send({message: "Creating question"})
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

    const question = await getQuestion(questionId);
    if (!question) {
        res.status(400).send({message: "Question doesn't exist"});
        return;
    }

    if (!question.published && question.user_id.toString() !== req.userID) {
        res.status(400).send({message: "Question doesn't exist"});
    }

    const subquestions = await getSubquestionsByQuestionID(questionId);

    let questionTags = await getTagsByQuestionID(questionId);
    if (questionTags == null) {
        res.status(500).send({message: "Unexpected server error"});
        return;
    }
    const tags = [];
    for (let tagID of questionTags.map((qt) => qt.tag_id)) {
        const tag = await getTagByID(tagID.toString());
        tags.push(tag?.tag_name);
    }

    res.send(
        {
            title: question.title,
            user_id: question.user_id,
            created_at: question.created_at,
            published: question.published,
            tags: tags,
            subquestions: subquestions
        })
};

