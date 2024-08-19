import {User} from "../src/models/db/User";
import {getConnection} from "../db";
import mysql from "mysql2/promise";

export async function createUser(user: User) {
    const connection = await getConnection();

    const query = `
        INSERT INTO users (username, email, password, profilePic)
        VALUES (?, ?, ?, ?)
    `;

    const values = [user.username, user.email, user.password, user.profilePic || null];

    try {
        const [result] = await connection.execute(query, values);
        console.log('User created successfully with ID:', (result as mysql.OkPacketParams).insertId);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const connection = await getConnection();

    const query = `
        SELECT userID, username, email, password, accountCreationDate, profilePic
        FROM users
        WHERE email = ?
    `;

    try {
        const [rows] = await connection.execute(query, [email]);

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