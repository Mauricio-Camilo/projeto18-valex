import dotenv from "dotenv";
import pg from "pg";
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const connection = new Pool({
  connectionString,
  ssl: process.env.MODE === "PROD" ? { rejectUnauthorized: false } : undefined,
});

connection.on("error", (err, client) => {
  throw {
    name: "ConnectionError",
    message: "Error in db connection",
  }
});

export { connection };

