import React from "react";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <div className="relative w-full h-[450px] pt-32 pb-20 bg-[#ECECEC]" dir="rtl">
      {/* محتوى القسم */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          {/* النصوص */}
          <div className="w-full md:w-2/3 text-right mt-6 md:mt-0 mr-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#940066] mb-6 leading-snug">
              لديك استفسار؟ تواصل معنا الآن!
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              فريقنا جاهز للرد على جميع استفساراتك وتقديم المساعدة التي تحتاجها 💬
              <br className="hidden md:block" />
              لا تتردد في التواصل معنا وسنكون سعداء بخدمتك!
            </p>
          </div>

          {/* زر التواصل */}
          <div className="mt-8 md:mt-0">
            <Link to="/contact">
              <button className="bg-[#940066] hover:bg-[#7A0052] text-white py-4 px-12 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                تواصل معنا الآن
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
