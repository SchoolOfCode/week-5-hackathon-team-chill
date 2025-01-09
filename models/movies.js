import { pool } from '../db/index.js';

export const getAllMovies = async () => {
  const text = 'SELECT * FROM Movies;';
  const res = pool.query(text);
  return res.rows;
};
