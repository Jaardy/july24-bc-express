const {db} = require('../db/db');
const {Movie} = require('../models');
const {Show} = require('../models');
const {shows, movies} = require('./seedData.js');

const seed = async () => {
  try {
    await db.sync({ force: true }); // recreate db
    await Movie.bulkCreate(shows);
    await Show.bulkCreate(movies);
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;