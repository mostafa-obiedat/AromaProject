import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Swal from "sweetalert2"; // استيراد sweetalert2

export default function DonationPopup({ isOpen, onClose, programId }) {
  const [currency] = useState("د.أ");
  const [donationAmount, setDonationAmount] = useState(250); 
  const [customAmount, setCustomAmount] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCustom, setIsCustom] = useState(false);

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(`${name}=`)) {
          return cookie.substring(name.length + 1);
      }
  }
  return null;
}

const handleDonation = async (event) => {
  event.preventDefault();

  // تحديد المبلغ الفعلي للتبرع (إما المخصص أو المحدد مسبقاً)
  const finalAmount = isCustom ? parseFloat(customAmount) : donationAmount;

  // Validate donation amount
  if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      setError("يرجى إدخال مبلغ تبرع صحيح");
      return;
  }

  // Validate card details
  if (!cardHolder || !cardNumber || !expiry || !cvv) {
      setError("يرجى تعبئة جميع حقول البطاقة");
      return;
  }

  setIsLoading(true);
  setError(null);

  // Retrieve the token from cookies
  const token = getCookie("token");

  if (!token) {
      setError("لم يتم العثور على رمز التحقق. يرجى تسجيل الدخول مرة أخرى.");
      setIsLoading(false);
      return;
  }

  try {
      const response = await axios.post(
          "http://localhost:4000/api/payment",
          {
              amount: finalAmount,
              currency,
              programId,
              paymentDetails: {
                  cardHolder,
                  cardNumber,
                  expiry,
                  cvv,
              },
          },
          {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          }
      );
            // عرض رسالة نجاح باستخدام SweetAlert
            Swal.fire({
              icon: "success",
              title: "تم التبرع بنجاح",
              confirmButtonText: "موافق",
            });
      
      onClose();
  } catch (err) {
      console.error(err);
      setError("حدث خطأ أثناء التبرع. حاول مرة أخرى.");
  } finally {
      setIsLoading(false);
  }
};

  const handleAmountChange = (amount) => {
    setDonationAmount(amount);
    setIsCustom(false);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setCustomAmount(value);
    setIsCustom(true);
  };

  // تنسيق رقم البطاقة أثناء الإدخال
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  //  تاريخ الانتهاء أثناء الإدخال
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length > 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0  bg-opacity-60 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          dir="rtl"
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            dir="rtl"
          >
            {/* زر الإغلاق المحسن */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="إغلاق"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              تبرع الآن
            </h2>

            {/* عرض قيمة التبرع المختارة بشكل أكثر وضوحاً */}
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-2">المبلغ المختار</p>
              <div className="text-2xl font-bold text-[#940066]">
                {isCustom ? customAmount : donationAmount} {currency}
              </div>
            </div>

            {/* خيارات المبالغ بتصميم أكثر بساطة مع إضافة حقل المبلغ المخصص */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[100, 250, 300, 500].map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountChange(amount)}
                  className={`py-3 rounded-lg transition-colors font-medium ${
                    donationAmount === amount && !isCustom
                      ? "bg-[#940066] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {amount} {currency}
                </button>
              ))}
            </div>

            {/* حقل إدخال المبلغ المخصص */}
            <div className="mb-6">
              <label htmlFor="customAmount" className="block text-sm text-gray-600 mb-2">
                أو أدخل المبلغ الذي تريده
              </label>
              <div className="relative">
                <input
                  id="customAmount"
                  type="text"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-transparent text-right ${
                    isCustom ? "border-[#940066]" : "border-gray-200"
                  }`}
                  placeholder="أدخل المبلغ هنا"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  {currency}
                </span>
              </div>
            </div>

            {/* نموذج معلومات الدفع المحسن */}
            <form onSubmit={handleDonation} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="cardHolder"
                  className="block text-sm text-gray-600"
                >
                  اسم حامل البطاقة
                </label>
                <input
                  id="cardHolder"
                  type="text"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-transparent text-right"
                  placeholder="محمد أحمد"
                  autoComplete="cc-name"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="cardNumber"
                  className="block text-sm text-gray-600"
                >
                  رقم البطاقة
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-transparent text-right"
                  placeholder="4111 1111 1111 1111"
                  maxLength="19"
                  autoComplete="cc-number"
                />
              </div>

              <div className="flex gap-4">
                <div className="w-1/2 space-y-2">
                  <label
                    htmlFor="expiry"
                    className="block text-sm text-gray-600"
                  >
                    تاريخ الانتهاء
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-transparent text-right"
                    placeholder="12/25"
                    maxLength="5"
                    autoComplete="cc-exp"
                  />
                </div>
                <div className="w-1/2 space-y-2">
                  <label htmlFor="cvv" className="block text-sm text-gray-600">
                    رمز الأمان
                  </label>
                  <input
                    id="cvv"
                    type="text"
                    value={cvv}
                    onChange={(e) =>
                      setCvv(e.target.value.replace(/\D/g, "").substring(0, 3))
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-transparent text-right"
                    placeholder="123"
                    maxLength="3"
                    autoComplete="cc-csc"
                  />
                </div>
              </div>

              {/* عرض رسالة الخطأ بشكل واضح */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              {/* زر تأكيد التبرع المحسن */}
              <button
                type="submit"
                className="w-full bg-[#940066] text-white py-4 rounded-lg hover:bg-[#7a0053] transition-colors font-bold mt-4 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    جاري المعالجة...
                  </>
                ) : (
                  "تبرع الآن"
                )}
              </button>

              {/* نص إضافي لمزيد من الثقة */}
              <p className="text-xs text-gray-500 text-center mt-4">
                بياناتك آمنة ومشفرة. لن يتم مشاركتها مع أي طرف ثالث.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}