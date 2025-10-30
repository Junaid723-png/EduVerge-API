import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const UserGoal = sequelize.define('UserGoal', {
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
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  targetDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'completed', 'cancelled'),
    allowNull: false,
    defaultValue: 'active',
  },
  goalType: {
    type: DataTypes.ENUM('course_completion', 'study_hours', 'skill_acquisition'),
    allowNull: false,
  },
}, {
  tableName: 'UserGoal',
  timestamps: true,
});

export default UserGoal;