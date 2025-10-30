import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Event = sequelize.define('Event', {
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
  eventType: {
    type: DataTypes.ENUM('webinar', 'workshop', 'study_session'),
    allowNull: false,
  },
  startDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDateTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  organizerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  maxAttendees: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'Event',
  timestamps: true,
});

export default Event;