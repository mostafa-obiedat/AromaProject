import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // استيراد sweetalert2

export function Message() {
  const [messages, setMessages] = useState([]);
  const [replyMessages, setReplyMessages] = useState({});
  const [expandedMessage, setExpandedMessage] = useState(null);

  useEffect(() => {
    // جلب الرسائل من API
    axios
      .get("http://localhost:4000/api/contact-messages")
      .then((response) => {
        setMessages(response.data); // تخزين الرسائل المستلمة
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب الرسائل!", error);
      });
  }, []);

  const handleReply = (email) => {
    const replyMessage = replyMessages[email];

    if (!replyMessage) {
      alert("الرجاء إدخال رسالة رد!");
      return;
    }

    axios
      .post("http://localhost:4000/api/contact-messages/reply", {
        email: email,
        replyMessage: replyMessage,
      })
      .then((response) => {
        // عرض رسالة نجاح باستخدام SweetAlert
        Swal.fire({
          icon: "success",
          title: "تم ارسال الرد بنجاح!",
          confirmButtonText: "موافق",
        });

        // مسح الحقل بعد الإرسال
        setReplyMessages((prev) => ({
          ...prev,
          [email]: "", // إعادة تعيين الرد لهذا البريد الإلكتروني
        }));
      })
      .catch((error) => {
        console.error("خطأ في إرسال الرد:", error);
        alert("حدث خطأ أثناء إرسال الرد.");
      });
  };

  const handleInputChange = (email, value) => {
    setReplyMessages((prev) => ({ ...prev, [email]: value }));
  };

  const toggleExpandMessage = (email) => {
    if (expandedMessage === email) {
      setExpandedMessage(null);
    } else {
      setExpandedMessage(email);
    }
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#940066] text-white p-6">
          <h2 className="text-xl font-bold text-white">جدول الرسائل</h2>
        </div>

        <div className="p-6">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-sky-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500">
                لا توجد رسائل متاحة في الوقت الحالي
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table
                className="w-full min-w-full divide-y divide-gray-200"
                dir="rtl"
              >
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      "الاسم",
                      "البريد الإلكتروني",
                      "الرسالة",
                      "التاريخ",
                      "الرد",
                      "إجراءات",
                    ].map((el) => (
                      <th
                        key={el}
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {el}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {messages.map(
                    ({ id, name, email, description, createdAt }, key) => (
                      <tr
                        key={email}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-800 font-bold">
                                {name ? name.charAt(0).toUpperCase() : "U"}
                              </div>
                            </div>
                            <div className="mr-4">
                              <div className="text-sm font-medium text-gray-900">
                                {name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm text-gray-500 ${
                              expandedMessage === email ? "" : "line-clamp-2"
                            }`}
                          >
                            {description}
                          </div>
                          {description && description.length > 50 && (
                            <button
                              onClick={() => toggleExpandMessage(email)}
                              className="text-xs text-sky-600 mt-1 hover:text-sky-800"
                            >
                              {expandedMessage === email
                                ? "عرض أقل"
                                : "عرض المزيد"}
                            </button>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(createdAt).toLocaleDateString("ar-EG")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            key={email}
                            type="text"
                            value={replyMessages[email] || ""}
                            onChange={(e) =>
                              handleInputChange(email, e.target.value)
                            }
                            placeholder="أدخل ردك هنا"
                            className="w-full text-right p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleReply(email)}
                            className="px-4 py-2 bg-[#940066] text-white rounded-lg hover:bg-sky-700 transition-colors"
                          >
                            إرسال الرد
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Message;
