import express from "express";
const app = express();
const PORT = 3000;

// import {
//     getAllMovies,
// } from "/models/movies.js";

app.use(express.json());

app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});

app.get("/", async function (req, res) {
  const result = await getAllMovies();
  res.send("Yes, it's working");
});
