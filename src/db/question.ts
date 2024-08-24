import mysql from "mysql2/promise";
import {Question} from "../models/db/Question";
import {pool} from "../db";

export async function createQuestion(question: Question) {
    const query = `
        INSERT INTO questions (title, user_id, published)
        VALUES (?, ?, ?)
    `;

    const values = [question.title, question.user_id, question.published];
    try {
        const [result] = await pool.execute(query, values);
        console.log('Question created successfully with ID:', (result as mysql.OkPacketParams).insertId);
        return (result as mysql.OkPacketParams).insertId;
    } catch (error) {
        console.error('Error creating question:', error);
        return null;
    }
}

export async function updateQuestion(id: number, question: Question) {
    const query = `
        UPDATE questions
        SET title = ?, published = ?
        WHERE question_id = ?;
    `;

    const values = [question.title, question.published, id];
    try {
        await pool.execute(query, values);
    } catch (error) {
        console.error('Error creating question:', error);
        return null;
    }
}

export async function getQuestion(id: number) {
    const query = `
        SELECT *
        FROM questions
        WHERE question_id = ?;
    `;

    const values = [id];
    try {
        const [rows] = await pool.execute(query, values);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as Question;
        }

        return null; // No question found with the given id
    } catch (error) {
        console.error('Error fetching question by id:', error);
        return null; // Handle error cases gracefully
    }
}
