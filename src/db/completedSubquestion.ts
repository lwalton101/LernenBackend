import {pool} from "../db";
import mysql from "mysql2/promise";
import {CompletedSubquestion} from "../models/db/CompletedSubquestion";

export async function createCompletedSubquestion(userId: string, subquestionId: number, marks: number) {
    const query = `
        INSERT INTO completedsubquestions (user_id, subquestion_id, marks)
        VALUES (?, ?, ?)
    `;

    const values = [userId, subquestionId, marks];

    try {
        const [result] = await pool.execute(query, values);
        console.log('Completed subquestion created successfully with ID:', (result as mysql.OkPacketParams).insertId);
        return (result as mysql.OkPacketParams).insertId;
    } catch (error) {
        console.error('Error creating completed subquestion:', error);
    }
}

export async function getCompletedSubquestion(userId: string, subquestionId: number): Promise<CompletedSubquestion | null> {
    const query = `
        SELECT *
        FROM completedsubquestions
        WHERE user_id = ? AND subquestion_id = ?
    `;

    const values = [userId, subquestionId];

    try {
        const [rows] = await pool.execute(query, values);

        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as CompletedSubquestion; // Return the first matching row
        } else {
            console.log('No completed subquestion found for the given userId and subquestionId.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching completed subquestion:', error);
        throw error; // Rethrow the error for further handling if necessary
    }
}