const { Router } = require("express");
const { Movie } = require("../models");

const moviesRouter = Router();

moviesRouter.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    next(error);
  }
});

// Get a single movie by ID
moviesRouter.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Create a new movie
moviesRouter.post("/", async (req, res, next) => {
  try {
    const newMovie = await Movie.create(req.body);
    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
});

// Update an existing movie by ID
moviesRouter.put("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie) {
      await movie.update(req.body);
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a movie by ID
moviesRouter.delete("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (movie) {
      await movie.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { moviesRouter };
