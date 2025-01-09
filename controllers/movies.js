import express from "express";
import { getAllMovies } from "../models/movies.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  const result = await getAllMovies();
  res.send(result);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
