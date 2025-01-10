import express from 'express';
import {
  getAllMovies,
  getMovieById,
  updateMovieById,
} from '../models/movies.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const result = await getAllMovies();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/:id', async (req, res) => {
  const movieId = req.params.id;
  try {
    //sql select movie with given id
    const getMovie = await getMovieById(movieId);
    res.status(200).send(getMovie);
  } catch (err) {
    if (err.message === `Cannot find movie with id ${movieId}`) {
      res.status(404).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  }
});

app.patch('/:id', async (req, res) => {
  try {
    // Update a movie
    const movieId = req.params.id;
    const { title, genre } = req.body;
    if (!title || !genre) {
      res.status(400).send('Missing title and/or genre');
    }
    const updatedMovie = await updateMovieById(movieId, title, genre);
    res.status(200).send(updatedMovie);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
