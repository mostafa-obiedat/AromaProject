import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2"; // استيراد sweetalert2
import Cookies from "js-cookie";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "donor",
    status: "pending",
    phoneNumber: "",
    address: "",
    userType: "", // الافتراضي هو "متبرع"
  });

  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({}); // لتخزين الأخطاء لكل حقل
  const navigate = useNavigate();

  // تعبيرات ريجيكس للتحقق من صحة البيانات
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // للتحقق من البريد الإلكتروني
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // للتحقق من كلمة المرور
  const phoneNumberPattern = /^07\d{8}$/; // للتحقق من رقم الهاتف (يبدأ بـ 07 ويتكون من 10 أرقام)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errors = {};
    const { firstName, lastName, email, password, phoneNumber } = formData;

    // التحقق من ملء الحقول الإلزامية
    if (!firstName) errors.firstName = "الاسم الأول مطلوب.";
    if (!lastName) errors.lastName = "الاسم الأخير مطلوب.";
    if (!email) errors.email = "البريد الإلكتروني مطلوب.";
    if (!password) errors.password = "كلمة المرور مطلوبة.";
    if (!phoneNumber) errors.phoneNumber = "رقم الهاتف مطلوب.";

    // التحقق من صحة البريد الإلكتروني
    if (email && !emailPattern.test(email)) {
      errors.email = "صيغة البريد الإلكتروني غير صحيحة.";
    }

    // التحقق من صحة كلمة المرور (8 أحرف على الأقل، رقم واحد، حرف كبير وحرف صغير)
    if (password && !passwordPattern.test(password)) {
      errors.password = "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، ورقم واحد، وحرف كبير وحرف صغير.";
    }

    // التحقق من صحة رقم الهاتف
    if (phoneNumber && !phoneNumberPattern.test(phoneNumber)) {
      errors.phoneNumber = "يجب أن يحتوي رقم الهاتف على 10 أرقام ويبدأ بـ 07.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // لا يتم إرسال البيانات إذا كانت هناك أخطاء
    }

    const { firstName, lastName, email, password, phoneNumber } = formData;

    // إذا كانت جميع البيانات صحيحة، نقوم بإرسالها للخادم
    try {
      const response = await axios.post("http://localhost:4000/api/register", formData);
  
      const { token, user } = response.data; // استخراج التوكن وبيانات المستخدم
  
      // تخزين التوكن وبيانات المستخدم في localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
  
      // تخزين التوكن في الكوكيز
      Cookies.set("token", token, { expires: 7 }); // تنتهي بعد 7 أيام
  
      // عرض رسالة نجاح باستخدام SweetAlert
      Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح ",
        text: "تم تسجيل دخولك تلقائيًا",
        confirmButtonText: "موافق",
      });
  
      navigate("/"); // إعادة التوجيه إلى الصفحة الرئيسية
    } catch (err) {
      console.error("Error during registration:", err.response?.data || err.message);
      setError(err.response?.data?.message || "فشل التسجيل");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#940066]">إنشاء حساب</h2>
        {error && <p className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-5" dir="rtl">
          {/* حقلي الاسم الأول والأخير بجانب بعض */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">الاسم الأول</label>
              <input
                type="text"
                name="firstName"
                placeholder="الاسم الأول"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
                value={formData.firstName}
                onChange={handleChange}
              />
              {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">الاسم الأخير</label>
              <input
                type="text"
                name="lastName"
                placeholder="الاسم الأخير"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
                value={formData.lastName}
                onChange={handleChange}
              />
              {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              name="email"
              placeholder="أدخل البريد الإلكتروني"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              name="password"
              placeholder="أدخل كلمة المرور"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          </div>

          {/* حقلي رقم الهاتف والعنوان بجانب بعض */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="رقم الهاتف"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {formErrors.phoneNumber && <p className="text-red-500 text-sm">{formErrors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">العنوان</label>
              <input
                type="text"
                name="address"
                placeholder="العنوان"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">نوع المستخدم</label>
            <select
              name="role"
              className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="donor">متبرع</option>
              <option value="beneficiary">مستفيد</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#940066] text-white p-3 rounded-md hover:bg-[#671F79] transition-colors duration-300 font-bold text-lg"
          >
            تسجيل
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          لديك حساب بالفعل؟ <a href="/signin" className="text-[#940066] hover:text-[#671F79] font-medium">تسجيل الدخول</a>
        </p>
      </div>
    </div>
  );
};

export default Register;