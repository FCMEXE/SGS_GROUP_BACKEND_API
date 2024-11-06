// database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;  // Exportando o sequelize

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco bem-sucedida'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));
