import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Chat = sequelize.define('Chat', {
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
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  sentAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  messageType: {
    type: DataTypes.ENUM('text', 'file', 'system'),
    allowNull: false,
    defaultValue: 'text',
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Chat',
  timestamps: true,
});

export default Chat;