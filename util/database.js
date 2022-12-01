const Sequelize = require('sequelize');

const sequelize = new Sequelize('complete_node', 'root', 'jan2022@Nua361', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
