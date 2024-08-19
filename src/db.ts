import mysql, {Connection} from "mysql2/promise"

export let connection: Connection;

export async function getConnection() {
    if (!connection) {
        await initDatabase();
        return connection;
    }

    return connection;
}

export async function initDatabase() {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE
    });

    //The query used to create the users table
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
          userID INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          accountCreationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          profilePic VARCHAR(255)
        );
  `;

    //Execute the query for creating the user table
    try {
        await connection.execute(createTableQuery);
        console.log('Users table created successfully!');
    } catch (error) {
        console.error('Error creating table:', error);
    } finally {
    }
}