import {Subquestion} from "./db/Subquestion";

export interface FullQuestion {
    question_id: number
    title: string;
    user_id: number;
    created_at: Date;
    published: boolean;
    tags: string[],
    subquestions: Subquestion[]
}