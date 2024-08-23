import {Subquestion, verifySubquestion} from "./db/Subquestion";
import {checkIfDuplicateExists} from "../duplicate";

export interface CreateQuestionModel {
    title: string,
    user_id: number,
    created_at: Date,
    published: boolean,
    tags: string[]
    subquestions: Subquestion[]
}

export function verifyCreateQuestionModel(model: CreateQuestionModel) {
    if (!model) {
        return "Please include a body!";
    }

    for (let subquestion of model.subquestions) {
        const verify = verifySubquestion(subquestion);
        if (verify) {
            return `A Subquestion is wrong! Error: ${verify}`;
        }
    }

    if (!model.title) {
        return "Please include a title!";
    }

    if (!model.user_id) {
        return "Please include a user id!";
    }

    if (!model.created_at) {
        return "Please include a creation date!";
    }

    if (!model.published) {
        return "Please include a published status";
    }
    if (!model.tags) {
        return "Please include at least one tag!";
    }

    if ((model.tags.length > 5)) {
        return "You can have no more than 5 tags!";
    }

    if (checkIfDuplicateExists(model.tags)) {
        return "No duplicate tags!";
    }

    return "";
}