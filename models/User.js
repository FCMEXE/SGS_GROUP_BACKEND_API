const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // O ID será auto-incrementado
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Email deve ser único
  },
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Login deve ser único
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,  // Desativa os campos createdAt e updatedAt
},

{ tableName: "usuarios" // Definindo o nome da tabela para 'usuarios'
  }
);

module.exports = User;

const Ponto = require('./Ponto');

User.hasMany(Ponto, { foreignKey: 'userId' });
Ponto.belongsTo(User, { foreignKey: 'userId' });
