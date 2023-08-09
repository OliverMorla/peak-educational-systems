import { Pool } from "pg";

async function PostgreSQL() {
  const client = await new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
  }).connect();
  return client;
}

export const db = PostgreSQL();
