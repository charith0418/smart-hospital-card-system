import React, { useState } from "react";
import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";
import PatientSearchCard from "./PatientSearchCard";
import RecentPatientsTable from "./RecentPatientTable";
import DoctorActionButtons from "./DocotorActionButtons";

export default function Doctor({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dynamic Content Switcher (matches sidebar clicks)
  const renderDoctorContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Top Grid: Search & QR Scanner */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PatientSearchCard />
              </div>
              <div>
                {/* QR Code Scanner component wrapper */}
                <div className="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm text-center h-full flex flex-col justify-center items-center">
                  <h3 className="text-gray-700 font-bold mb-2">Scan Patient QR</h3>
                  <div className="w-24 h-24 border-2 border-dashed border-blue-400 rounded-xl flex items-center justify-center text-blue-500 text-4xl animate-pulse">
                    🔍
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Click to turn on device camera</p>
                </div>
              </div>
            </div>

            {/* Middle Grid: Tables and Schedules */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <RecentPatientsTable />
              </div>
            </div>

            {/* Bottom Quick Action Bar */}
            <DoctorActionButtons />
          </div>
        );
      case "patients":
        return <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm font-semibold text-slate-700">📂 Patient Management Database Panel</div>;
      case "appointments":
        return <div className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm font-semibold text-slate-700">📅 Appointment Calendars & Schedules</div>;
      default:
        return <div className="p-6 text-slate-400">Panel Section Coming Soon</div>;
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
      
      {/* App Main Content Frame Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen">
        <DoctorNavbar setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderDoctorContent()}
          </div>
        </main>
      </div>
    </div>
  );
}