'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Donation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Donation.init({
    donorId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
    currency: DataTypes.STRING,
    donationDate: DataTypes.DATE,
    programId: DataTypes.INTEGER,
    receiptGenerated: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Donation',
  });
  return Donation;
};