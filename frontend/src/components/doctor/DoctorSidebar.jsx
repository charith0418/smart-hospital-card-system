import React from "react";
import { FaPlusSquare, FaHome, FaUsers, FaQrcode, FaCalendarCheck, FaBriefcaseMedical, FaFileAlt, FaCog, FaSignOutAlt } from "react-icons/fa";

const menuItems = [
  { name: "DoctorDashboard", id: "dashboard", icon: <FaHome /> },
  { name: "Patients", id: "patients", icon: <FaUsers /> },
  { name: "Scan QR", id: "scan", icon: <FaQrcode /> },
  { name: "Treatments", id: "treatments", icon: <FaBriefcaseMedical /> },
  { name: "Prescriptions", id: "prescriptions", icon: <FaFileAlt /> },
  { name: "Reports", id: "reports", icon: <FaFileAlt /> },
  { name: "Settings", id: "settings", icon: <FaCog /> },
];

export default function DoctorSidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, onLogout }) {
  return (
    <aside className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#1E3A8A] text-white flex flex-col shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}>
      <div className="flex items-center gap-3 px-6 py-6 border-b border-white/10">
        <FaPlusSquare className="text-3xl text-blue-400" />
        <div>
          <h1 className="text-lg font-bold tracking-wide">Smart</h1>
          <p className="text-blue-300 text-xs">Health Card</p>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 overflow-y-auto space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all ${
              activeTab === item.id ? "bg-white text-[#1E3A8A] font-semibold shadow-md" : "hover:bg-white/10 text-slate-200"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.name}
          </button>
        ))}

        <button onClick={onLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-red-300 hover:bg-red-600/20 transition-all mt-6">
          <span className="text-lg"><FaSignOutAlt /></span>
          Logout
        </button>
      </nav>
    </aside>
  );
}