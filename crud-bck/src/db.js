import pg from "pg";
import env from "dotenv";
env.config();

const db = new pg.Client({
    user: process.env.PG_USER,      // Changed from DB_USER
    host: process.env.PG_HOST,      // Changed from DB_HOST
    database: process.env.PG_DATABASE, // Changed from DB_NAME
    password: process.env.PG_PASSWORD, // Changed from DB_PASSWORD
    port: process.env.PG_PORT,      // Changed from DB_PORT
});

db.connect();

db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export const query = (text, params) => db.query(text, params);