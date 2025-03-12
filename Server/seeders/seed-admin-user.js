"use strict";

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const hashedPassword = await bcrypt.hash("Admin@1234", 10);

      console.log("Hashed Password:", hashedPassword);

      await queryInterface.bulkInsert("Users", [
        {
          firstName: "Admin",
          lastName: "User",
          email: "admin@admin.com",
          password: hashedPassword,
          role: "admin",
          status: "approved",
          phoneNumber: "1234567890",
          address: "123 Admin Street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);

      console.log("Admin user seeded successfully!");
    } catch (error) {
      console.error("Error seeding admin user:", error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded admin user
    await queryInterface.bulkDelete("Users", { email: "admin@example.com" });
    console.log("Admin user removed successfully!");
  },
};
