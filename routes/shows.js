const { Router } = require("express");

const { Show } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (error) {
    next(error);
  }
});

// Get a single show by ID
router.get("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      res.json(show);
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Create a new show
router.post("/", async (req, res, next) => {
  try {
    const newShow = await Show.create(req.body);
    res.status(201).json(newShow);
  } catch (error) {
    next(error);
  }
});

// Update an existing show by ID
router.put("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      await show.update(req.body);
      res.json(show);
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    next(error);
  }
});

// Delete a show by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (show) {
      await show.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Show not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
