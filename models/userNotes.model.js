import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const UserNotes = sequelize.define('UserNotes', {
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
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Course',
      key: 'id'
    }
  },
  lessonId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'UserNotes',
  timestamps: true,
});

export default UserNotes;