// import React from "react";
// import Sidebar from "../common/Sidebar";
// import { Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <div className="d-flex">
//       <Sidebar />

//       <div className="flex-grow-1 bg-light p-4" style={{ minHeight: "100vh" }}>
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import { AlignLeft } from "lucide-react";

const DashboardLayout = () => {
  return (
    <div className="container-fluid p-0">
      {/* Container to handle the entire dashboard area */}
      <div className="d-flex">
        
        {/* DESKTOP SIDEBAR - Sticky so it stays while scrolling */}
        <aside 
          className="d-none d-lg-block bg-navy border-end shadow-sm" 
          style={{ width: "260px", height: "100vh", position: "sticky", top: "0", zIndex: 1000 }}
        >
          {/* Spacer for the Desktop Navbar height */}
          <div style={{ height: "30px" }}></div> 
          <Sidebar />
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-grow-1 bg-light min-vh-100 overflow-hidden">
          {/* Spacer for Fixed Navbar on Mobile & Desktop */}
          <div style={{ height: "20px" }}></div>

          {/* MOBILE TOGGLE HEADER (Shows only on Mobile) */}
          <div className="d-lg-none px-3 mb-3">
            <div className="bg-white p-3 rounded-4 shadow-sm d-flex align-items-center justify-content-between border">
              <h6 className="m-0 fw-bold text-navy text-uppercase ls-1">Dashboard</h6>
              <button 
                className="btn btn-navy d-flex align-items-center gap-2 rounded-3" 
                data-bs-toggle="offcanvas" 
                data-bs-target="#mobileSidebar"
              >
                <AlignLeft size={20} /> <span className="fw-bold small">MENU</span>
              </button>
            </div>
          </div>

          {/* DYNAMIC PAGE CONTENT */}
          <div className="px-3 px-md-4 pb-5">
            <Outlet />
          </div>
        </main>
      </div>

      {/* MOBILE SIDEBAR (OFFCANVAS) */}
      <div 
        className="offcanvas offcanvas-start bg-navy text-white border-0 shadow" 
        tabIndex="-1" 
        id="mobileSidebar" 
        style={{ width: "280px" }}
      >
        <div className="offcanvas-header border-bottom border-secondary border-opacity-25 p-4">
          <h5 className="offcanvas-title fw-bold ls-1">USER MENU</h5>
          <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <Sidebar isMobile={true} />
        </div>
      </div>

      <style>{`
        .bg-navy { background-color: #1a2b49 !important; }
        .btn-navy { background-color: #1a2b49; color: white; border: none; }
        .ls-1 { letter-spacing: 1px; }
      `}</style>
    </div>
  );
};

export default DashboardLayout;