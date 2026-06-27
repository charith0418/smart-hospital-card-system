import React from "react";
import {
  FaPlusSquare, FaHome, FaUser, FaIdCard, FaHistory,
  FaFileMedical, FaCalendarAlt, FaAmbulance, FaCog, FaSignOutAlt,
  FaBell, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaVenusMars,
  FaDownload, FaPills, FaUserCircle
} from "react-icons/fa";

export default function Dashboard() {
  const sidebarMenu = [
    { name: "Dashboard", icon: <FaHome />, active: true },
    { name: "My Profile", icon: <FaUser /> },
    { name: "Health Card", icon: <FaIdCard /> },
    { name: "Medical History", icon: <FaHistory /> },
    { name: "Prescriptions", icon: <FaFileMedical /> },
    { name: "Appointments", icon: <FaCalendarAlt /> },
    { name: "Emergency", icon: <FaAmbulance /> },
    { name: "Settings", icon: <FaCog /> },
    { name: "Logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] font-sans text-gray-800">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-[#1E5FAD] text-white flex flex-col rounded-r-3xl py-6 shadow-xl z-10">
        <div className="flex items-center gap-3 px-6 mb-10">
          <FaPlusSquare className="text-3xl text-white bg-white/20 rounded p-1" />
          <div>
            <h1 className="text-lg font-bold leading-tight">Smart</h1>
            <p className="text-sm text-blue-200 leading-tight">Health Card</p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarMenu.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-colors ${
                item.active ? "bg-white/20 font-semibold" : "hover:bg-white/10 text-blue-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col p-8 h-screen overflow-y-auto">
        
        {/* TOP NAVBAR */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl text-gray-500">
              Welcome, <span className="font-bold text-gray-800 text-2xl">John Doe</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-gray-600 transition">
              <FaBell className="text-xl" />
            </button>
            <img
              src="https://i.pravatar.cc/150?img=11"
              alt="User"
              className="w-10 h-10 rounded-full shadow-sm border border-gray-200"
            />
          </div>
        </header>

        {/* DASHBOARD GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ROW 1: Health Card (Spans 2 columns) & Personal Info (Spans 1) */}
          <div className="lg:col-span-2 bg-green-100 border border-green-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm relative">
            <h3 className="text-[#2F6B4F] font-semibold mb-4">Digital Health Card</h3>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              {/* Avatar & Details */}
              <div className="flex items-center gap-5">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="John Doe"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
                />
                <div className="space-y-1 text-sm text-gray-600">
                  <h2 className="text-xl font-bold text-gray-800">John Doe</h2>
                  <p>Patient ID: <span className="font-medium text-gray-800">P10024</span></p>
                  <p>Blood Group: <span className="font-medium text-gray-800">B+</span></p>
                  <p>DOB: <span className="font-medium text-gray-800">15 May 1995</span></p>
                </div>
              </div>

              {/* QR Code & Button */}
              <div className="flex flex-col items-center gap-3">
                <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=P10024"
                    alt="QR Code"
                    className="w-20 h-20"
                  />
                </div>
                <button className="bg-green-600 hover:bg-[#348A61] text-white text-xs font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition">
                  <FaDownload /> Download Card
                </button>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 absolute bottom-4 left-6">Scan QR for quick access.</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center">
            <h3 className="font-bold text-gray-800 mb-5">Personal Information</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-gray-400" />
                <p>+94 71 234 5678</p>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-gray-400" />
                <p>johndoe@gmail.com</p>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <p className="leading-tight">123, Galle Road,<br/>Colombo 04</p>
              </div>
              <div className="flex items-center gap-3">
                <FaVenusMars className="text-gray-400" />
                <p>Male</p>
              </div>
            </div>
          </div>

          {/* ROW 2: Medical History, Prescriptions, Appointments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Medical History</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Hypertension</span>
                  <span>2021</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Asthma</span>
                  <span>2018</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Allergy (Dust)</span>
                  <span>2016</span>
                </li>
              </ul>
            </div>
            <a href="#" className="text-blue-500 text-xs font-semibold self-end mt-4 hover:underline">View All</a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Latest Prescription</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <div className="bg-red-50 text-red-400 p-2 rounded-full"><FaPills /></div>
                  <div>
                    <p className="font-bold text-gray-700">Paracetamol 500mg</p>
                    <p className="text-xs text-gray-500">1-0-1 After Food</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-red-50 text-red-400 p-2 rounded-full"><FaPills /></div>
                  <div>
                    <p className="font-bold text-gray-700">Amoxicillin 250mg</p>
                    <p className="text-xs text-gray-500">1-0-1 After Food</p>
                  </div>
                </li>
              </ul>
            </div>
            <a href="#" className="text-blue-500 text-xs font-semibold self-end mt-4 hover:underline">View All</a>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Upcoming Appointments</h3>
              <div className="border-l-4 border-[#1E5FAD] pl-4 py-1">
                <h4 className="font-bold text-gray-800">Dr. Sarah Johnson</h4>
                <p className="text-xs text-gray-500 mb-2">Cardiologist</p>
                <p className="text-xs font-medium text-gray-600 bg-gray-50 inline-block px-2 py-1 rounded">20 May 2025 • 10:30 AM</p>
              </div>
            </div>
            <a href="#" className="text-blue-500 text-xs font-semibold self-end mt-4 hover:underline">View All</a>
          </div>

{/* ROW 3: Emergency Contact */}
<div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm">
  <h3 className="font-bold text-gray-800 mb-4">
    Emergency Contact
  </h3>

  <div className="bg-[#FFF3F2] border border-[#FDE0DF] rounded-xl p-5 flex items-center justify-between w-full">

    {/* Left Side */}
    <div className="flex items-center gap-4">

      <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center">
        <FaUserCircle className="text-2xl" />
      </div>

      <div>
        <h4 className="font-semibold text-gray-800 text-lg">
          Mary Doe (Wife)
        </h4>

        <p className="text-gray-500 text-sm">
          Emergency Contact
        </p>
      </div>

    </div>

    {/* Phone Number */}
    <div className="hidden md:block">
      <p className="text-gray-700 font-medium text-lg">
        +94 77 123 4567
      </p>
    </div>

    {/* Call Button */}
    <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition flex items-center gap-2">
      <FaPhoneAlt />
      Call Now
    </button>

  </div>
</div>

        </div>
      </main>
    </div>
  );
}