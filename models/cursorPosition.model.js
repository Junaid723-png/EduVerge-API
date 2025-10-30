import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const CursorPosition = sequelize.define('CursorPosition', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  interactiveModeId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'InteractiveMode',
      key: 'id'
    }
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  x: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  y: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  tableName: 'CursorPosition',
  timestamps: true,
});

export default CursorPosition;