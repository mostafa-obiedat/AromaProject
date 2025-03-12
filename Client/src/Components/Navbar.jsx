import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // قراءة بيانات المستخدم من localStorage
  const user = JSON.parse(localStorage.getItem("user")); // تحويل JSON إلى object
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    // حذف البيانات من localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // حذف التوكن من الكوكيز (إذا كنت تستخدمها)
    Cookies.remove("token");

    // توجيه المستخدم إلى الصفحة الرئيسية
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* الشعار + الاسم (أقصى اليسار) */}
        <div className="flex items-center space-x-3">
          <img
            src="src/assets/image.png"
            alt="شعار أرومة"
            className="w-14 h-14 object-contain"
          />
          <span
            className="text-2xl font-bold text-[#940066] tracking-wide hidden md:block"
            style={{
              fontFamily: "'Tajawal', sans-serif",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
            }}
          >
            أرومة
          </span>
        </div>

        {/* قائمة سطح المكتب (الوسط) */}
        <div className="hidden md:flex items-center space-x-5">
          {["الرئيسية", "من نحن", "قصص نجاح", "تواصل معنا", "طلب منحة"].map(
            (item, index) => (
              <Link
                key={index}
                to={["", "/about", "/SuccessStoriesCards", "/contact", "/BeneficiaryForm"][index]}
                className={`text-base font-medium text-[#940066] hover:text-[#b00077] transition-all duration-300 relative group ${
                  item === "طلب منحة"
                    ? "bg-[#940066] text-white px-3 py-1.5 rounded-full hover:bg-[#FFFFFF] hover:text-[#940066] hover:border hover:border-[#940066]"
                    : ""
                }`}
              >
                {item}
                {item !== "طلب منحة" && (
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#940066] transition-all duration-300 group-hover:w-full"></span>
                )}
              </Link>
            )
          )}
        </div>

        {/* العناصر في أقصى اليمين */}
        <div className="flex items-center space-x-3">
          {!user ? (
            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/donate"
                className="bg-[#940066] text-white px-3 py-1.5 rounded-full hover:bg-[#FFFFFF] hover:text-[#940066] hover:border hover:border-[#940066] duration-300"
              >
                فرص التبرع
              </Link>
              <Link
                to="/signin"
                className="text-base font-medium bg-[#FFFFFF] text-[#940066] px-3 py-1.5 rounded-full border border-[#940066] hover:bg-[#940066] hover:text-white transition-all"
              >
                تسجيل الدخول
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              {/* الرابط الديناميكي لأيقونة المستخدم */}
              <Link
                to={user.role === "donor" ? `/dashboard/donate/${user.id}` : "/profile"}

                className="text-[#940066] hover:text-[#b00077] transition-all"
              >
                <FaUser className="text-xl" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-[#940066] hover:text-[#b00077] transition-all flex items-center space-x-2 cursor-pointer"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="hidden md:block text-base">تسجيل الخروج</span>
              </button>
            </div>
          )}

          {/* زر القائمة للجوال */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#940066] focus:outline-none"
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* قائمة الجوال المنبثقة */}
      {isOpen && (
        <div className="md:hidden bg-white text-[#940066] p-4 space-y-4 shadow-lg">
          {[
            { text: "الرئيسية", path: "/" },
            { text: "من نحن", path: "/about" },
            { text: "قصص نجاح", path: "/success" },
            { text: "تواصل معنا", path: "/contact" },
            { text: "طلب منحة", path: "/BeneficiaryForm" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`block text-base font-medium hover:bg-[#f4f4f4] p-2 rounded-lg transition-all ${
                item.text === "طلب منحة" ? "bg-[#940066] text-white hover:bg-[#b00077]" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.text}
            </Link>
          ))}

          {!user ? (
            <div className="space-y-3 mt-4">
              <Link
                to="/donate"
                className="block text-center text-base bg-[#ECECEC] text-[#940066] py-2 rounded-full border border-[#940066] hover:bg-[#940066] hover:text-white transition-all"
              >
                فرص التبرع
              </Link>
              <Link
                to="/signin"
                className="block text-center text-base bg-[#940066] text-white py-2 rounded-full hover:bg-[#b00077] transition-all"
              >
                تسجيل الدخول
              </Link>
            </div>
          ) : (
            <div className="space-y-3 mt-4">
              <Link
                to={user.role === "donor" ? "/dashboard" : "/profile"}
                className="block text-base hover:bg-[#f4f4f4] p-2 rounded-lg transition-all flex items-center space-x-2"
              >
                <FaUser className="text-lg" />
                <span>البروفايل</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-base text-right hover:bg-[#f4f4f4] p-2 rounded-lg transition-all flex items-center space-x-2"
              >
                <FaSignOutAlt className="text-lg" />
                <span>تسجيل الخروج</span>
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;