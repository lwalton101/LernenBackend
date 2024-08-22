export interface Question {
    question_id?: number;
    title: string;
    user_id: number;
    created_at: Date;
    published: boolean;
}