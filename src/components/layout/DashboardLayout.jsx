import React from "react";
import Sidebar from "../common/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar fixed rahega */}
      <Sidebar />

      {/* Outlet ka matlab hai ki jo bhi route iske andar aayega, wo yahan render hoga */}
      <div className="flex-grow-1 bg-light p-4" style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
