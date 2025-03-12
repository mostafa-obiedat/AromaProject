import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // استيراد sweetalert2

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const messageData = {
      name: formData.name,
      email: formData.email,
      description: formData.description, // Updated to use 'description'
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/api/add-contact",
        messageData
      );

      // عرض تنبيه عند نجاح الإرسال
           // عرض رسالة نجاح باستخدام SweetAlert
      Swal.fire({
        icon: "success",
        title: "تم ارسال الرسالة بنجاح",
        text: "انتظر وصول الرد على بريدك الالكتروني",
        confirmButtonText: "موافق",
      });

      // تفريغ الفورم
      setFormData({ name: "", email: "", description: "" });

      console.log("رسالة تم إرسالها بنجاح:", response.data);
    } catch (error) {
      alert("خطأ أثناء إرسال الطلب:", error);
      if (error.response) {
        console.error("تفاصيل الخطأ:", error.response.data);
      }
    }
  };

  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.passion-admissions.com/blog_det/652/~/uplode/images/news/news2-652.jpg')",
        }}
        dir="rtl"
      >
        {/* طبقة تظليل بخلفية بنفسجية */}
        <div className="absolute inset-0 bg-[#940066] opacity-70"></div>

        {/* المحتوى الرئيسي */}
        <div className="container mx-auto px-6 py-32 relative z-10 text-right">
          <h1 className="text-5xl font-bold text-white mb-6">اتصل بنا</h1>
          <p className="text-xl text-gray-200">
            يسعدنا استقبال استفساراتكم واقتراحاتكم. يمكنكم التواصل معنا عبر
            البريد الإلكتروني أو الهاتف، ونحن هنا لخدمتكم.
          </p>
        </div>
      </div>

      <div
        className="flex flex-col items-center min-h-screen p-8 rtl"
        style={{
          backgroundImage: `url('https://i.pinimg.com/736x/ba/84/08/ba8408b6d85d00cf3b1642a2ec268bba.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* العنوان والصورة */}
        <div className="text-center mb-8 ">
          <h1 className="text-4xl font-bold text-[#940066] mb-4 ">
            معًا لدعم المستقبل
          </h1>
          <p className="text-gray-700 max-w-2xl mx-auto leading-loose">
            سواء كنت طالبًا بحاجة إلى دعم أكاديمي أو متبرعًا يرغب في إحداث فرق،
            نحن هنا للإجابة عن جميع استفساراتك وتقديم المساعدة المطلوبة.
          </p>
        </div>

        {/* قسم التواصل */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border-t-4 border-[#940066] w-full max-w-4xl flex flex-col md:flex-row gap-8">
          {/* معلومات التواصل */}
          <div className="flex-1 text-right bg-white p-6 rounded-2xl shadow-lg border border-gray-200 max-w-sm mx-auto">
            <h2 className="text-2xl font-bold text-[#940066] mb-4 border-b-2 border-[#940066] pb-2">
              معلومات التواصل
            </h2>

            <div className="space-y-4">
              <p className="text-gray-700 flex items-center justify-end gap-2">
                <span className="font-bold text-lg">0123456789</span>
                <span className="text-[#940066] text-xl">📞</span>
              </p>

              <p className="text-gray-700 flex items-center justify-end gap-2">
                <span className="font-bold text-lg">example@gmail.com</span>
                <span className="text-[#940066] text-xl">✉️</span>
              </p>
            </div>
          </div>
          {/* نموذج التواصل */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[#940066] mb-2">
              نموذج التواصل
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5 text-right">
              <div>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="name"
                >
                  الاسم
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#940066] transition duration-300 shadow-sm text-right"
                  placeholder="أدخل اسمك"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="email"
                >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#940066] transition duration-300 shadow-sm text-right"
                  placeholder="أدخل بريدك الإلكتروني"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 mb-2 font-medium"
                  htmlFor="description"
                >
                  رسالتك
                </label>
                <textarea
                  id="description"
                  name="description" // Updated to use 'description'
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-[#940066] transition duration-300 shadow-sm text-right"
                  rows="4"
                  placeholder="اكتب رسالتك هنا"
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#940066] text-white py-3 rounded-lg hover:bg-[#7a004d] transform hover:scale-105 transition duration-300 shadow-lg"
              >
                إرسال الرسالة 📩
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
