import React, { useState } from "react";

// 1. ඔබේ වෙන් වෙන් ෆයිල්ස් මෙතනින් Import කරගන්න (Linking Files)
import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";
import PatientSearchCard from "./PatientSearchCard";
import RecentPatientTable from "./RecentPatientTable";

// 2. අනෙකුත් Tabs සඳහා කලින් හැදූ පිටු (Pages) ලින්ක් කිරීම
import UpdateRecords from "../UpdateRecords";
import PrintCard from "../PrintCard";

export default function DoctorDashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔄 සයිඩ්බාර් එකේ ක්ලික් කරන ID එක අනුව මැද පැනල් එක මාරු කිරීම
  const renderMainContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* 🔍 ඉහළ කොටස: Search සහ Scan Cards දෙක */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* ඔබ වෙන් කර සාදපු Search Card එක */}
                <PatientSearchCard />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <h3 className="font-bold text-slate-700 text-sm mb-2">Scan Patient QR</h3>
                <div className="border border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition">
                  <span className="text-2xl text-emerald-600 mb-1">🔲</span>
                  <p className="text-xs text-slate-400">Click to scan QR code</p>
                </div>
              </div>
            </div>

            {/* 🕒 මැද කොටස: Live Tables ලැයිස්තු දෙක */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                {/* ඔබ වෙන් කර සාදපු Recent Patients Table එක */}
                <RecentPatientTable />
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="font-bold text-slate-700 text-sm mb-4">Today's Appointments</h3>
                <div className="space-y-3 text-sm text-slate-500">
                  <p>📅 Appointments ලැයිස්තුව මෙතනට...</p>
                </div>
              </div>
            </div>

            {/* ⚡ පහළ කොටස: Quick Action Tray Shortcuts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <button onClick={() => setActiveTab("treatments")} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-500 transition text-center space-y-1">
                <div className="text-emerald-600 text-xl">➕</div>
                <div className="text-xs font-bold text-slate-700">Add Treatment</div>
              </button>
              <button onClick={() => setActiveTab("prescriptions")} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-500 transition text-center space-y-1">
                <div className="text-blue-600 text-xl">📝</div>
                <div className="text-xs font-bold text-slate-700">Create Prescription</div>
              </button>
              <button onClick={() => setActiveTab("update")} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-500 transition text-center space-y-1">
                <div className="text-purple-600 text-xl">🔄</div>
                <div className="text-xs font-bold text-slate-700">Patient Records</div>
              </button>
              <button onClick={() => setActiveTab("reports")} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:border-emerald-500 transition text-center space-y-1">
                <div className="text-amber-600 text-xl">📊</div>
                <div className="text-xs font-bold text-slate-700">Reports Summary</div>
              </button>
            </div>
          </div>
        );

      case "register":
        return <div className="bg-white p-6 rounded-2xl border">📝 Patient Registration Form Component</div>;
      case "patients":
        return <div className="bg-white p-6 rounded-2xl border">👥 Complete Patients Directory Master List</div>;
      case "treatments":
        return <div className="bg-white p-6 rounded-2xl border">🩺 Clinical Consultation Treatment Logs</div>;
      case "prescriptions":
        return <div className="bg-white p-6 rounded-2xl border">📄 Pharmacy Prescriptions Hub</div>;
      case "scan":
        return <div className="bg-white p-6 rounded-2xl border">🔍 Identity Verification QR Scanner Module</div>;
      case "print":
        return <PrintCard />; // 🖨️ Print Card එක ලින්ක් විය
      case "update":
        return <UpdateRecords />; // 🔄 Update Records එක ලින්ක් විය
      case "reports":
        return <div className="bg-white p-6 rounded-2xl border">📊 Aggregation Data Reports Pipeline</div>;
      default:
        return <div className="p-6 text-slate-400">Section Dashboard Loading...</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden w-full relative">
      {/* Sidebar Navigation */}
      <DoctorSidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onLogout={onLogout} 
      />

      {/* Main Container Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen xl:pl-64">
        {/* ඔබ වෙන් කර සාදපු Top Navbar එක */}
        <DoctorNavbar setSidebarOpen={setSidebarOpen} activeTab={activeTab} />

        {/* Content Render Core Wrapper */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>
      </div>
    </div>
  );
}