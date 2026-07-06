import React, { useState } from "react";

import Sidebar from "../patient/Sidebar";
import Navbar from "../patient/Navbar";
import HealthCard from "../patient/HealthCard";
import PersonalInfo from "../patient/PersonalInfo";
import MedicalHistory from "../patient/MedicalHistory";
import PrescriptionCard from "../patient/PrescriptionCard";
import AppointmentCard from "../patient/AppointmentCard";
import EmergencyContact from "../patient/EmergencyContact";

// FIXED EXPORT: Changed to standard default function declaration
export default function PatientDashboard({ onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [user] = useState({
    name: "Patient Name",
    patientId: "P00001",
    bloodGroup: "B+",
    dob: "15 May 1995",
    phone: "+94 71 234 5678",
    email: "patient@email.com",
    address: "Colombo, Sri Lanka",
    gender: "Male",
    profileImage: "",
  });

  const [medicalHistory] = useState([
    { condition: "Hypertension", description: "High blood pressure diagnosed in 2021", year: "2021" },
    { condition: "Asthma", description: "Chronic breathing issue", year: "2018" },
  ]);

  const [prescriptions] = useState([
    { name: "Paracetamol 500mg", dosage: "1-0-1 After Food", duration: "5 Days" },
    { name: "Amoxicillin 250mg", dosage: "1-0-1 Before Food", duration: "7 Days" },
  ]);

  const [appointment] = useState({
    doctor: "Dr. Sarah Johnson",
    specialization: "Cardiologist",
    date: "20 May 2026",
    time: "10:30 AM",
  });

  const [emergencyContact] = useState({
    name: "Mary Doe",
    relationship: "Wife",
    phone: "+94 77 123 4567",
  });

  // FIXED RENDERING FUNCTION: Replaces inline && wrappers with an explicit return switch block
  const renderTabContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <HealthCard user={user} />
            <PersonalInfo user={user} />
            <AppointmentCard appointment={appointment} />
            <EmergencyContact emergencyContact={emergencyContact} />
          </div>
        );
      case "profile":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <PersonalInfo user={user} />
          </div>
        );
      case "healthcard":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <HealthCard user={user} />
          </div>
        );
      case "history":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <MedicalHistory medicalHistory={medicalHistory} />
          </div>
        );
      case "prescriptions":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <PrescriptionCard prescriptions={prescriptions} />
          </div>
        );
      case "appointments":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <AppointmentCard appointment={appointment} />
          </div>
        );
      case "emergency":
        return (
          <div className="w-full mx-auto bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <EmergencyContact emergencyContact={emergencyContact} />
          </div>
        );
      case "settings":
        return (
          <div className="w-full mx-auto bg-white p-8 rounded-2xl shadow-sm text-center border border-slate-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Account Settings</h2>
            <p className="text-slate-500">Manage security settings, system passwords, and preferences here.</p>
          </div>
        );
      default:
        return <div className="p-6">View Not Found</div>;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F5F7FA] overflow-hidden w-full">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <main className="flex-1 xl:ml-64 p-3 sm:p-4 md:p-6 overflow-y-auto h-screen">
        <Navbar user={user} setSidebarOpen={setSidebarOpen} onLogout={onLogout} />
        
        {/* Call the dynamic view renderer helper */}
        <div className="mt-4">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}