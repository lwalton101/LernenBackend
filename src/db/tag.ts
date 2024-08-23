import {getConnection} from "../db";
import {Tag} from "../models/db/Tag";
import mysql from "mysql2/promise";

export async function createTag(tagName: string) {
    const existingTag = await getTagByName(tagName);
    if (existingTag) {
        return existingTag.tag_id;
    }

    const connection = await getConnection();

    const query = `
        INSERT INTO tags (tag_name)
        VALUES (?)
    `;

    const values = [tagName];

    try {
        const [result] = await connection.execute(query, values);
        console.log('Tag created successfully with ID:', (result as mysql.OkPacketParams).insertId);
        return (result as mysql.OkPacketParams).insertId;
    } catch (error) {
        console.error('Error creating Tag:', error);
    }
}

export async function getTagByName(tagName: string) {
    const connection = await getConnection();

    const query = `
        SELECT *
        FROM tags
        WHERE tag_name = ?
    `;

    try {
        const [rows] = await connection.execute(query, [tagName]);

        // `rows` is an array of objects; we expect at most one row
        if (Array.isArray(rows) && rows.length > 0) {
            return rows[0] as Tag;
        }

        return null; // No user found with the given email
    } catch (error) {
        console.error('Error fetching user by email:', error);
        return null; // Handle error cases gracefully
    }
}