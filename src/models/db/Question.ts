import {getQuestion} from "../../db/question";
import {getSubquestionsByQuestionID} from "../../db/subquestion";
import {getTagsByQuestionID} from "../../db/questiontag";
import {getTagByID} from "../../db/tag";

export interface Question {
    question_id?: number;
    title: string;
    user_id: number;
    created_at: Date;
    published: boolean;
}

export async function getFullQuestion(question_id: number, user_id: string) {
    const question = await getQuestion(question_id);
    if (!question) {
        throw new Error("Question doesn't exist");
    }

    if (!question.published && question.user_id.toString() !== user_id) {
        throw new Error("Question doesn't exist");
    }

    const subquestions = await getSubquestionsByQuestionID(question_id);

    let questionTags = await getTagsByQuestionID(question_id);
    if (questionTags == null) {
        throw new Error("Unexpected server error");
    }
    const tags = [];
    for (let tagID of questionTags.map((qt) => qt.tag_id)) {
        const tag = await getTagByID(tagID.toString());
        tags.push(tag?.tag_name);
    }

    return {
        question_id: question_id,
        title: question.title,
        user_id: question.user_id,
        created_at: question.created_at,
        published: question.published,
        tags: tags,
        subquestions: subquestions
    }
}