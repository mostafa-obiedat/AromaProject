// export default Sidebar;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  UserCircleIcon,
  ChatBubbleLeftIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/solid";
import { Heart } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    // حذف البيانات من localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // حذف التوكن من الكوكيز (إذا كنت تستخدمها)
    Cookies.remove("token");

    // توجيه المستخدم إلى الصفحة الرئيسية
    navigate("/");
  };

  const links = [
    {
      name: "الصفحة الرئيسية",
      path: "/dashboard/overview",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      name: "المستخدمون",
      path: "/dashboard/users",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
    {
      name: "المستفيدون",
      path: "/dashboard/Beneficiaries",
      icon: <UserCircleIcon className="w-5 h-5" />,
    },
    {
      name: "الرسائل",
      path: "/dashboard/message",
      icon: <ChatBubbleLeftIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex flex-row-reverse mr-10">
      {" "}
      {/* Added mr-10 here */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 z-50 bg-teal-600 text-white p-3 rounded-md lg:hidden"
        >
          ☰
        </button>
      )}
      <aside
        className={`bg-[#940066] text-white px-6 py-4 w-64 min-h-screen flex flex-col p-4 shadow-lg 
          fixed top-0 right-0 z-50 transition-transform duration-300 ease-in-out 
          ${isOpen ? "translate-x-0" : "translate-x-full"} 
          lg:translate-x-0 lg:fixed lg:right-0 lg:z-0 lg:w-64`}
      >
        <button
          onClick={toggleSidebar}
          className="mb-4 self-start text-lg lg:hidden"
        >
          ✖
        </button>

        <div className="flex items-center justify-center">
          <Heart className="w-6 h-6 text-white mr-2 animate-pulse" />
          <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-white">
            ارومة
          </div>
        </div>

        <ul className="flex-1 mt-10 space-y-3">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex flex-row-reverse items-center gap-2 p-2 rounded-md ${
                    isActive ? "bg-white-700" : "hover:bg-white-700"
                  }`
                }
              >
                {link.icon} <span>{link.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <NavLink
          to="/"
          onClick={handleLogout} // استدعاء دالة تسجيل الخروج عند النقر
          className="mt-auto flex flex-row-reverse items-center gap-2 p-3 rounded-md transition "
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />{" "}
          <span>تسجيل الخروج</span>
        </NavLink>
      </aside>
    </div>
  );
};

export default Sidebar;
