import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const InteractiveMode = sequelize.define('InteractiveMode', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Course',
      key: 'id'
    }
  },
  fileType: {
    type: DataTypes.ENUM('video', 'document', 'interactive', 'quiz'),
    allowNull: false,
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'InteractiveMode',
  timestamps: true,
});

export default InteractiveMode;