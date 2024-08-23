import {Request, Response} from "express";
import {CreateQuestionModel, verifyCreateQuestionModel} from "../models/CreateQuestionModel";
import {createQuestion} from "../db/question";
import {createSubquestion} from "../db/subquestion";
import {createTag} from "../db/tag";
import {createQuestionTag, getTagsByQuestionID} from "../db/questiontag";

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

