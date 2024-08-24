import mysql from "mysql2/promise";
import {QuestionTag} from "../models/db/QuestionTag";
import {pool} from "../db";

export async function createQuestionTag(questionID: number, tagID: number) {
    const query = `
        INSERT INTO questiontags (question_id, tag_id)
        VALUES (?,?)
    `;

    const values = [questionID, tagID];

    try {
        const [result] = await pool.execute(query, values);
        console.log('QuestionTag created successfully with ID:', (result as mysql.OkPacketParams).insertId);
    } catch (error) {
        console.error('Error creating Tag:', error);
    }
}

export async function getTagsByQuestionID(questionID: number) {
    const query = `
        SELECT *
        FROM questiontags
        WHERE question_id = ?
    `;

    try {
        const [rows] = await pool.execute(query, [questionID]);

        // `rows` is an array of objects; we expect many rows, max 5
        return rows as QuestionTag[];
    } catch (error) {
        console.error('Error fetching question tag by question id:', error);
        return null; // Handle error cases gracefully
    }
}

export async function deleteQuestionTagsByQuestionID(question_id: number) {
    const query = `
        DELETE FROM questiontags WHERE question_id = ?;
    `;

    try {
        await pool.execute(query, [question_id]);
    } catch (error) {
        console.error('Error creating subquestion:', error);
        return null;
    }
}