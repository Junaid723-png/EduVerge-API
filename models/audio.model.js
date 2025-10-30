import { DataTypes } from 'sequelize';
import sequelize from '../sequelize.js';

const Audio = sequelize.define('Audio', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  editModeSettingsId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'EditModeSettings',
      key: 'id'
    }
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audioLink: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audioStartTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  audioEndTime: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'Audio',
  timestamps: true,
});

export default Audio;