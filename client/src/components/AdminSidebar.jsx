import React from "react";
import {
  FaHospital,
  FaTachometerAlt,
  FaUsers,
  FaUserMd,
  FaUserNurse,
  FaClipboardList,
  FaFileAlt,
  FaDatabase,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  { title: "Dashboard", icon: <FaTachometerAlt />, active: true },
  { title: "User Management", icon: <FaUsers /> },
  { title: "Doctors", icon: <FaUserMd /> },
  { title: "Staff", icon: <FaUserNurse /> },
  { title: "System Logs", icon: <FaClipboardList /> },
  { title: "Reports", icon: <FaFileAlt /> },
  { title: "Logout", icon: <FaSignOutAlt /> },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-[#0B1F4D] text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="px-6 py-7 border-b border-white/10">

        <div className="flex items-center gap-3">

          <div className="bg-white p-3 rounded-xl">
            <FaHospital className="text-[#0B1F4D] text-2xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              Smart
            </h1>

            <p className="text-blue-200 text-sm">
              Health Card
            </p>
          </div>

        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 mt-8 px-4">

        {menuItems.map((item, index) => (

          <button
            key={index}
            className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl mb-2 transition-all duration-300

            ${
              item.active
                ? "bg-white text-[#0B1F4D] shadow-lg font-semibold"
                : "hover:bg-white/10 text-gray-200"
            }`}
          >

            <span className="text-lg">
              {item.icon}
            </span>

            <span className="text-sm">
              {item.title}
            </span>

          </button>

        ))}

      </nav>

      <div className="p-5 border-t border-white/20 text-center text-xs text-blue-200">
          Smart Health Card
          <br />
          Version 1.0
        </div>

    </aside>
  );
}