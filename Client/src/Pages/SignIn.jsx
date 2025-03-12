import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { login } from "../Redux/userSlice"; // استيراد الإجراء لتحديث Redux
import Swal from "sweetalert2"; // استيراد sweetalert2

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // تعبيرات ريجيكس للتحقق من صحة البيانات
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // للتحقق من البريد الإلكتروني
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // للتحقق من كلمة المرور

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!emailPattern.test(email)) {
      setError("صيغة البريد الإلكتروني غير صحيحة.");
      return;
    }
  
    if (!passwordPattern.test(password)) {
      setError("يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل، ورقم واحد، وحرف كبير وحرف صغير.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:4000/api/login", {
        email,
        password,
      });
  
      const { token, user } = response.data;
      console.log("User Data:", user);
  
      // حفظ التوكن في الكوكيز وlocalStorage
      Cookies.set("token", token, { expires: 7 });
      localStorage.setItem("token", token);
  
      // تحديث حالة المستخدم في Redux
      dispatch(login({ user, token })); // استخدام الإجراء الجديد
  
            // عرض رسالة نجاح باستخدام SweetAlert
            Swal.fire({
              icon: "success",
              title: "تم تسجيل الدخول بنجاح!",
              confirmButtonText: "موافق",
            });
      
      navigate(user.email === "admin@admin.com" ? "/dashboard/overview" : "/");
    } catch (err) {
      setError("خطأ في البريد الالكتروني أو كلمة المرور");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md border border-purple-100">
        <h2 className="text-3xl font-bold mb-6 text-center text-[#940066]">تسجيل الدخول</h2>
        {error && <p className="text-red-500 text-center mb-4 p-2 bg-red-50 rounded">{error}</p>}
        
        <form onSubmit={handleLogin} className="space-y-5" dir="rtl">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
            <input
              type="email"
              placeholder="أدخل البريد الإلكتروني"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">كلمة المرور</label>
            <input
              type="password"
              placeholder="أدخل كلمة المرور"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#671F79] focus:border-[#671F79]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-[#940066] text-white p-3 rounded-md hover:bg-[#671F79] transition-colors duration-300 font-bold text-lg"
          >
            تسجيل الدخول
          </button>
        </form>
        
        <p className="mt-6 text-center text-gray-600">
          ليس لديك حساب؟ <a href="/signup" className="text-[#940066] hover:text-[#671F79] font-medium">إنشاء حساب</a>
        </p>
      </div>
    </div>
  );
};

export default Login;