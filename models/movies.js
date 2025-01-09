import { pool } from "../db/index.js";

export const getAllMovies = async () => {
  const text = "SELECT * FROM Movies";
  const res = await pool.query(text);
  console.log(res.rows);
  return res.rows;
};
