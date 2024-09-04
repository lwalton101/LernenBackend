import mysql from "mysql2/promise";
import {Subquestion} from "../models/db/Subquestion";
import {pool} from "../db";

export async function createSubquestion(subquestion: Subquestion) {
    const query = `
        INSERT INTO subquestions (
            question_id, type, question_num, text, audio_file_path,
            option1, option2, option3, option4,
            answer1, answer2, answer3, answer4
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        subquestion.question_id,
        subquestion.type,
        subquestion.question_num,
        subquestion.text || null,
        subquestion.audio_file_path || null,
        subquestion.option1,
        subquestion.option2,
        subquestion.option3,
        subquestion.option4,
        subquestion.answer1,
        subquestion.answer2,
        subquestion.answer3,
        subquestion.answer4
    ];

    console.log(values);
    try {
        const [result] = await pool.execute(query, values);
        console.log('Subquestion created successfully with ID:', (result as mysql.OkPacketParams).insertId);
        return (result as mysql.OkPacketParams).insertId;
    } catch (error) {
        console.error('Error creating subquestion:', error);
        return null;
    }
}

export async function deleteSubquestionsByQuestionID(question_id: number) {
    const query = `
        DELETE FROM subquestions WHERE question_id = ?;
    `;

    try {
        await pool.execute(query, [question_id]);
    } catch (error) {
        console.error('Error creating subquestion:', error);
        return null;
    }
}

export async function getSubquestionsByQuestionID(questionID: number) {
    const query = `
        SELECT *
        FROM subquestions
        WHERE question_id = ?;
    `;

    const values = [questionID];
    try {
        const [rows] = await pool.execute(query, values);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows as Subquestion[];
        }

        return []; // No question found with the given id
    } catch (error) {
        console.error('Error fetching question by id:', error);
        return null; // Handle error cases gracefully
    }
}

export async function updateSubquestionColumn(columnName: string, subquestionID: string, value: string) {
    const query = `
        UPDATE subquestions SET ${columnName} = ? WHERE subquestion_id = ?;
    `;

    try {
        await pool.execute(query, [value, subquestionID]);
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return;
    }
}