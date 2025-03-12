'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gamification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gamification.init({
    userId: DataTypes.INTEGER,
    badgeName: DataTypes.STRING,
    rewardDescription: DataTypes.TEXT,
    awardedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Gamification',
  });
  return Gamification;
};