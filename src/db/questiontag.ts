import {getConnection} from "../db";
import mysql from "mysql2/promise";
import {QuestionTag} from "../models/db/QuestionTag";

export async function createQuestionTag(questionID: number, tagID: number) {
    const connection = await getConnection();

    const query = `
        INSERT INTO questiontags (question_id, tag_id)
        VALUES (?,?)
    `;

    const values = [questionID, tagID];

    try {
        const [result] = await connection.execute(query, values);
        console.log('QuestionTag created successfully with ID:', (result as mysql.OkPacketParams).insertId);
    } catch (error) {
        console.error('Error creating Tag:', error);
    }
}

export async function getTagsByQuestionID(questionID: number) {
    const connection = await getConnection();

    const query = `
        SELECT *
        FROM questiontags
        WHERE question_id = ?
    `;

    try {
        const [rows] = await connection.execute(query, [questionID]);

        // `rows` is an array of objects; we expect at most one row
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as QuestionTag;
        }

        return null; // No question tag found with the given question id
    } catch (error) {
        console.error('Error fetching question tag by question id:', error);
        return null; // Handle error cases gracefully
    }
}