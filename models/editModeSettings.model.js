import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const EditModeSettings = sequelize.define('EditModeSettings', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  courseId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Courses',
      key: 'id'
    }
  },
}, {
  tableName: 'EditModeSettings',
  timestamps: true,
});

export default EditModeSettings;