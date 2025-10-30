import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Leaderboard = sequelize.define('Leaderboard', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  studyGroupId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'StudyGroup',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Course',
      key: 'id'
    }
  },
  score: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0,
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lastUpdated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  metricType: {
    type: DataTypes.ENUM('completion', 'quizzes', 'participation'),
    allowNull: false,
  },
}, {
  tableName: 'Leaderboard',
  timestamps: true,
});

export default Leaderboard;