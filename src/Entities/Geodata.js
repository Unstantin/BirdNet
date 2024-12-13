const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Geodata = sequelize.define('Geodata', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  area: {
    type: DataTypes.GEOMETRY('POLYGON'), // Используем тип GEOMETRY для POLYGON
    allowNull: false,
  },
}, {
  tableName: 'Geodata',
  timestamps: false,
});

module.exports = Geodata;