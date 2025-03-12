import React, { useState, useEffect } from "react";
import axios from "axios";

export function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/exclude-admin")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب بيانات المستخدمين!", error);
      });
  }, []);

  const handleStatusChange = (userId, status) => {
    setEditingUser(userId);
    setNewStatus(status);
  };

  const updateStatus = (userId) => {
    if (!newStatus) {
      alert("يرجى تحديد الحالة المناسبة.");
      return;
    }

    axios
      .put("http://localhost:4000/api/users/update-status", {
        userId: userId,
        status: newStatus,
      })
      .then((response) => {
        alert(response.data.message);
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
        setEditingUser(null);
        setNewStatus("");
      })
      .catch((error) => {
        console.error("خطأ في تحديث حالة المستخدم:", error);
        alert("فشل في تحديث حالة المستخدم.");
      });
  };

  const filteredUsers = users.filter((user) => {
    return (
      (filterRole === "" || user.role === filterRole) &&
      (filterStatus === "" || user.status === filterStatus)
    );
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const statusColors = {
    approved: "bg-emerald-100 text-emerald-800",
    pending: "bg-amber-100 text-amber-800",
  };

  const roleTranslations = {
    donor: "المتبرعين",
    beneficiary: "المستفيدين",
  };

  const statusTranslations = {
    approved: "موافق",
    pending: "قيد الانتظار",
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-[#940066] text-white p-6">
          <h2 className="text-xl font-bold text-white">جدول المستخدمين</h2>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6" dir="rtl">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                فلترة حسب الدور
              </label>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">الكل</option>
                <option value="donor">المتبرعين</option>
                <option value="beneficiary">المستفيدين</option>
              </select>
            </div>
            {/* <div className="w-full md:w-1/2 lg:w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                فلترة حسب الحالة
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              >
                <option value="">الكل</option>
                <option value="pending">قيد الانتظار</option>
                <option value="approved">موافق</option>
              </select>
            </div> */}
          </div>

          {/* Modal for editing status */}
          {/* {editingUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-96 shadow-xl" dir="rtl">
                <h3 className="text-lg font-bold mb-4">تعديل حالة المستخدم</h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الحالة الجديدة
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">اختر الحالة</option>
                    <option value="pending">قيد الانتظار</option>
                    <option value="approved">موافق</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setEditingUser(null);
                      setNewStatus("");
                    }}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={() => updateStatus(editingUser)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                  >
                    حفظ
                  </button>
                </div>
              </div>
            </div>
          )} */}

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table
              className="w-full min-w-full divide-y divide-gray-200"
              dir="rtl"
            >
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "المستخدمين",
                    "الوظيفة",
                    "تاريخ التسجيل",
                    "رقم الهاتف",
                    "العنوان",
                    "الحالة",
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
                {currentUsers.length > 0 ? (
                  currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-800 font-bold">
                              {user.firstName ? user.firstName.charAt(0) : ""}
                              {user.lastName ? user.lastName.charAt(0) : ""}
                            </div>
                          </div>
                          <div className="mr-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {roleTranslations[user.role] || user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString("ar-EG")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phoneNumber || "-"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.address || "-"}
                      </td>
                      {/* <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            statusColors[user.status] ||
                            "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusTranslations[user.status] || user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() =>
                            handleStatusChange(user.id, user.status)
                          }
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-lg transition-colors"
                        >
                          تعديل
                        </button>
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-6 py-4 text-center text-sm text-gray-500"
                    >
                      لا توجد بيانات متاحة
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div
            className="flex justify-center items-center mt-6 gap-2"
            dir="rtl"
          >
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              } transition-colors`}
            >
              السابق
            </button>

            <div className="flex items-center">
              {Array.from(
                {
                  length: Math.min(
                    5,
                    Math.ceil(filteredUsers.length / usersPerPage)
                  ),
                },
                (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-8 h-8 mx-1 rounded-full ${
                        currentPage === pageNum
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      } transition-colors`}
                    >
                      {pageNum}
                    </button>
                  );
                }
              )}

              {Math.ceil(filteredUsers.length / usersPerPage) > 5 && (
                <span className="px-2">...</span>
              )}
            </div>

            <button
              disabled={indexOfLastUser >= filteredUsers.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 rounded-lg ${
                indexOfLastUser >= filteredUsers.length
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
              } transition-colors`}
            >
              التالي
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
