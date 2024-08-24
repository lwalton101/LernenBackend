import {User} from "../models/db/User";
import mysql from "mysql2/promise";
import {pool} from "../db";

export async function createUser(user: User) {
    const query = `
        INSERT INTO users (username, email, password, profile_pic)
        VALUES (?, ?, ?, ?)
    `;

    const values = [user.username, user.email, user.password, user.profile_pic || null];

    try {
        const [result] = await pool.execute(query, values);
        console.log('User created successfully with ID:', (result as mysql.OkPacketParams).insertId);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const query = `
        SELECT user_id, username, email, password, account_creation_date, profile_pic
        FROM users
        WHERE email = ?
    `;

    try {
        const [rows] = await pool.execute(query, [email]);

        // `rows` is an array of objects; we expect at most one row
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as User;
        }

        return null; // No user found with the given email
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null; // Handle error cases gracefully
    }
}

export async function getUserByID(id: number): Promise<User | null> {
    const query = `
        SELECT user_id, username, email, password, account_creation_date, profile_pic
        FROM users
        WHERE user_id = ?
    `;

    try {
        const [rows] = await pool.execute(query, [id]);

        // `rows` is an array of objects; we expect at most one row
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as User;
        }

        return null; // No user found with the given id
    } catch (error) {
        console.error('Error fetching user by id:', error);
        return null; // Handle error cases gracefully
    }
}