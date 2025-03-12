"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("SuccessStories", [
      {
        fullName: "محمد خالد",
        university: "جامعة القاهرة",
        story: "نجحت في تطوير أول تطبيق خاص بي!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "سارة أحمد",
        university: "جامعة الأردن",
        story: "حصلت على وظيفة أحلامي بعد التخرج!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "خالد محمود",
        university: "جامعة دمشق",
        story: "تمكنت من تأسيس شركتي الخاصة!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "ليلى حسن",
        university: "جامعة بيروت",
        story: "فزت بجائزة أفضل مشروع تخرج!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "يوسف علي",
        university: "جامعة الجزائر",
        story: "حصلت على منحة دراسية في الخارج!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "نورا سعيد",
        university: "جامعة بغداد",
        story: "تمكنت من برمجة أول موقع إلكتروني لي!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("SuccessStories", null, {});
  },
};
