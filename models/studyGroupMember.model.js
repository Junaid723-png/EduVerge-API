import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const StudyGroupMember = sequelize.define('StudyGroupMember', {
  studyGroupId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'StudyGroup',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  joinedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  role: {
    type: DataTypes.ENUM('member', 'moderator'),
    allowNull: false,
    defaultValue: 'member',
  },
}, {
  tableName: 'StudyGroupMember',
  timestamps: false,
});

export default StudyGroupMember;