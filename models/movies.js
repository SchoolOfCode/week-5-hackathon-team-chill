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
    if (result.rows.length === 0) {
      throw new Error('`Cannot find movie with id ${id}`');
    } else {
      return result.rows;
    }
  } catch (err) {
    throw new Error(`Cannot find movie with id ${id}`);
  }
};

export const updateMovieById = async (id, title, genre) => {
  const text = `UPDATE movies SET title = $2, genre = $3 WHERE movie_id = $1 RETURNING *`;
  const values = [id, title, genre];
  try {
    const result = await pool.query(text, values);
    if (result.rowCount === 0) {
      //rowCount counts the rows AFFECTED by changes
      return null;
    }
    return result.rows;
  } catch (err) {
    throw new Error('Update failed');
  }
};

export const deleteMovieById = async (id) => {
  // isMovieIdInDb(id);

  try {
    const text = `DELETE FROM Movies WHERE movie_id = $1 RETURNING *;`;
    const value = [id];
    const result = await pool.query(text, value);
    return result.rows[0];
  } catch (err) {
    throw new Error(`No movie with id ${value} exists`);
  }
};

// export const isMovieIdInDb = async (id) => {
//   const text = `SELECT * FROM Movies WHERE movie_id = $1`;
//   const values = [id];
//   const result = await pool.query(text, values);
//   if (result.rows.length === 0) {
//     return false;
//   } else {
//     return true;
//   }
// };
