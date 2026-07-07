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

const menuItems = [
  { name: "Dashboard", icon: <FaHome />, active: true },
  { name: "Health Card", icon: <FaIdCard />, active: false },
  { name: "Medical History", icon: <FaHistory />, active: false },
  { name: "Prescriptions", icon: <FaFileMedical />, active: false },
  { name: "Emergency", icon: <FaAmbulance />, active: false },
  { name: "Logout", icon: <FaSignOutAlt />, active: false },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
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
        <nav className="flex-1 mt-6 px-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                item.active
                  ? "bg-white text-[#1E5FAD] font-semibold shadow-lg"
                  : "hover:bg-white/20 text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
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