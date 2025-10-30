import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const TextElement = sequelize.define('TextElement', {
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
  context: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  run: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'TextElement',
  timestamps: true,
});

export default TextElement;