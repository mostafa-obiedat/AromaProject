// export default Beneficiaries;
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Beneficiaries() {
  // State for beneficiaries and filtering
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [deletionFilter, setDeletionFilter] = useState("all");
  const [universityFilter, setUniversityFilter] = useState("");

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/case/beneficiaries"
        );
        setBeneficiaries(response.data);
        setFilteredBeneficiaries(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Approval handler
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/api/case/beneficiaries/${id}/approve`
      );

      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.map((beneficiary) =>
          beneficiary.id === id
            ? { ...beneficiary, approvedByAdmin: true }
            : beneficiary
        )
      );

      console.log("Beneficiary approved successfully");
    } catch (error) {
      console.error("Error approving beneficiary:", error);
    }
  };

  // Filter logic
  useEffect(() => {
    let result = beneficiaries;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (b) =>
          `${b.User?.firstName} ${b.User?.lastName}`.includes(searchTerm) ||
          b.universityName.includes(searchTerm) ||
          b.universityNo.toString().includes(searchTerm)
      );
    }

    // Approval filter
    if (approvalFilter !== "all") {
      result = result.filter(
        (b) => b.approvedByAdmin === (approvalFilter === "approved")
      );
    }

    // Deletion filter
    if (deletionFilter !== "all") {
      result = result.filter(
        (b) => b.isDeleted === (deletionFilter === "deleted")
      );
    }

    // University filter
    if (universityFilter) {
      result = result.filter((b) => b.universityName === universityFilter);
    }

    setFilteredBeneficiaries(result);
  }, [
    searchTerm,
    approvalFilter,
    deletionFilter,
    universityFilter,
    beneficiaries,
  ]);

  // Get unique universities for filter dropdown
  const uniqueUniversities = [
    ...new Set(beneficiaries.map((b) => b.universityName)),
  ];

  return (
    // <div className="container mx-auto px-4 py-8" dir="rtl">
    <div
      className="container mx-auto px-4 py-8 w-[80%] max-w-4xl ml-auto overflow-auto"
      dir="rtl"
    >
      {/* Filters Section */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="بحث"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
          />
          <svg
            className="absolute left-3 top-3 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Approval Filter */}
        <select
          value={approvalFilter}
          onChange={(e) => setApprovalFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="all">حالة الموافقة</option>
          <option value="approved">تمت الموافقة</option>
          <option value="pending">قيد الانتظار</option>
        </select>

        {/* Deletion Filter */}
        <select
          value={deletionFilter}
          onChange={(e) => setDeletionFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="all">حالة الحذف</option>
          <option value="deleted">محذوف</option>
          <option value="active">نشط</option>
        </select>

        {/* University Filter */}
        <select
          value={universityFilter}
          onChange={(e) => setUniversityFilter(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#940066] text-right"
        >
          <option value="">الجامعة</option>
          {uniqueUniversities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Table Header */}
        <div className="bg-[#940066] text-white px-6 py-4">
          <h2 className="text-xl font-bold">جدول المستفيدين</h2>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                {[
                  "المعرف",
                  "المستخدم",
                  "اسم الجامعة",
                  "رقم الجامعة",
                  "عدد الإخوة",
                  "المبلغ",
                  "مسار الملف",
                  "وصف الاحتياجات",
                  "الموافقة",
                  "الحالة",
                  "تاريخ الإنشاء",
                  "تاريخ التحديث",
                  "الإجراءات",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBeneficiaries.map((beneficiary) => (
                <tr
                  key={beneficiary.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Individual Cell Rendering */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {`${beneficiary.User?.firstName} ${beneficiary.User?.lastName}`}
                        </div>
                        <div className="text-sm text-gray-500">
                          {beneficiary.User?.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.universityName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.universityNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.brothers}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                    <a
                      href={`http://localhost:4000/${beneficiary.filePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      عرض الملف
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {beneficiary.needsDescription}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          beneficiary.approvedByAdmin
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {beneficiary.approvedByAdmin
                        ? "تمت الموافقة"
                        : "قيد الانتظار"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          beneficiary.isDeleted
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                    >
                      {beneficiary.isDeleted ? "محذوف" : "نشط"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(beneficiary.createdAt).toLocaleDateString(
                      "ar-EG"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(beneficiary.updatedAt).toLocaleDateString(
                      "ar-EG"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {!beneficiary.approvedByAdmin && (
                      <button
                        onClick={() => handleApprove(beneficiary.id)}
                        className="bg-[#940066] text-white px-3 py-1 rounded-md hover:bg-[#7a0055] transition-colors"
                      >
                        موافقة
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* No Results Handling */}
      {filteredBeneficiaries.length === 0 && (
        <div className="text-center py-10 bg-white shadow-md rounded-lg mt-4">
          <p className="text-gray-500 text-xl">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
}

export default Beneficiaries;
