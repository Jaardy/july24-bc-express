const {db } = require('../db/db');
const {DataTypes} = require('sequelize')

const Show = db.define('show', {
  title: DataTypes.STRING,
  year: DataTypes.INTEGER,
  rating: DataTypes.INTEGER,
  seasons: DataTypes.INTEGER
});

module.exports = { Show };