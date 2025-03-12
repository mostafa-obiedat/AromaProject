import { FaUniversity, FaHandsHelping, FaDonate, FaHeartbeat, FaUserGraduate ,FaShieldAlt, FaUsers  } from "react-icons/fa";
import { Link } from "react-router-dom";



import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gray-100 py-10">

<div
  className="relative bg-cover bg-center"
  style={{ backgroundImage: "url('https://ju.edu.jo/ar/grad2022/PublishingImages/04-08-2022%20(727).JPG')" }}
  dir="rtl"
>
  {/* طبقة تظليل بخلفية بنفسجية */}
  <div className="absolute inset-0 bg-[#940066] opacity-70"></div>
  
  {/* المحتوى الرئيسي */}
  <div className="container mx-auto px-6 py-32 relative z-10 text-right">
    <h1 className="text-5xl font-bold text-white mb-6">
      منصة تبرّع الآن
    </h1>
    <p className="text-xl text-gray-200 mb-8">
      ندعم طلاب الجامعات لتحقيق أحلامهم وتجاوز التحديات المالية.
    </p>
    <Link
  to="/donate"
  className="px-8 py-4 bg-white text-[#940066] font-semibold rounded-full shadow-lg transform transition hover:scale-105 hover:bg-gray-100"
>
  تبرّع الآن
</Link>
  </div>
</div>









      <div className="container mx-auto px-6 lg:px-16 text-right my-20">
        
      <section className="w-full max-w-6xl mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-8">
  {/* Left side - Text content */}
  <div className="w-full md:w-1/2">
    <h2 className="text-4xl font-bold text-gray-700 mb-6">قصتنا</h2>
    <p className="text-gray-500 text-lg leading-relaxed">
      في عالم مليء بالتحديات، نحلم بأن لا يكون المال عائقًا أمام طلاب الجامعات لإكمال دراستهم.
      منصة <span className="font-bold text-[#940066]">تبرّع الآن</span> وُجدت لتجعل هذا الحلم حقيقة، عبر تسهيل عمليات التبرع وربط المحسنين مع الطلاب المحتاجين بطرق شفافة وعادلة.
    </p>
  </div>
  
  {/* Right side - Image with curved shape */}
  <div className="w-full md:w-1/2 relative">
    <div className="bg-gray-100 rounded-bl-full rounded-tl-full overflow-hidden relative">
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFLhy2zV7fMTC4E2Mj4Fq4Q6luka0aaBu2NONECYX6GZccP3EDCh9lXMrU0TGy_1fcEO0&usqp=CAU" 
        alt="قصتنا" 
        className="object-cover w-full h-80" // Adjusted height for better visibility
      />
      
      {/* Curved overlay */}
      <div className="absolute inset-0 bg-[#940066] opacity-25 rounded-bl-full rounded-tl-full"></div>

      {/* Signature overlay */}
      <div className="absolute bottom-4 right-8 flex flex-col items-end">
        <div className="text-white text-xl font-light mb-2">
          <svg viewBox="0 0 100 30" className="w-32 h-10">
            <path d="M10,20 Q30,5 50,20 T90,20" stroke="white" fill="transparent" strokeWidth="2" />
          </svg>
        </div>
        <div className="text-gray-300 text-xs">المؤسس المشارك &amp; المدير التنفيذي</div>
      </div>
    </div>
  </div>
