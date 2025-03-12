
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiBell, FiUser ,FiHome ,FiArrowLeft  ,FiHelpCircle } from "react-icons/fi";
import { FaHandHoldingHeart, FaChartPie} from "react-icons/fa";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2"; // استيراد sweetalert2


function DonateDashboard({} ) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { id } = useParams(); // جلب id من الرابط


//=========================================================== ربط سيكشن  1+2

  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [averageDonation, setAverageDonation] = useState(0);

useEffect(() => {
  const fetchDashboardData = async () => {
    try {
  // جلب قائمة التبرعات
  const donationsResponse = await axios.get(`http://localhost:4000/api/donors/donations/${id}`);
  // جلب إجمالي التبرعات
  const totalResponse = await axios.get(`http://localhost:4000/api/donors/donations/total/${id}`)
  // جلب متوسط التبرعات
  const averageResponse = await axios.get(`http://localhost:4000/api/donors/donations/average/${id}`)
  console.log("Donations Data:", donationsResponse.data);
  console.log("Total Donations:", totalResponse.data);
  console.log("Average Donation:", averageResponse.data);
      setDonations(donationsResponse.data.userDonations);
      setTotalDonations(totalResponse.data.userTotalDonations);
      setAverageDonation(averageResponse.data.userAverageDonation);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  fetchDashboardData();
}, [id]);


// ==============================================اليوزير بروفايل 
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editField, setEditField] = useState(null); // لمعرفة أي حقل يتم تحريره

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/donors/profile/${id}`);
        console.log("Profile Data:", response.data);
        setProfile({
          name: response.data.firstName,
          email: response.data.email,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching donor profile:", error);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (field) => {
    setEditField(field);
  };

  const handleSave = async (field) => {
    try {
      const updatedData = { [field]: profile[field] };
      await axios.put(`http://localhost:4000/api/donors/update-profile/${id}`, updatedData);

      // عرض رسالة نجاح باستخدام SweetAlert
      Swal.fire({
        icon: "success",
        title: "تم تحديث البيانات بنجاح!",
        text: "تم حفظ التغييرات في ملفك الشخصي.",
        confirmButtonText: "موافق",
      });
      setEditField(null); // إرجاع الحقل لوضع العرض بعد الحفظ
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("حدث خطأ أثناء تحديث البيانات");
    }
  };
