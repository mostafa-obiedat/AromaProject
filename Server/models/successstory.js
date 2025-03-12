'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SuccessStory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SuccessStory.init({
    fullName: DataTypes.STRING,
    university: DataTypes.STRING,
    story: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'SuccessStory',
  });
  return SuccessStory;
};