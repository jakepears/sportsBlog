/** @format */
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelizeOptions = {
    logging: console.log //logs SQL quiries onto console for better debugging
};

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306,
  }
);

module.exports = sequelize;