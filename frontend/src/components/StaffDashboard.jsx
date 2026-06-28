import React from 'react';
import { FaSearch, FaQrcode, FaFileMedical, FaPrescription, FaHistory, FaFileAlt } from 'react-icons/fa';

// Placeholder base API URL for your backend partner
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const DoctorDashboard = () => {
  const recentPatients = [
    { id: "P10024", name: "John Doe", date: "20 May 2025", img: "https://i.pravatar.cc/150?img=33" },
    { id: "P10018", name: "Chanchala Madhushani", date: "20 May 2025", img: "https://i.pravatar.cc/150?img=47" },
    { id: "P10011", name: "David Perera", date: "19 May 2025", img: "https://i.pravatar.cc/150?img=68" },
    { id: "P10007", name: "Nimal Silva", date: "19 May 2025", img: "https://i.pravatar.cc/150?img=12" },
  ];

  const appointments = [
    { name: "John Doe", time: "10:30 AM", img: "https://i.pravatar.cc/150?img=33" },
    { name: "Maria Fernando", time: "11:30 AM", img: "https://i.pravatar.cc/150?img=47" },
    { name: "David Perera", time: "01:00 PM", img: "https://i.pravatar.cc/150?img=68" },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-[#1e293b]">
      {/* Top Section: Search and Scan Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Patient Box */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-center">
          <h3 className="text-lg font-bold mb-3 text-[#0f172a]">Search Patient</h3>
          <div className="flex bg-gray-50 rounded-xl border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#078a72] transition-all">
            <input 
              type="text" 
              placeholder="Search by name or Patient ID..." 
              className="w-full bg-transparent px-4 py-3 outline-hidden text-sm"
            />
            <button className="bg-[#0b57d0] text-white px-5 flex items-center justify-center hover:bg-[#0842a0] transition-colors cursor-pointer">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Scan Patient QR Quick Box */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 transition-colors">
          <div>
            <h3 className="text-lg font-bold text-[#0f172a]">Scan Patient QR</h3>
            <p className="text-xs text-gray-400 mt-1">Click to scan QR code</p>
          </div>
          <div className="w-16 h-16 border-2 border-dashed border-[#0b57d0] rounded-xl flex items-center justify-center text-2xl text-[#0b57d0] bg-blue-50/50">
            <FaQrcode />
          </div>
        </div>
      </div>

      {/* Middle Section: Recent Patients & Today's Appointments Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Patients */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
          <h3 className="text-lg font-bold mb-4 text-[#0f172a]">Recent Patients</h3>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                <div className="flex items-center space-x-3">
                  <img src={patient.img} alt={patient.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-800">{patient.name}</h4>
                    <p className="text-xs text-gray-400 font-medium sm:hidden">{patient.id}</p>
                  </div>
                </div>
                <span className="hidden sm:inline text-xs text-gray-500 font-semibold tracking-wider">{patient.id}</span>
                <span className="text-xs text-gray-400 font-medium">{patient.date}</span>
                <button className="px-4 py-1.5 border border-blue-200 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors cursor-pointer">View</button>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Appointments */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold mb-4 text-[#0f172a]">Today's Appointments</h3>
            <div className="space-y-4">
              {appointments.map((app, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <img src={app.img} alt={app.name} className="w-9 h-9 rounded-full object-cover border border-gray-200" />
                    <h4 className="text-sm font-bold text-gray-800">{app.name}</h4>
                  </div>
                  <span className="text-xs text-gray-500 font-bold bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">{app.time}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-5 text-center text-sm font-bold text-[#0b57d0] hover:underline cursor-pointer">View All</button>
        </div>
      </div>

      {/* Bottom Row: Quick Navigation Action Panels */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className="text-2xl text-emerald-600 p-3 bg-emerald-50 rounded-xl mb-2"><FaFileMedical /></div>
          <h4 className="text-xs font-bold text-gray-800">Add Treatment</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Add new treatment</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className="text-2xl text-blue-600 p-3 bg-blue-50 rounded-xl mb-2"><FaPrescription /></div>
          <h4 className="text-xs font-bold text-gray-800">Create Prescription</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Generate prescription</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className="text-2xl text-purple-600 p-3 bg-purple-50 rounded-xl mb-2"><FaHistory /></div>
          <h4 className="text-xs font-bold text-gray-800">Patient Records</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">View full history</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] transition-transform">
          <div className="text-2xl text-amber-600 p-3 bg-amber-50 rounded-xl mb-2"><FaFileAlt /></div>
          <h4 className="text-xs font-bold text-gray-800">Reports</h4>
          <p className="text-[10px] text-gray-400 mt-0.5">Generate reports</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;