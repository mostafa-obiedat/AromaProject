'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Donors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // جدول المستخدمين
          key: 'id' // المفتاح الخارجي للمستخدم
        },
        onDelete: 'CASCADE', // إذا تم حذف المستخدم، يتم حذف المتبرع المرتبط
      },
      donationPreferences: {
        type: Sequelize.STRING, // تفضيلات التبرع للمستخدم
      },
      totalDonations: {
        type: Sequelize.DECIMAL(15, 2),
        defaultValue: 0.0, // القيمة الافتراضية 0.0 للتبرعات
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Donors');
  }
};