// ==============================================اليوزير بروفايل 



  
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`bg-[#940066] text-white w-20 h-full fixed right-0 top-10 p-6 transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 md:w-56 z-10`}
      >
        <h2 className="text-2xl font-bold mb-6 hidden md:block"> </h2>
        <ul className="space-y-4">
          <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
            <Link
              to="#"
              onClick={() => document.getElementById("statistics-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center space-x-2"
            >
              <FaHandHoldingHeart size={20} />
              <span className="hidden md:inline">الإحصائيات</span>
            </Link>
          </li>
          <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
            <Link
              to="#"
              onClick={() => document.getElementById("recent-donations")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center space-x-2"
            >
              <FaChartPie size={20} />
              <span className="hidden md:inline">تبرعاتي</span>
            </Link>
          </li>
          <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
            <Link
              to="#"
              onClick={() => document.getElementById("donor-info")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center space-x-2"
            >
              <FiBell size={20} />
              <span className="hidden md:inline">صناع  الأمل</span>
            </Link>
          </li>
          <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
            <Link
              to="#"
              onClick={() => document.getElementById("profile-section")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center space-x-2"
            >
              <FiUser size={20} />
              <span className="hidden md:inline">تعديل الملف الشخصي</span>
            </Link>
          </li>
          {/* Home Button */}
          <li className="absolute bottom-10 right-6 w-full rounded-full">
            <Link to="/" className="flex items-center space-x-2">
              <FiHome size={20} />
              <span className="hidden md:inline">الصفحة الرئيسية</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1  md:mr-64">
        {/* Navbar */}
        <header className="bg-white shadow-md fixed top-0 left-0 w-full h-16 flex justify-between items-center px-4 md:px-6 z-50">
          {/* Burger Button */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-700 text-2xl md:hidden"
          >
            <FiMenu />
          </button>
          <h1 className="text-2xl font-bold ml-auto">لوحة تحكم المتبرع</h1>
          <ul className="flex space-x-4">
            {/* Profile Link */}
            <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
              <Link
                to="#"
                onClick={() => document.getElementById("profile-section")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center space-x-2"
              >
                <FiUser size={20} />
              </Link>
            </li>
            {/* Instructions Link */}
            <li className="flex items-center cursor-pointer hover:bg-[#7a004f] p-2 rounded-lg">
              <Link
                to="/ScholarshipTerms"
                onClick={() => document.getElementById("instructions-section")?.scrollIntoView({ behavior: "smooth" })}
                className="flex items-center space-x-2"
              >
                <FiHelpCircle size={20} />
              </Link>
            </li>
          </ul>
        </header>

        {/* Main Content Area */}
        <main className="mt-16">
          {/* محتوى الصفحة يذهب هنا */}
        </main>
      </div>
   
       
        <div className="flex-1 p-6 md:mr-64">
        


<div className="mb-5 p-6 bg-white border-4 border-[#940066] shadow-1xl rounded-lg text-right transform hover:scale-105 transition duration-500 ease-in-out">
  <h2 className="text-2xl font-extrabold text-[#940066] tracking-wider drop-shadow-lg">
    أهلاً وسهلاً بك، {profile.name}، في لوحة تحكم المتبرع!
  </h2>
  <p className="mt-2 text-xl text-[#940066] drop-shadow">
    نحن هنا لدعمك في رحلة التبرع الخاصة بك، لنمنحك تجربة فريدة ومميزة.
  </p>
</div>



       {/* Statistics Section */}   <section  id="statistics-section" className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 text-right mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">عدد التبرعات</h2>
          <p className="text-2xl">{donations.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">إجمالي التبرعات</h2>
          <p className="text-2xl">${totalDonations}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">متوسط التبرع</h2>
          <p className="text-2xl">${averageDonation}</p>
        </div>
      </section>

      {/* Recent Donations Section */}
      <section  id="recent-donations" className="bg-white p-4 rounded-lg shadow text-right mb-6">
        <h2 className="text-lg font-bold mb-4">التبرعات الأخيرة</h2>
        <table className="min-w-full border-collapse mb-4">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">المبلغ</th>
              <th className="border p-2">الطريقة</th>
              <th className="border p-2">التاريخ</th>
              <th className="border p-2">العملة</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={index} className="border-b">
                <td className="border p-2">{donation.amount}</td>
                <td className="border p-2">{donation.method || "غير محدد"}</td>
                <td className="border p-2">{donation.donationDate ? new Date(donation.donationDate).toLocaleDateString() : "غير محدد"}</td>
                <td className="border p-2">{donation.currency || "غير محدد"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section
  id="donor-info"
  className="bg-gray-200 p-8 rounded-lg shadow-lg text-right mb-8 border border-[#940066]/30"
>
  <h2 className="text-3xl font-extrabold mb-5 text-[#940066] text-center">
  جسور العطاء  </h2>

  <div className="mb-6 text-center">
    <p className="font-medium text-gray-800 text-lg leading-relaxed">
      نشكر جميع المتبرعين الذين يساهمون بسخاء في دعم الطلاب وتعليمهم.
    </p>
    <p className="font-medium text-gray-800 text-lg leading-relaxed mt-2">
      إن تبرعاتكم تصنع فرقًا حقيقيًا في حياة الكثيرين، وتُساهم في بناء مستقبل مشرق للمجتمع.
    </p>
  </div>

  <div className="border border-gray-300 rounded-xl p-6 bg-white shadow-md hover:shadow-lg transition duration-300">
    <p className="text-gray-700 text-lg mb-4 text-center">
      بفضل تبرعاتكم، تمكن العديد من الطلاب من تحقيق أحلامهم، وإحداث تأثير إيجابي في مجتمعاتهم.
    </p>

    <div className="flex justify-center mt-6">
      <Link
        to="/SuccessStoriesCards"
        className="bg-[#940066] text-white font-bold py-3 px-6 rounded-full flex items-center gap-2 shadow-md transition-transform duration-300 hover:scale-105 hover:bg-[#7a0050]"
      >
        <span>شاهد إنجازات الطلاب</span>
        <FiArrowRight />
      </Link>
    </div>
  </div>
</section>
         

          {/* Profile Information */}
          <section id="profile-section" className="bg-white p-6 rounded-lg shadow text-right">
      <h2 className="text-2xl font-bold mb-4 text-[#940066]">معلومات الملف الشخصي</h2>

      {/* حقل الاسم */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-gray-700">الاسم الأول</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            readOnly={editField !== "name"}
            className={`border rounded-md p-2 w-full ${
              editField === "name" ? "border-[#940066] focus:ring-[#940066]" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>
        {editField === "name" ? (
          <button onClick={() => handleSave("name")} className="bg-green-600 text-white px-3 py-1 rounded">
            حفظ
          </button>
        ) : (
          <button onClick={() => handleEdit("name")} className="bg-[#940066] text-white px-3 py-1 rounded">
            تعديل
          </button>
        )}
      </div>

      {/* حقل البريد الإلكتروني */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-gray-700">البريد الإلكتروني الأساسي</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            readOnly={editField !== "email"}
            className={`border rounded-md p-2 w-full ${
              editField === "email" ? "border-[#940066] focus:ring-[#940066]" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>
        {editField === "email" ? (
          <button onClick={() => handleSave("email")} className="bg-green-600 text-white px-3 py-1 rounded">
            حفظ
          </button>
        ) : (
          <button onClick={() => handleEdit("email")} className="bg-[#940066] text-white px-3 py-1 rounded">
            تعديل
          </button>
        )}
      </div>

      {/* حقل كلمة المرور */}
      <div className="mb-4 flex items-center gap-2">
        <div className="w-full">
          <label className="block text-sm font-medium mb-2 text-gray-700">كلمة المرور</label>
          <input
            type="password"
            name="password"
            value={profile.password}
            onChange={handleChange}
            readOnly={editField !== "password"}
            placeholder="أدخل كلمة مرور جديدة"
            className={`border rounded-md p-2 w-full ${
              editField === "password" ? "border-[#940066] focus:ring-[#940066]" : "border-gray-300 bg-gray-100"
            }`}
          />
        </div>
        {editField === "password" ? (
          <button onClick={() => handleSave("password")} className="bg-green-600 text-white px-3 py-1 rounded">
            حفظ
          </button>
        ) : (
          <button onClick={() => handleEdit("password")} className="bg-[#940066] text-white px-3 py-1 rounded">
            تعديل
          </button>
        )}
      </div>
    </section>
        </div>
   
    </>
  );
}

export default DonateDashboard;
