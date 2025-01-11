import { pool } from '../index.js';

const testConnection = async () => {
  try {
    //Delete the tables if they exist
    await pool.query(`DROP TABLE IF EXISTS movies CASCADE;
                        DROP TABLE IF EXISTS stars CASCADE;`);
    //Create the stars table
    await pool.query(`CREATE TABLE stars (
          name VARCHAR(50),
          star_id INT PRIMARY KEY
  );`);

    //Create the movies table
    await pool.query(`CREATE TABLE movies (
      movie_id SERIAL PRIMARY KEY,
      title VARCHAR(100) NOT NULL,
      genre VARCHAR(50) NOT NULL,
      star_id INT,
      FOREIGN KEY (star_id) REFERENCES stars(star_id) ON DELETE CASCADE
    );`);

    //Insert data into the tables
    await pool.query(
      `INSERT INTO stars (name, star_id) VALUES ('Tim Robbins', 44), ('Julia Roberts', 25), ('Dustin Hoffman', 12), ('Michelle Williams', 39), ('Saoirse Ronan', 52);`
    );
    await pool.query(
      `INSERT INTO movies (movie_id, title, genre, star_id) VALUES (1, 'The Shawshank Redemption', 'Drama', 44), (2, 'Pretty Woman', 'Romance', 25), (3, 'Rain Man', 'Comedy drama', 12), (4, 'Manchester by the Sea', 'Drama', 39), (5, 'Lady Bird', 'Comedy Drama', 52);`
    );

    console.log('Database connection successful');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    //Close the pool or it will hang
    await pool.end();
  }
};

testConnection();
