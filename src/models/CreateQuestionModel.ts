import {Subquestion} from "./db/Subquestion";

export interface CreateQuestionModel {
    title: string,
    user_id: number,
    created_at: Date,
    published: boolean,
    tags: string[]
    subquestions: Subquestion[]
}