import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const CourseReview = sequelize.define('CourseReview', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Courses',
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
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  reviewText: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  tableName: 'CourseReview',
  timestamps: true,
});

export default CourseReview;