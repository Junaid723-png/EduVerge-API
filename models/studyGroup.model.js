import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';
// id, groupName, description, courseId, createdBy, createdAt, tags, difficulty, maxMembers, isPublic` 
const StudyGroup = sequelize.define('StudyGroup', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: 'Courses',
      key: 'id'
    }
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
  tags:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  difficulty:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  maxMembers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 50,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'StudyGroup',
  timestamps: true,
});

export default StudyGroup;