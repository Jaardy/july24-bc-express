const express = require("express");
const app = express();
const { moviesRouter } = require("./routes/movies");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/movies", moviesRouter);
app.use("/shows", require("./routes/shows"));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
