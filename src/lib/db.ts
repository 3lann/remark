import { Pool } from "pg";

const pool = new Pool({
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    database: process.env.DB_NAME || "careers_db",
    user: process.env.DB_USER || "careers_admin",
    password: process.env.DB_PASSWORD || "R3mark_Careers_2024!",
    max: 10,
    idleTimeoutMillis: 30000,
});

export default pool;
