import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const UserProgress = sequelize.define('UserProgress', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  goalId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  goalType: {
    type: DataTypes.ENUM('user', 'system'),
    allowNull: false,
  },
  currentValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'UserProgress',
  timestamps: true,
  createdAt: false, // We only use updatedAt
});

export default UserProgress;