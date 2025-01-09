import express from 'express';
import { getAllMovies, getMovieById } from '../models/movies.js';

const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
  const result = await getAllMovies();
  res.send(result);
});

app.get('/:id', async (req, res) => {
  if (!req.params.id) {
    throw new Error('Please provide a valid movie id');
  }
  const movieId = req.params.id;
  try {
    //sql select movie with given id
    const getMovie = await getMovieById(movieId);
    res.status(200).send(getMovie);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
