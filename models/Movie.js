const {db } = require('../db/db');
const {DataTypes} = require('sequelize')

const Movie = db.define('movie', {
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  rating: DataTypes.INTEGER,
});

module.exports = { Movie };