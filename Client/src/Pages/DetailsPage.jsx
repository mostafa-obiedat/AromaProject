import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DonationPopup from "../Components/DonationPopup";  // تأكد من تعديل المسار حسب مكان المكون

const DetailsPage = () => {
  const { id } = useParams();
  const [beneficiary, setBeneficiary] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // حالة الـ Popup
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/case/api/beneficiaries/${id}`);
        setBeneficiary(response.data);
      } catch (error) {
        console.error("Error fetching beneficiary:", error);
      }
    };
    fetchData();
  }, [id]);

  if (!beneficiary) return <p>Loading...</p>;

  return (
    <div className="bg-white min-h-screen text-right" dir="rtl">
      {/* Enhanced Hero Section */}
      <div className="relative text-white py-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, #940066 0%, #650045 100%)' }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white opacity-10 transform -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-gray-100 opacity-10 transform translate-y-1/2 -translate-x-1/4"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-100 drop-shadow-lg">
            دعم مستقبل التعليم للطلاب المتفوقين
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto opacity-90">
            نساعد الطلاب المتميزين في تحقيق أحلامهم الأكاديمية من خلال تقديم الدعم اللازم لاستكمال تعليمهم.
          </p>

          {/* Donate Now Button */}
          <div className="mt-10">
            <button
              className="px-10 py-4 bg-white text-lg font-bold rounded-full shadow-lg hover:bg-opacity-90 transition duration-300"
              style={{ color: "#940066" }}
              onClick={() => setIsPopupOpen(true)} // فتح الـ Popup
            >
              تبرع الآن
            </button>
          </div>
        </div>
      </div>

      {/* Show Popup if isPopupOpen is true */}
      {isPopupOpen && <DonationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} programId={beneficiary.id} />}

      {/* Student Information */}
      <div className="max-w-4xl mx-auto px-4 mt-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#940066' }}>بيانات الطالب</h2>
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="mb-3">
              <span className="font-bold ml-2"> رقم الحالة:</span>
              <span>{beneficiary.id}</span>
            </div>
            <div className="mb-3">
              <span className="font-bold ml-2">رقم الجامعي:</span>
              <span>{beneficiary.universityNo}</span>
            </div>
            <div>
              <span className="font-bold ml-2">المبلغ المطلوب:</span>
              <span>{beneficiary.amount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Details */}
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#940066' }}>تفاصيل الحالة</h2>
        <p className="text-gray-700"> {beneficiary.needsDescription}</p>

        {/* Donate Now Button in Details Section */}
        <div className="mt-8 mb-4">
          <button
            className="px-6 py-3 text-white font-bold rounded-lg shadow-lg transition duration-300 w-full md:w-auto"
            style={{ backgroundColor: "#940066" }}
            onClick={() => setIsPopupOpen(true)} // فتح الـ Popup
          >
            تبرع الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;