import { pool } from '../db/index.js';

export const getAllMovies = async () => {
  const text = 'SELECT * FROM Movies';
  const res = await pool.query(text);
  console.log(res.rows);
  return res.rows;
};

export const getMovieById = async (id) => {
  if (!id) {
    throw new Error('Please provide a valid movie id');
  }
  try {
    const text = `SELECT * FROM Movies WHERE movie_id = $1`;
    const values = [id];
    const result = await pool.query(text, values);
    return result.rows;
  } catch (err) {
    throw new Error(`Cannot find movie with id ${id}`);
  }
};