</section>
        {/* الرؤية والقيم */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* الرؤية */}
          <div className="bg-[#940066] text-white p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <FaUniversity size={50} className="mb-4" />
            <h3 className="text-2xl font-semibold mb-2">رؤيتنا</h3>
            <p className="leading-relaxed">
              بناء جيل متعلم، قادر على تحقيق أحلامه دون عوائق مالية.
            </p>
          </div>

          {/* القيم الأساسية */}
          <div className="bg-gray-200 text-gray-800 p-6 rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <FaHandsHelping size={50} className="text-[#940066] mb-4" />
            <h3 className="text-2xl font-semibold mb-2">قيمنا</h3>
            <p className="leading-relaxed">
              الشفافية، العطاء، التكافل، والتمكين.
            </p>
          </div>
        </div>


        <section className="mt-10 p-8 bg-white rounded-xl shadow-lg">
  <h2 className="text-3xl font-bold text-[#940066] text-center mb-6">برامجنا</h2>
  <hr className="w-20 border-[#940066] mb-4 mx-auto" />

  <div className="grid md:grid-cols-3 gap-6">
    {/* البرنامج الأول */}
    <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW3YgOgEIf9AyWIO5Z_465vJSjbGPR5K_qAwtJ74IqKEXpLvDaJ4PpdVHPVzlaUBZecwU&usqp=CAU" alt="الفرص التعليمية" className="w-full h-48 object-cover" />
  <div className="p-4 text-center">
    <h4 className="text-xl font-semibold">الفرص التعليمية</h4>
    <p className="text-gray-600">
      نقدم مجموعة من الفرص التعليمية للطلاب المحتاجين، تهدف لدعم مسيرتهم الأكاديمية وتسهيل وصولهم إلى التعليم.
    </p>
  </div>
</div>

    {/* البرنامج الثاني */}
    <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src="https://www.cairo24.com/UploadCache/libfiles/109/2/600x338o/444.jpg" alt="المنح الجامعية" className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h4 className="text-xl font-semibold">المنح الجامعية</h4>
        <p className="text-gray-600">
          تقدم المنح للطلاب الذين يحتاجون للدعم المالي، وتوفر حتى 1500 دولار سنويًا. تهدف إلى تسهيل الوصول للتعليم العالي.
        </p>
      </div>
    </div>

    {/* البرنامج الثالث */}
    <div className="bg-gray-200 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBdUG6u2OKEjxPaF-fZTduECaNZMchQrDNvjycC9gkGIZytblXKHRhXpuZmPfV6zRXl1g&usqp=CAU" alt="المساعدات المالية" className="w-full h-48 object-cover" />
      <div className="p-4 text-center">
        <h4 className="text-xl font-semibold">المساعدات المالية</h4>
        <p className="text-gray-600">
          نوفر الدعم المالي للطلاب المحتاجين، مع التركيز على تقديم المساعدة بدون الحاجة للسداد. نحن هنا لدعمكم في رحلتكم التعليمية.
        </p>
      </div>
    </div>
  </div>
</section>

{/* لماذا نحن؟ */}
<section className="relative bg-[#f9f9f9] py-12 px-6 rounded-xl shadow-lg mt-10 overflow-hidden">
  <h2 className="text-3xl font-bold text-[#940066] text-center mb-6">لماذا نحن؟</h2>
  <hr className="w-20 border-[#940066] mx-auto mb-6" />

  <div className="grid md:grid-cols-3 gap-6 relative z-10">
    <div className="p-6 bg-white rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <FaShieldAlt size={50} className="text-[#940066] mx-auto mb-4" />
      <h4 className="text-xl font-semibold">أمان وشفافية</h4>
      <p className="text-gray-600">نضمن لك عمليات تبرع موثوقة بشفافية كاملة.</p>
    </div>

    <div className="p-6 bg-white rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <FaUsers size={50} className="text-[#940066] mx-auto mb-4" />
      <h4 className="text-xl font-semibold">مجتمع داعم</h4>
      <p className="text-gray-600">نحن مجتمع متكافل يسعى لتمكين الطلاب.</p>
    </div>

    <div className="p-6 bg-white rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
      <FaHandsHelping size={50} className="text-[#940066] mx-auto mb-4" />
      <h4 className="text-xl font-semibold">أثر حقيقي</h4>
      <p className="text-gray-600">تبرعاتك تحدث فرقًا حقيقيًا في حياة الطلاب.</p>
    </div>
  </div>

  {/* تأثيرات الخلفية */}
  <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
    <div className="absolute top-10 left-20 w-32 h-32 bg-[#940066] rounded-full blur-3xl"></div>
    <div className="absolute bottom-10 right-20 w-32 h-32 bg-[#940066] rounded-full blur-3xl"></div>
  </div>
</section>












        {/* كيف تساهم؟ */}
        <section className="mt-10 bg-white shadow-lg rounded-xl p-8 text-gray-800">
          <h2 className="text-3xl font-bold text-[#940066] mb-4">كيف يمكنك المساهمة؟</h2>
          <hr className="w-20 border-[#940066] mb-4" />
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-200 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaDonate size={50} className="text-[#940066] mx-auto mb-4" />
              <h4 className="text-xl font-semibold">تبرّع الآن</h4>
              <p className="text-gray-600">ساهم بمبلغ بسيط يمكن أن يغيّر حياة طالب.</p>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaHeartbeat size={50} className="text-[#940066] mx-auto mb-4" />
              <h4 className="text-xl font-semibold">كن سفيرًا</h4>
              <p className="text-gray-600">ساعدنا في نشر رسالتنا عبر وسائل التواصل.</p>
            </div>

            <div className="p-6 bg-gray-200 rounded-xl shadow-lg text-center transform transition duration-300 hover:scale-105">
              <FaUniversity size={50} className="text-[#940066] mx-auto mb-4" />
              <h4 className="text-xl font-semibold">ادعم مشروعًا</h4>
              <p className="text-gray-600">شارك في تمويل مشاريع تعليمية متخصصة.</p>
            </div>
          </div>
        </section>
      </div>

    </div>

    
    
    );
};

export default AboutUs;
