export interface CreateQuestionModel {
    title: string,
    user_id: string,
    created_at: string,
    published: boolean,
    tags: string[]
    subquestions: Subquestion[]
}