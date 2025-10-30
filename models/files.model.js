import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Files = sequelize.define('Files', {
  editModeSettingsId: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    references: {
      model: 'EditModeSettings',
      key: 'id'
    }
  },
  file: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'Files',
  timestamps: false,
});

export default Files;