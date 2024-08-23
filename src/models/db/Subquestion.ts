export interface Subquestion {
    subquestion_id?: number;
    question_id?: number;
    type: number;
    question_num: number;
    text?: string;
    audio_file_path?: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    answer1: boolean;
    answer2: boolean;
    answer3: boolean;
    answer4: boolean;
}

export function verifySubquestion(subquestion: Subquestion): string {
    if (subquestion.type == null) return "type";
    if (subquestion.question_num == null) return "question_num";
    if (subquestion.option1 == null) return "option1";
    if (subquestion.option2 == null) return "option2";
    if (subquestion.option3 == null) return "option3";
    if (subquestion.option4 == null) return "option4";
    if (subquestion.answer1 == null) return "answer1";
    if (subquestion.answer2 == null) return "answer2";
    if (subquestion.answer3 == null) return "answer3";
    if (subquestion.answer4 == null) return "answer4";

    return "";
}