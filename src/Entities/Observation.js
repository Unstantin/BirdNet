import {DataTypes} from 'sequelize';
import db from '../db.js';
import User from '../Entities/User.js'
import Taxon from '../Entities/Taxon.js'

const Observation = db.define('Observation', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  geo_x: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  geo_y: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'observations',
  timestamps: false,
});

Observation.belongsTo(User, {
  foreignKey: 'author_id',
  as: 'author',
});

Observation.belongsTo(Taxon, {
  foreignKey: 'taxon_id',
  as: 'taxon',
});

export default Observation