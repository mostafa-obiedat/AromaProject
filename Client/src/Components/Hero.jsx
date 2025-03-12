import React from "react";
import { Link } from "react-router-dom";
function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-gray-200 py-20 lg:py-32 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 right-10 w-40 h-40 rounded-full bg-pink-100 opacity-50"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-purple-100 opacity-50"></div>
      </div>
      
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-12 relative z-10">
        {/* Text and details */}
        <div className="lg:w-1/2 text-center lg:text-right mt-12 lg:mt-0">
          <h1 className="text-4xl lg:text-5xl font-bold text-[#940066] leading-tight"> منصة أرومة لدعم التعليم الجامعي   </h1>
          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
          في أرومة، نؤمن بأن التعليم هو مفتاح التغيير 🌟. منصتنا الخيرية تهدف إلى جمع التبرعات المالية لدعم الطلبة الجامعيين غير القادرين على تحمل تكاليف دراستهم، ومنحهم فرصة استكمال تعليمهم وتحقيق أحلامهم.

يمكنك من خلال موقعنا التبرع لدعم الطلاب أو التقديم للحصول على منحة وفقًا للشروط الموضحة لدينا. معًا، نصنع مستقبلًا أكثر إشراقًا! 🤝✨
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-end space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <div className="flex flex-wrap gap-6 justify-center items-center">
  
  <button className="bg-[#940066] hover:bg-[#ECECEC] text-white px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg hover:bg-[#ECECEC] hover:text-[#940066] hover:border hover:border-[#940066] transition-all ml-100">
    <Link to="/ScholarshipTerms">شروط المنحة</Link>
  </button>
</div>

          </div>
        </div>
        
        {/* Image with enhanced styling */}
        <div className="lg:w-1/2 flex justify-center relative">
          <div className="absolute w-64 h-64 bg-[#940066] rounded-full opacity-10 -z-10 transform translate-x-10 translate-y-10"></div>
          <img
            src="src/assets/student.jpg" // Replace with actual image path
            alt="طالبة تحصل على منحة"
            className="w-80 lg:w-[420px] rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105 border-4 border-white"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;