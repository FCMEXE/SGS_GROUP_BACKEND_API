const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Assumindo que a conexão está configurada

const Ponto = sequelize.define('Ponto', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios', // Nome da tabela de usuários
      key: 'id',
    }
  },
  entryTime: { type: DataTypes.TIME, allowNull: true },
  exitTime: { type: DataTypes.TIME, allowNull: true },
  lunchStart: { type: DataTypes.TIME, allowNull: true },
  lunchEnd: { type: DataTypes.TIME, allowNull: true },
  day: { type: DataTypes.STRING, allowNull: false },
}, {
  tableName: 'pontos', // Define o nome da tabela
  timestamps: false
});

module.exports = Ponto;
