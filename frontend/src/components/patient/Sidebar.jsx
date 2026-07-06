import React from "react";
import {
  FaPlusSquare,
  FaHome,
  FaUser,
  FaIdCard,
  FaHistory,
  FaFileMedical,
  FaCalendarAlt,
  FaAmbulance,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// CHANGED PLACE: Cleaned up structural definition data out of the array layout
const menuItems = [
  { name: "Dashboard", id: "dashboard", icon: <FaHome /> },
  { name: "My Profile", id: "profile", icon: <FaUser /> },
  { name: "Health Card", id: "healthcard", icon: <FaIdCard /> },
  { name: "Medical History", id: "history", icon: <FaHistory /> },
  { name: "Prescriptions", id: "prescriptions", icon: <FaFileMedical /> },
  { name: "Appointments", id: "appointments", icon: <FaCalendarAlt /> },
  { name: "Emergency", id: "emergency", icon: <FaAmbulance /> },
  { name: "Settings", id: "settings", icon: <FaCog /> },
];

// CHANGED PLACE: Added activeTab, setActiveTab, and onLogout into the properties definition hook
export default function Sidebar({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          w-64 h-screen
          bg-[#1E5FAD]
          text-white
          flex flex-col
          shadow-2xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          xl:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8 border-b border-white/20">
          <div className="bg-white/20 p-2 rounded-xl">
            <FaPlusSquare className="text-3xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold">Smart</h1>
            <p className="text-blue-200 text-sm">Health Card</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-6 px-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            // CHANGED PLACE: Check state comparison instead of relying on a hardcoded flag
            const isCurrentActive = activeTab === item.id;

            return (
              <button
                key={index}
                type="button"
                // CHANGED PLACE: Update app active layout tab point and close sliding navbar drawer drawer layer
                onClick={() => {
                  setActiveTab(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                  isCurrentActive
                    ? "bg-white text-[#1E5FAD] font-semibold shadow-lg"
                    : "hover:bg-white/20 text-white"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}

          {/* CHANGED PLACE: Distinct structural routing layer action specific to logging out */}
          <button
            type="button"
            onClick={onLogout}
            className="w-full flex items-center gap-4 px-4 py-3 rounded-xl mt-4 text-red-200 hover:bg-red-600/30 hover:text-white transition-all duration-300"
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            <span>Logout</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-5 border-t border-white/20 text-center text-xs text-blue-200">
          Smart Health Card
          <br />
          Version 1.0
        </div>
      </aside>
    </>
  );
}