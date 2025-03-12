'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BeneficiaryProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BeneficiaryProgram.init({
    beneficiaryId: DataTypes.INTEGER,
    programId: DataTypes.INTEGER,
    enrollmentDate: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BeneficiaryProgram',
  });
  return BeneficiaryProgram;
};