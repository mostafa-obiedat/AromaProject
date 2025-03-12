"use strict";
const { Model } = require("sequelize");


module.exports = (sequelize, DataTypes) => {
  class Donor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      this.hasMany(models.Donation, { foreignKey: "donorId", as: "donations" });
    }
  }
  Donor.init(
    {
      userId: DataTypes.INTEGER,
      donationPreferences: DataTypes.TEXT,
      totalDonations: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Donor",
    }
  );
  return Donor;
};
