import React from "react";
import { 
  FaPlusSquare, FaThLarge, FaUserPlus, FaUsers, FaSignOutAlt 
} from "react-icons/fa";

// The absolute core clinical workspace tabs
const menuItems = [
  { name: "Dashboard", id: "dashboard", icon: <FaThLarge /> },
  { name: "Register Patient", id: "register", icon: <FaUserPlus /> },
  { name: "Patients", id: "patients", icon: <FaUsers /> },
];

export default function DoctorSidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, onLogout }) {
  return (
    <aside className={`fixed top-0 left-0 z-50 w-64 h-screen bg-[#008060] text-white flex flex-col shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0`}>
      {/* Hospital Logo Branding Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10 shrink-0">
         <div className="bg-white/20 p-2 rounded-xl">
            <FaPlusSquare className="text-3xl" />
         </div>
        <div>
          <h1 className="text-md font-bold tracking-wide">Medicare Hospital</h1>
        </div>
      </div>

      {/* Navigation Menu Links Grid Layout */}
      <nav className="flex-1 mt-4 px-3 overflow-y-auto space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => { 
              setActiveTab(item.id); 
              setSidebarOpen(false); 
            }}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-all cursor-pointer ${
              activeTab === item.id 
                ? "bg-[#005e46] text-white font-semibold shadow-md border-l-4 border-emerald-300" 
                : "hover:bg-white/10 text-emerald-50"
            }`}
          >
            <span className="text-lg opacity-80">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}

        {/* System Logout Trigger Action */}
        <button 
          onClick={onLogout} 
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm text-red-200 hover:bg-red-600/20 transition-all mt-6 border-t border-white/10 pt-4 cursor-pointer"
        >
          <span className="text-lg"><FaSignOutAlt /></span>
          Logout
        </button>
      </nav>
    </aside>
  );
}