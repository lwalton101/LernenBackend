import mysql from "mysql2/promise";
import {getFullQuestion, Question} from "../models/db/Question";
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

export async function getAllQuestions() {
    const query = `
        SELECT *
        FROM questions
    `;

    try {
        const [rows] = await pool.execute(query, []);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows as Question[];
        }

        return null; // No question found with the given id
    } catch (error) {
        console.error('Error fetching question by id:', error);
        return null; // Handle error cases gracefully
    }
}

export async function pickNRandomQuestions(n: number, userID: string) {
    if (n < 1) {
        throw new Error("N must be at least 1");
    }
    const query = `
        SELECT *
        FROM questions
        WHERE published = true
        ORDER BY RAND()
        LIMIT ?;
    `;

    const values = [n];
    try {
        const [rows] = await pool.execute(query, values);
        const qS: Question[] = rows as Question[]
        if (Array.isArray(rows)) {
            const fullQs = [];

            for (let row of qS) {
                if (!row.question_id) {
                    return;
                }
                const fullQ = await getFullQuestion(row.question_id, userID)
                fullQs.push(fullQ);
            }

            return fullQs;
        }

        return null; // No question found with the given id
    } catch (error) {
        console.error('Error fetching n questions:', error);
        return null; // Handle error cases gracefully
    }
}

