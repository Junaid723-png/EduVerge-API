import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const CourseSettings = sequelize.define('CourseSettings', {
  editModeSettingsId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'EditModeSettings',
      key: 'id'
    }
  },
  setting: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'CourseSettings',
  timestamps: false,
});

export default CourseSettings;