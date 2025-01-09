import pg from "pg";

//set up string .process.env
const connectionString = process.env.DB_CONNECTION_STRING;

if (!connectionString) {
  throw new Error("No DB_CONNECTION_STRING defined. Add .env variables");
}

//share pg within file
export const pool = new pg.Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
