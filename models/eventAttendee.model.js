import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const EventAttendee = sequelize.define('EventAttendee', {
  eventId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Events',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  registeredAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  attendanceStatus: {
    type: DataTypes.ENUM('registered', 'attended', 'cancelled'),
    allowNull: false,
    defaultValue: 'registered',
  },
}, {
  tableName: 'EventAttendee',
  timestamps: false,
});

export default EventAttendee;