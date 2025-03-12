import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Home from "../Pages/dashboardAdmin/overview";
import Users from "../Pages/dashboardAdmin/users";
import Message from "../Pages/dashboardAdmin/message";

import { Beneficiaries } from "../Pages/dashboardAdmin/Beneficiaries";

function Routerdashboard() {
  return (
    <div className="flex flex-row-reverse">
      <Sidebar />
      <div className="flex-1 p-4 lg:mr-64">
        <Routes>
          {/* إعادة التوجيه تلقائيًا من /dashboard إلى /dashboard/overview */}
          <Route path="/" element={<Navigate to="/dashboard/overview" />} />
          <Route path="/overview" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/Beneficiaries" element={<Beneficiaries />} />
          <Route path="/message" element={<Message />} />

          <Route path="*" element={<Navigate to="/dashboard/overview" />} />
        </Routes>
      </div>
    </div>
  );
}

export default Routerdashboard;
