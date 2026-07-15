import React from "react";
import { FaBars, FaUserMd } from "react-icons/fa";

export default function DoctorNavbar({ setSidebarOpen, loggedInDoctor = { name: "Dr. Asela Perera", id: "DOC-9941", department: "OPD Consultant" } }) {
  return (
    <header className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between w-full shrink-0">
      
      {/* Left side: Mobile menu toggle and title */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)} 
          className="xl:hidden p-2 text-gray-500 hover:bg-slate-50 rounded-lg transition cursor-pointer"
          type="button"
          aria-label="Open sidebar"
        >
          <FaBars className="text-xl" />
        </button>
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight">Clinical Workspace</h1>
        </div>
      </div>

      {/* Right side: Complete Doctor profile elements using inline SVG icons */}
      <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
        
        <div className="text-right hidden sm:block">
          <h2 className="text-sm font-black text-slate-800 leading-tight">
            {loggedInDoctor.name}
          </h2>
          <div className="flex items-center justify-end gap-2 mt-0.5">
            <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-200/60 px-1.5 py-0.5 rounded">
              {loggedInDoctor.id}
            </span>
            <span className="text-[11px] font-extrabold text-[#008060] uppercase tracking-wider">
              {loggedInDoctor.department}
            </span>
          </div>
        </div>

        {/* Dynamic fallback vector graphic profile block */}
        <div className="w-10 h-10 bg-[#008060]/10 rounded-xl flex items-center justify-center text-[#008060] text-xl border border-[#008060]/20 shrink-0">
          <FaUserMd />
        </div>

      </div>

    </header>
  );
}