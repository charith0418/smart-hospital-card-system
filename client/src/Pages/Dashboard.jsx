import React, { useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HealthCard from "../components/HealthCard";
import PersonalInfo from "../components/PersonalInfo";
import MedicalHistory from "../components/MedicalHistory";
import PrescriptionCard from "../components/PrescriptionCard";
import AppointmentCard from "../components/AppointmentCard";
import EmergencyContact from "../components/EmergencyContact";

export default function Dashboard() {
  // Temporary dummy state
  // Later your friend will replace this with backend API data
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

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [medicalHistory] = useState([
    {
      condition: "Hypertension",
      description: "High blood pressure diagnosed in 2021",
      year: "2021",
    },
    {
      condition: "Asthma",
      description: "Chronic breathing issue",
      year: "2018",
    },
  ]);

  const [prescriptions] = useState([
    {
      name: "Paracetamol 500mg",
      dosage: "1-0-1 After Food",
      duration: "5 Days",
    },
    {
      name: "Amoxicillin 250mg",
      dosage: "1-0-1 Before Food",
      duration: "7 Days",
    },
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

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F5F7FA] overflow-hidden">

      {/* Sidebar */}
      <Sidebar
         sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 xl:ml-64 p-3 sm:p-4 md:p-6 overflow-y-auto h-screen">

        {/* Navbar */}
        <Navbar
  user={user}
  setSidebarOpen={setSidebarOpen}
/>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {/* Row 1 */}
          <HealthCard user={user} />
          <PersonalInfo user={user} />

          {/* Row 2 */}
          <MedicalHistory medicalHistory={medicalHistory} />
          <PrescriptionCard prescriptions={prescriptions} />
          <AppointmentCard appointment={appointment} />

          {/* Row 3 */}
          <EmergencyContact emergencyContact={emergencyContact} />

        </div>

      </main>

    </div>
  );
}