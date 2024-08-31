import {pool} from "../db";
import {Rating} from "../models/db/Rating";


// Function to upload a rating for a specific question
export async function uploadOrUpdateRating(rating: Rating, userID: string): Promise<void> {
    // Check if the user has already uploaded a rating for this question
    const existingRatingQuery = `
        SELECT rating_id
        FROM ratings
        WHERE question_id = ? AND user_id = ?
    `;

    try {
        const [rows] = await pool.execute(existingRatingQuery, [rating.question_id, userID]);

        if (Array.isArray(rows) && rows.length > 0) {
            // Rating exists, so update it
            const updateQuery = `
                UPDATE ratings
                SET readability = ?, difficulty = ?
                WHERE rating_id = ?
            `;
            const ratingID = (rows[0] as Rating).rating_id;

            await pool.execute(updateQuery, [rating.readability, rating.difficulty, ratingID]);
        } else {
            // No existing rating, so insert a new one
            const insertQuery = `
                INSERT INTO ratings (question_id, user_id, readability, difficulty)
                VALUES (?, ?, ?, ?)
            `;
            await pool.execute(insertQuery, [rating.question_id, userID, rating.readability, rating.difficulty]);
        }
    } catch (error) {
        console.error('Error in uploadOrUpdateRating:', error);
    }
}