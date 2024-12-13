import {DataTypes} from 'sequelize';
import db from '../db.js';

const Taxon = db.define('Taxon', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  science_name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'taxons',
  timestamps: false,
});

export default Taxon