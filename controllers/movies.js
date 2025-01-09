import express from "express";
const app = express();

// import {
//     getAllMovies,
// } from "/models/movies.js";

app.use(express.json());

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

app.get("/", async function (req, res) {
  const result = await getAllMovies();
  res.send("Yes, it's working");
});
