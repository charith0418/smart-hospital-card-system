import React from "react";
import {
  FaBell,
  FaSearch,
  FaChevronDown,
  FaBars,
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

        {/* Search Box */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-full md:w-72">

          <FaSearch className="text-gray-400 mr-3" />

          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full text-sm"
          />

        </div>

        {/* Notification */}
        <button className="relative bg-gray-100 hover:bg-gray-200 transition p-3 rounded-xl">

          <FaBell className="text-gray-600 text-lg" />

          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>

        {/* User */}
        <div className="flex items-center gap-3 cursor-pointer">

          <img
            src={
              user.profileImage ||
              "https://i.pravatar.cc/150?img=11"
            }
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-[#1E5FAD] object-cover"
          />

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