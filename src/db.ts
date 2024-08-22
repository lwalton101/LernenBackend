import mysql, {Connection} from "mysql2/promise"
import * as fs from "fs";

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

    const sqlCommandsFull = fs.readFileSync("./init.sql", "utf-8").replaceAll(/[\r\n]/g, '');
    const sqlCommands = sqlCommandsFull.split(";");
    for (const sqlCommand of sqlCommands) {
        if (!sqlCommand) {
            continue;
        }

        try {
            await connection.execute(sqlCommand);
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }

    console.log("Executed all SQL statements")
}