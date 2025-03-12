import React from "react";

const ScholarshipTerms = () => {
  return (
    <div className="bg-gradient-to-b from-[#ECECEC] to-gray-100 min-h-screen p-6">
      {/* Container */}
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg border-t-4 border-[#940066]">
        {/* Header with decorative elements */}
        <div className="relative text-center mb-8">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#940066] to-transparent"></div>
          <h1 className="text-3xl font-bold text-center text-[#940066] my-6 relative inline-block">
            <span className="relative z-10">✨ شروط الحصول على المنحة الجامعية 🎓</span>
          </h1>
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#940066] to-transparent"></div>
        </div>
        
        {/* الفقرة التمهيدية */}
        <p className="text-gray-700 leading-relaxed text-lg mb-8 text-right">
          توفر الجمعية منحًا دراسية للطلاب الجامعيين المتميزين أكاديميًا والذين يواجهون تحديات مالية.
          تهدف هذه المنح إلى دعم الطلاب المتفوقين وتمكينهم من إكمال دراستهم الجامعية بتفوق.
          لضمان استمرارية الاستفادة من المنحة، يجب على الطالب الالتزام بالشروط التالية:
        </p>
        
        {/* قائمة الشروط */}
        <div className="bg-[#ECECEC] p-6 rounded-lg mb-8">
          <h2 className="text-xl font-bold text-[#940066] mb-4 text-right">الشروط والمتطلبات:</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-800 text-lg text-right">
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              على جميع الطلبة الالتزام بالمدة الدراسية المحددة وعدم التأخير في التخرج.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              يجب الحفاظ على معدل تراكمي لا يقل عن 3.0 من 4.0 (أو ما يعادله) وعدم الرسوب في أي من المواد الدراسية.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              الالتزام بحضور جميع المحاضرات والمشاركة الفعالة في الأنشطة الأكاديمية بنسبة لا تقل عن 85%.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              في حالة الحصول على منحة أخرى، يجب إبلاغ إدارة الجمعية بذلك خلال أسبوعين من تاريخ الحصول عليها.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              الالتزام بالسلوك الأخلاقي وعدم ارتكاب أي مخالفات أكاديمية أو سلوكية داخل الحرم الجامعي.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              تقديم تقرير أكاديمي دوري لإدارة الجمعية حول التقدم الدراسي مع نهاية كل فصل دراسي.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              المشاركة في الأنشطة المجتمعية والفعاليات التي تنظمها الجمعية بما لا يقل عن نشاطين كل فصل دراسي.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              في حالة الانسحاب من الدراسة، يجب إبلاغ الجمعية فورًا وإعادة أي دعم مالي متبقي خلال شهر من تاريخ الانسحاب.
            </li>
            <li className="p-2 hover:bg-gray-200 rounded transition-colors duration-200">
              فقدان المنحة في حالة عدم الالتزام بالشروط المذكورة أعلاه، مع إمكانية التقدم بطلب استثناء للحالات الطارئة.
            </li>
          </ol>
        </div>
        
        {/* معلومات إضافية */}
        <div className="mb-8 text-right">
          <h2 className="text-xl font-bold text-[#940066] mb-4">مزايا المنحة:</h2>
          <ul className="space-y-2 text-gray-700 text-lg list-inside list-disc">
            <li>تغطية كاملة للرسوم الدراسية طوال فترة البرنامج الأكاديمي.</li>
            <li>بدل شهري للكتب والمواد الدراسية.</li>
            <li>فرص للتدريب العملي خلال العطلة الصيفية.</li>
            <li>إمكانية المشاركة في برامج تبادل طلابي دولية.</li>
          </ul>
        </div>
        
        {/* ملاحظة */}
        <div className="mt-8 text-center">
          <div className="p-4 bg-[#ECECEC] rounded-lg border border-[#940066]">
            <p className="text-[#940066] font-bold">
              📢 يرجى قراءة الشروط بعناية والالتزام بها لضمان استمرار المنحة.
            </p>
            <p className="text-gray-600 mt-2">
              للاستفسارات، يرجى التواصل مع قسم المنح الدراسية على البريد الإلكتروني: 
              <span className="font-semibold text-[#940066]"> scholarships@example.org</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipTerms;
