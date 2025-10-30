import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Note = sequelize.define('Note', {
  noteId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  userNotesId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'UserNotes',
      key: 'id'
    }
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  context: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  fileType: {
    type: DataTypes.ENUM('text', 'image', 'audio', 'document'),
    allowNull: true,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Note',
  timestamps: true,
});

export default Note;