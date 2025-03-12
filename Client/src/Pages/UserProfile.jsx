import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userSlice"; // استيراد الإجراء لتحديث Redux
import Swal from "sweetalert2"; // استيراد sweetalert2

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editableUser, setEditableUser] = useState(null); // لتخزين البيانات القابلة للتعديل
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [image, setImage] = useState(null); // لتخزين الصورة التي يرفعها المستخدم
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // جلب بيانات المستخدم عند تحميل الصفحة
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/profile", {
          withCredentials: true, // للسماح بإرسال الكوكيز
        });
        setUser(response.data.user);
        setEditableUser(response.data.user); // حفظ البيانات القابلة للتعديل
      } catch (error) {
        console.error("Error fetching profile:", error);
        navigate("/login"); // إعادة التوجيه إلى صفحة تسجيل الدخول إذا لم يكن المستخدم مسجلاً
      }
    };

    fetchProfile();
  }, [navigate]);

  // التحقق من المدخلات
  const validate = () => {
    let errors = {};

    // التحقق من رقم الهاتف باستخدام RegEx
    const phoneRegEx = /^07[0-9]{8}$/;
    if (!phoneRegEx.test(editableUser.phoneNumber)) {
      errors.phoneNumber = "رقم الهاتف يجب أن يبدأ بـ 07 ويكون مكونًا من 10 أرقام";
    }

    // التحقق من الحقول الأخرى (إذا لزم الأمر)
    if (!editableUser.firstName) {
      errors.firstName = "الاسم الأول مطلوب";
    }
    if (!editableUser.lastName) {
      errors.lastName = "الاسم الأخير مطلوب";
    }
    if (!editableUser.address) {
      errors.address = "العنوان مطلوب";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // دالة لتحديث بيانات المستخدم
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
  
    // التحقق من صحة البيانات
    if (!validate()) {
      return;
    }
  
    try {
      // إرسال التحديثات إلى الخادم
      const response = await axios.put("http://localhost:4000/api/profile", editableUser, {
        withCredentials: true, // للسماح بإرسال الكوكيز
      });
  
      const { user: updatedUser, token: updatedToken } = response.data;
  
      // تحديث بيانات المستخدم في Redux
      dispatch(login({ user: updatedUser, token: updatedToken }));
  
      // تحديث بيانات المستخدم في الواجهة
      setUser(updatedUser);
      setEditableUser(updatedUser);
  
      // تحديث localStorage بالبيانات الجديدة
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem("token", updatedToken);
  
      // عرض رسالة نجاح باستخدام SweetAlert
      Swal.fire({
        icon: "success",
        title: "تم تحديث البيانات بنجاح!",
        text: "تم حفظ التغييرات في ملفك الشخصي.",
        confirmButtonText: "موافق",
      });
    } catch (error) {
      setError("حدث خطأ أثناء تحديث البيانات");
      console.error("Error updating profile:", error);
  
      // عرض رسالة خطأ باستخدام SweetAlert
      Swal.fire({
        icon: "error",
        title: "حدث خطأ!",
        text: "تعذر تحديث البيانات. حاول مرة أخرى.",
        confirmButtonText: "موافق",
      });
    }
  };
  // دالة لاختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  // دالة لتوجيه المستخدم إلى صفحة كتابة قصة النجاح
  const handleWriteStory = () => {
    navigate("/form");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#940066] border-t-transparent"></div>
        <span className="mr-4 text-xl font-semibold text-gray-700">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* بطاقة معلومات المستخدم */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          {/* غلاف الملف الشخصي */}
          <div className="h-40 bg-gradient-to-r from-[#940066] to-[#671F79] relative">
            <div className="absolute top-4 right-4 text-white">
              <h1 className="text-2xl font-bold">مرحباً، {editableUser.firstName}</h1>
              <p className="text-sm opacity-90">{editableUser.email}</p>
            </div>
          </div>
          
          {/* صورة المستخدم */}
          <div className="relative px-6">
            <div className="absolute -top-16 bg-white rounded-full p-1 shadow-lg">
              <div className="w-28 h-28 rounded-full bg-gray-100 overflow-hidden border-4 border-white relative">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={editableUser.profileImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
                <label htmlFor="profile-image-upload" className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 flex items-center justify-center transition-all duration-300 cursor-pointer">
                  <div className="opacity-0 hover:opacity-100 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="profile-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            
            <div className="pt-16 pb-4">
              <h2 className="text-xl font-bold text-gray-800">{editableUser.firstName} {editableUser.lastName}</h2>
              <p className="text-gray-600 text-sm">{editableUser.phoneNumber || "لا يوجد رقم هاتف"}</p>
              {/* زر "اكتب قصة نجاحك" */}
              <button
                onClick={handleWriteStory}
                className="mt-4 bg-[#940066] text-white px-4 py-2 rounded-lg hover:bg-[#671F79] transition-all duration-300"
              >
                اكتب قصة نجاحك
              </button>
            </div>
          </div>
        </div>

        {/* نموذج تحديث البيانات */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b">
            <h3 className="text-lg font-semibold text-gray-800">تعديل البيانات الشخصية</h3>
          </div>
          
          {error && (
            <div className="mx-6 mt-4 p-4 flex items-center space-x-2 bg-red-50 border-r-4 border-red-500 text-red-700 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {Object.keys(formErrors).length > 0 && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border-r-4 border-red-500 rounded">
              <h4 className="text-red-700 font-medium mb-2">يرجى تصحيح الأخطاء التالية:</h4>
              <ul className="list-disc list-inside">
                {Object.values(formErrors).map((error, index) => (
                  <li key={index} className="text-red-600 text-sm">{error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="p-6 space-y-6">
            {/* الاسم الأول والأخير */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">الاسم الأول</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={editableUser.firstName || ""}
                    onChange={(e) => setEditableUser({ ...editableUser, firstName: e.target.value })}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-[#940066] transition-all duration-200 shadow-sm"
                    placeholder="أدخل الاسم الأول"
                    dir="rtl"
                  />
                </div>
                {formErrors.firstName && <p className="text-red-600 text-sm">{formErrors.firstName}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">الاسم الأخير</label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={editableUser.lastName || ""}
                    onChange={(e) => setEditableUser({ ...editableUser, lastName: e.target.value })}
                    className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-[#940066] transition-all duration-200 shadow-sm"
                    placeholder="أدخل الاسم الأخير"
                    dir="rtl"
                  />
                </div>
                {formErrors.lastName && <p className="text-red-600 text-sm">{formErrors.lastName}</p>}
              </div>
            </div>

            {/* البريد الإلكتروني */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">البريد الإلكتروني</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  value={editableUser.email || ""}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 focus:outline-none shadow-sm cursor-not-allowed"
                  placeholder="البريد الإلكتروني"
                  disabled
                  dir="rtl"
                />
                <span className="absolute left-3 top-3 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-md">لا يمكن تغييره</span>
              </div>
            </div>

            {/* رقم الهاتف */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">رقم الهاتف</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={editableUser.phoneNumber || ""}
                  onChange={(e) => setEditableUser({ ...editableUser, phoneNumber: e.target.value })}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-[#940066] transition-all duration-200 shadow-sm"
                  placeholder="أدخل رقم الهاتف"
                  dir="rtl"
                />
              </div>
              {formErrors.phoneNumber && (
                <div className="flex items-center space-x-1 text-red-600 text-sm mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{formErrors.phoneNumber}</span>
                </div>
              )}
              <p className="text-gray-500 text-xs">مثال: 07xxxxxxxx</p>
            </div>

            {/* العنوان */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">العنوان</label>
              <div className="relative">
                <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={editableUser.address || ""}
                  onChange={(e) => setEditableUser({ ...editableUser, address: e.target.value })}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] focus:border-[#940066] transition-all duration-200 shadow-sm"
                  placeholder="أدخل العنوان"
                  dir="rtl"
                />
              </div>
              {formErrors.address && <p className="text-red-600 text-sm">{formErrors.address}</p>}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center bg-gradient-to-r from-[#940066] to-[#671F79] text-white p-4 rounded-lg transition-all duration-300 font-bold text-lg shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 transform hover:-translate-y-1 cursor-pointer'}`}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent ml-2"></div>
                    <span>جاري التحديث...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>حفظ التغييرات</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;