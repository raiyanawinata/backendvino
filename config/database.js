const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'vinodb',
  'root',
  '', {
    host: 'localhost',
    dialect: 'mysql',
  }
);

module.exports = sequelize;
