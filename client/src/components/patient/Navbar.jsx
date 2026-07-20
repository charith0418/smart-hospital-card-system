import React from "react";
import {
  FaBell,
  FaSearch,
  FaChevronDown,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";

export default function Navbar({
  user = {},
  setSidebarOpen,
}) {
  return (
    <header className="bg-white rounded-2xl shadow-sm px-4 md:px-6 py-4 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

      {/* Left Side */}
      <div>

        <h2 className="text-2xl font-bold text-gray-800">
          Welcome,
          <span className="text-[#1E5FAD] ml-2">
            {user.name || "Patient Name"}
          </span>
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Have a healthy day!
        </p>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <button
        onClick={() => setSidebarOpen(true)}
         className="lg:hidden text-2xl"
        >
  <FaBars />
</button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">

          <div className="w-12 h-12 rounded-full border-2 border-[#1E5FAD] bg-gray-100 flex items-center justify-center overflow-hidden">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-400" />
            )}
          </div>

          <div className="hidden lg:block">

            <h3 className="font-semibold text-gray-800">
              {user.name || "Patient Name"}
            </h3>

            <p className="text-xs text-gray-500">
              Patient
            </p>

          </div>

          <FaChevronDown className="text-gray-500" />

        </div>

      </div>

    </header>
  );
}