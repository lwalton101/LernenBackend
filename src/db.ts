import mysql, {Pool} from "mysql2/promise"
import * as fs from "fs";

export let pool: Pool;

export async function initDatabase() {
    pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    const sqlCommandsFull = fs.readFileSync("./init.sql", "utf-8").replaceAll(/[\r\n]/g, '');
    const sqlCommands = sqlCommandsFull.split(";");
    for (const sqlCommand of sqlCommands) {
        if (!sqlCommand) {
            continue;
        }

        try {
            await pool.execute(sqlCommand);
        } catch (error) {
            console.error('Error creating table:', error);
        }
    }

    console.log("Executed all SQL statements")
}