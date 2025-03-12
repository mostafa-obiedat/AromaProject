import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const BeneficiaryForm = ({ editingBeneficiary, existingData }) => {
  const getUserIdFromToken = () => {
    const token = Cookies.get("token");
    if (!token) return null;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return decodedToken.id;
    } catch (error) {
      console.error("❌ خطأ في فك تشفير التوكن:", error);
      return null;
    }
  };

  const [formData, setFormData] = useState({
    userId: "",
    universityName: "",
    universityNo: "",
    brothers: "",
    amount: "",
    needsDescription: "",
    file: null,
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setFormData((prevData) => ({ ...prevData, userId }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (editingBeneficiary) {
        await axios.put(`http://localhost:4000/api/beneficiaries/${existingData.id}`, formDataToSend);
        setMessage("تم تحديث الطلب بنجاح!");
      } else {
        await axios.post("http://localhost:4000/api/case/beneficiary", formDataToSend);
        setMessage("تم إرسال الطلب بنجاح!");
      }
      setMessageType("success");
      
      Swal.fire({
        title: "تم بنجاح!",
        text: editingBeneficiary ? "تم تحديث الطلب بنجاح!" : "تم إرسال الطلب بنجاح!",
        icon: "success",
        confirmButtonText: "حسنًا",
      }).then(() => {
        navigate("/");
      });
      
    } catch (error) {
      setMessage(error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب");
      setMessageType("error");
      
      Swal.fire({
        title: "خطأ!",
        text: error.response?.data?.message || "حدث خطأ أثناء إرسال الطلب",
        icon: "error",
        confirmButtonText: "حسنًا",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-8 text-right" dir="rtl">
      <h2 className="text-2xl font-bold text-center text-[#940066] mb-6">
        {editingBeneficiary ? "تعديل طلب المستفيد" : "طلب منحة"}
      </h2>

      {message && (
        <div className={`p-4 mb-4 rounded-md text-center ${messageType === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="userId" value={formData.userId} />

        <input type="text" name="universityName" placeholder="اسم الجامعة" value={formData.universityName} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="universityNo" placeholder="الرقم الجامعي" value={formData.universityNo} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="brothers" placeholder="عدد الإخوة في الجامعة" value={formData.brothers} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="number" name="amount" placeholder="المبلغ المطلوب" value={formData.amount} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <textarea name="needsDescription" placeholder="وصف الحاجة" value={formData.needsDescription} onChange={handleChange} rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        
        <input type="file" onChange={handleFileChange} className="w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md bg-gray-50" />
        
        <button type="submit" className="w-full bg-[#940066] text-white py-2 px-4 rounded-md hover:bg-[#671F79] transition duration-200 inline-block">
          {editingBeneficiary ? "تحديث الطلب" : "إرسال الطلب"}
        </button>
      </form>
    </div>
  );
};

export default BeneficiaryForm;
