// "use strict";
// const { Model } = require("sequelize");
// module.exports = (sequelize, DataTypes) => {
//   class Beneficiary extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       this.belongsTo(models.User, { foreignKey: "userId" });
//       this.belongsToMany(models.Program, {
//         through: "BeneficiaryPrograms",
//         foreignKey: "beneficiaryId",
//       });
//     }
//   }
//   Beneficiary.init(
//     {
//       userId: DataTypes.INTEGER,
//       eligibilityStatus: DataTypes.STRING,
//       needsDescription: DataTypes.TEXT,
//       approvedByAdmin: DataTypes.BOOLEAN,
//     },
//     {
//       sequelize,
//       modelName: "Beneficiary",
//     }
//   );
//   return Beneficiary;
// };


"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Beneficiary extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      
    }
  }
  Beneficiary.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      universityName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      universityNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      brothers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      filePath: { 
        type: DataTypes.STRING,
         allowNull: true 
      },
      needsDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      approvedByAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Soft Delete
      },
    },
    {
      sequelize,
      modelName: "Beneficiary",
      tableName: "Beneficiaries",
    }
  );
  return Beneficiary;
};
