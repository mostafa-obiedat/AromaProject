import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ApprovedBeneficiaries = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApprovedBeneficiaries = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/case/approved"
        );
        setBeneficiaries(response.data); // تعيين البيانات المستلمة
        setLoading(false);
      } catch (error) {
        console.error("❌ خطأ أثناء جلب البيانات:", error);
        setError("حدث خطأ أثناء جلب البيانات.");
        setLoading(false);
      }
    };

    fetchApprovedBeneficiaries(); // استدعاء الدالة لجلب البيانات
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-[#940066]" dir="rtl">جاري التحميل...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8" dir="rtl">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4"  dir="rtl">
      <h1 className="text-2xl font-bold text-right mb-8 text-[#940066] mx-12">فرص التبرع</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-12">
        {beneficiaries.map((beneficiary) => (
          <div
            key={beneficiary.id}
            className="bg-white p-6 rounded-lg shadow-md border-t-4 border-[#940066]"
          >
            <p className="text-gray-700 mb-2">
              رقم الحالة: <span className="font-bold text-[#940066]">{beneficiary.id}</span>
            </p>
            <h2 className="text-xl font-semibold mb-2 text-[#940066]">
              الجامعة: {beneficiary.universityName}
            </h2>
            <p className="text-gray-700 mb-2">
              عدد الإخوة: <span className="font-bold">{beneficiary.brothers}</span>
            </p>
            <p className="text-gray-700 mb-2">
              المبلغ المطلوب: <span className="font-bold">{beneficiary.amount}د.أ</span>
            </p>
            {/* <p className="text-gray-700 mb-4">
              وصف الحاجة: <span className="font-bold">{beneficiary.needsDescription}</span>
            </p> */}
            <Link
              to={`/Detailspage/${beneficiary.id}`}
              className="bg-[#940066] text-white px-4 py-2 rounded-md hover:bg-[#671F79] transition duration-200 inline-block"
            >
              عرض التفاصيل
            </Link>
          </div>
        ))}
      </div>
      
      {beneficiaries.length === 0 && (
        <div className="text-center py-8 text-gray-600">
          لا توجد حالات معتمدة حالياً
        </div>
      )}
    </div>
  );
};

export default ApprovedBeneficiaries;
