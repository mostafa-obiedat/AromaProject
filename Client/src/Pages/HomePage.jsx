import React from "react";
import Hero from "../Components/Hero";
import EducationSection from "../Components/EducationSection";
import StatsSection from "../Components/StatsSection"; // استدعاء السيكشن الثالث
import ContactSection from "../Components/ContactSection";
// import Chatbot from "../components/Chatbot";
const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* ✅ الهيرو سيكشن */}
      <Hero />

      {/* ✅ السيكشن الثاني (أهمية التعليم والتبرع) */}
      <EducationSection />

      {/*✅ السيكشن الثالث (الإحصائيات والمشاركة المجتمعية)*/}
      <StatsSection />

      <ContactSection />

      {/* <Chatbot /> */}

      {/* ✅ باقي الصفحة */}
      <div className="container mx-auto py-16 px-6 text-center">
      </div>
    </div>
  );
};

export default HomePage;