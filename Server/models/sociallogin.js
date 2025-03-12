'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SocialLogin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SocialLogin.init({
    userId: DataTypes.INTEGER,
    provider: DataTypes.STRING,
    providerId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SocialLogin',
  });
  return SocialLogin;
};