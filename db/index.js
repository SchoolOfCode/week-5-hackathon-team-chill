import pg from 'pg';

//set up string .process.env
const connectionString = process.env.DB_CONNECTION_STRING;

//share pg within file
export const pool = new pg.Pool({ connectionString });
