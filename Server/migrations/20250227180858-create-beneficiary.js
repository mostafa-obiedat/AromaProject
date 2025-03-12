"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Beneficiaries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      universityName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      universityNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      brothers: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      filePath: {
        type: Sequelize.STRING(1000),
        allowNull: true, // تخزين مسار الملف (صورة أو PDF)
      },
      needsDescription: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      approvedByAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false, // Soft Delete
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Beneficiaries");
  },
};
