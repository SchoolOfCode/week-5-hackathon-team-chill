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
        movie_id INT PRIMARY KEY,
        title VARCHAR(50),
        genre VARCHAR(50),
        star_id INT,
        FOREIGN KEY (star_id) REFERENCES stars(star_id)
  );`);

    //Insert data into the tables
    await pool.query(
      `INSERT INTO stars (name, star_id) VALUES ('Tim Robbins', 44), ('Julia Roberts', 25);`
    );
    await pool.query(
      `INSERT INTO movies (movie_id, title, genre, star_id) VALUES (1, 'The Shawshank Redemption', 'Drama', 44), (2, 'Pretty Woman', 'Romance', 25);`
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
