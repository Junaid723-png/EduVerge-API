import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const SystemGoal = sequelize.define('SystemGoal', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  goalType: {
    type: DataTypes.ENUM('course_completion', 'study_hours', 'skill_acquisition'),
    allowNull: false,
  },
  targetValue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'SystemGoal',
  timestamps: true,
});

export default SystemGoal;