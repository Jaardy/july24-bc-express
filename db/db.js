const path = require('path');
const { Sequelize } = require('sequelize');

let db;
if (process.env.NODE_ENV == 'development') {
  db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
    logging: false,
  });
}
if (process.env.NODE_ENV == 'testing') {
  db = new Sequelize('sqlite::memory:', { logging: false });
}


module.exports = {
  db
};