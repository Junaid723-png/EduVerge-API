import DataTypes from 'sequelize';
import sequelize from '../sequelize.js';

const Course = sequelize.define('Courses', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  courseName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  courseDescription: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  prerequisites: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  accessPeriod: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  courseCollection: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Courses',
  timestamps: true,
});

export default Course;