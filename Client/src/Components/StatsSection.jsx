import { FaUsers, FaGraduationCap, FaHandsHelping } from "react-icons/fa";

const StatsSection = () => {
  return (
    <section className="bg-white py-32 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -left-16 top-1/4 w-32 h-32 bg-pink-50 rounded-full opacity-60"></div>
      <div className="absolute -right-16 bottom-1/4 w-32 h-32 bg-pink-50 rounded-full opacity-60"></div>
      
      <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
        {/* Stats cards section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 text-center mb-32">
          {/* Graduates stat card */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 flex items-center justify-center bg-pink-50 text-[#940066] rounded-full mb-4">
                <FaGraduationCap className="text-6xl" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-900 flex items-center justify-center">
                <span className="relative">
                  <span>12</span>
                </span>
              </h3>
              <p className="text-xl text-gray-600 font-medium">الشركاء والداعمين  </p>
            </div>
          </div>
          
          {/* Beneficiaries stat card */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 flex items-center justify-center bg-pink-50 text-[#940066] rounded-full mb-4">
                <FaUsers className="text-6xl" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-900 flex items-center justify-center">
                <span className="relative">
                  <span>98</span>
                </span>
              </h3>
              <p className="text-xl text-gray-600 font-medium">'طلاب مستفيدين' </p>
            </div>
          </div>
          
          {/* Projects stat card */}
          <div className="bg-white rounded-2xl shadow-md p-8 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
            <div className="flex flex-col items-center space-y-6">
              <div className="w-24 h-24 flex items-center justify-center bg-pink-50 text-[#940066] rounded-full mb-4">
                <FaHandsHelping className="text-6xl" />
              </div>
              <h3 className="text-5xl font-extrabold text-gray-900 flex items-center justify-center">
                <span className="relative">
                  <span>628</span>
                  <span className="absolute -top-2 -right-6 text-[#940066] text-3xl">+</span>
                </span>
              </h3>
              <p className="text-xl text-gray-600 font-medium">زوارنا الكرام </p>
            </div>
          </div>
        </div>
        
        {/* "Be Effective" section */}
        <div className="text-center bg-white rounded-3xl shadow-xl py-16 px-8 md:px-16 max-w-5xl mx-auto relative border-t-8 border-[#940066]">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#940066] text-white px-10 py-4 rounded-full shadow-lg text-xl font-bold">
            كن فعالاً في مجتمعك
          </div>
          
          <h2 className="text-4xl font-bold text-[#940066] mt-8 mb-6">
            كن جزءًا من التغيير وساهم في بناء مستقبل مشرق! ✨
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto my-8">
            معًا يمكننا مساعدة المزيد من الطالبات لاستكمال تعليمهن ✨
          </p>
          
          {/* Circular buttons */}
          <div className="flex flex-wrap justify-center gap-10 mt-12">
            <button className="bg-[#940066] text-white font-medium w-40 h-40 flex flex-col items-center justify-center rounded-full text-xl shadow-lg hover:bg-[#b00077] transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
              <FaHandsHelping className="text-4xl mb-3" />
              كن متطوعًا
            </button>
            
            <button className="bg-[#940066] text-white font-medium w-40 h-40 flex flex-col items-center justify-center rounded-full text-xl shadow-lg hover:bg-[#b00077] transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
              <FaGraduationCap className="text-4xl mb-3" />
              طوّر التعليم
            </button>
            
            <button className="bg-[#940066] text-white font-medium w-40 h-40 flex flex-col items-center justify-center rounded-full text-xl shadow-lg hover:bg-[#b00077] transition-all duration-300 transform hover:scale-110 hover:-translate-y-2">
              <FaUsers className="text-4xl mb-3" />
              تبرع بشكل آمن
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;