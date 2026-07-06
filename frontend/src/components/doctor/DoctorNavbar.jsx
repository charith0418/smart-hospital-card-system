import React from "react";
import { FaBars, FaSearch, FaRegBell } from "react-icons/fa";

export default function DoctorNavbar({ setSidebarOpen }) {
  return (
    <header className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
      
      {/* Left: Mobile Toggle & Welcome Title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="xl:hidden p-2 text-gray-500 hover:bg-slate-50 rounded-lg transition"
        >
          <FaBars className="text-xl" />
        </button>
        <div>
          <h2 className="text-sm font-medium text-slate-400">Welcome back,</h2>
          <h1 className="text-lg font-bold text-slate-800">Dr. Sarah Johnson</h1>
        </div>
      </div>

      {/* Right: Search & Action Center */}
      <div className="flex items-center gap-6">
        <div className="relative hidden md:block w-64">
          <FaSearch className="absolute left-3.5 top-3 text-slate-400 text-sm" />
          <input 
            type="text" 
            placeholder="Global Search..." 
            className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative p-2.5 text-slate-500 hover:bg-slate-50 rounded-xl transition-all">
          <FaRegBell className="text-lg" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Profile Avatar Badge */}
        <div className="flex items-center gap-3 border-l pl-6 border-slate-100">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop" 
            alt="Doctor profile" 
            className="w-9 h-9 rounded-full object-cover shadow-sm border border-slate-200"
          />
        </div>
      </div>

    </header>
  );
}