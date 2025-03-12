import React from "react";
import { Link } from "react-router-dom";

const EducationSection = () => {
  return (
    <section className="bg-white py-20 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-pink-50 rounded-full opacity-70"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-50 rounded-full opacity-70"></div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNGQkVERjkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12 relative z-10">
        {/* Text content */}
        <div className="lg:w-1/2 text-center lg:text-right mt-10 lg:mt-0">
          <div className="lg:pr-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#940066] leading-tight">
              التعليم هو النور، والتبرع هو شعلة الأمل
            </h2>

            <div className="mt-6 px-4 py-3 bg-gray-50 border-r-4 border-[#940066] rounded-lg shadow-sm">
              <p className="text-gray-700 text-lg leading-relaxed italic">
                "التعليم هو الجسر الذي يعبر عليه الطلبة نحو مستقبل أفضل، وهو
                النور الذي يبدد ظلام الحاجة والعوز."
              </p>
            </div>

            <p className="mt-6 text-gray-700 text-lg leading-relaxed">
              في <strong>أرومة</strong>، نؤمن أن كل طالب لديه حلم، ولكن ليس
              الجميع يملكون الفرصة لتحقيقه. 🎓 نحن <strong>منصة خيرية</strong>{" "}
              تهدف إلى <strong>جمع التبرعات</strong> لتغطية تكاليف التعليم
              الجامعي للطلبة غير المقتدرين، لنمنحهم فرصة استكمال دراستهم وبناء
              مستقبلهم.
            </p>

            <p className="mt-4 text-gray-700 text-lg leading-relaxed">
              عندما تتبرع، فأنت لا تقدم مساعدة فقط، بل{" "}
              <strong>تستثمر في مستقبل واعد</strong>. كل مساهمة تحدث فرقًا
              حقيقيًا، فقد تكون سببًا في تحويل طالب اليوم إلى قائد الغد! 🌟
            </p>

            <p className="mt-4 text-gray-700 text-lg leading-relaxed font-semibold">
              💜 لا تدع الأحلام تتوقف بسبب قلة الموارد! ساهم الآن في بناء مستقبل
              مشرق وكن جزءًا من رحلة العطاء والتغيير.
            </p>

            <div className="mt-8 text-center lg:text-right">
              <Link to="/donate">
                <button className="border-2 border-[#940066] text-[#940066] hover:bg-[#940066] hover:text-white px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                  تبرّع الآن
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Image with enhancements */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="absolute -z-10 w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full opacity-80 transform translate-x-10 translate-y-10"></div>
          <div className="relative p-2 bg-white rounded-2xl shadow-2xl rotate-3 transition-transform duration-500 hover:rotate-0 hover:scale-105">
            <img
              src="src/assets/stdent2.jpg" // Replace with actual image path
              alt="التبرع للعلم"
              className="w-80 lg:w-[400px] rounded-xl shadow-inner"
            />
            <div className="absolute -bottom-3 -right-3 bg-[#940066] text-white px-4 py-2 rounded-lg shadow-lg transform rotate-3">
              استثمر في مستقبلهم
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
