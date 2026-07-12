import React, { useState } from "react";

import Sidebar from "../components/Dashboard/Sidebar";
import Navbar from "../components/Dashboard/Navbar";
import HealthCard from "../components/Dashboard/HealthCard";
import PersonalInfo from "../components/Dashboard/PersonalInfo";
import MedicalHistory from "../components/Dashboard/MedicalHistory";
import PrescriptionCard from "../components/Dashboard/PrescriptionCard";
import EmergencyContact from "../components/Dashboard/EmergencyContact";
import MedicalHistoryPopup from "../components/MedicalHistory/MedicalHistoryPopup";

export default function Dashboard() {
  // Temporary dummy state
  // Later your friend will replace this with backend API data
  const [user] = useState({
    name: "Patient Name",
    patientId: "P00001",
    age:27,
    bloodGroup: "B+",
    dob: "15 May 1995",
    phone: "+94 71 234 5678",
    email: "patient@email.com",
    address: "Colombo, Sri Lanka",
    gender: "Male",
    profileImage: "",
  });

  const [sidebarOpen, setSidebarOpen] = useState(false);

   const [medicalHistoryOpen, setMedicalHistoryOpen] = useState(false);

  const [medicalHistory] = useState([
  {
    id: 1,
    diagnosis: "Hypertension",
    doctor: "Dr. N. Silva",
    date: "12 Apr 2026",
  },
  {
    id: 2,
    diagnosis: "Asthma",
    doctor: "Dr. K. Perera",
    date: "02 Feb 2026",
  },
  {
    id: 3,
    diagnosis: "Diabetes Type II",
    doctor: "Dr. N. Silva",
    date: "18 Nov 2025",
  },
  {
    id: 4,
    diagnosis: "Seasonal Allergy",
    doctor: "Dr. Fernando",
    date: "05 Aug 2025",
  },
]);

const [surgeries] = useState([
  {
    id: 1,
    surgery: "Appendectomy",
    hospital: "National Hospital",
    doctor: "Dr. N. Silva",
    date: "12 Mar 2022",
  },
  {
    id: 2,
    surgery: "Knee Arthroscopy",
    hospital: "Asiri Hospital",
    doctor: "Dr. K. Perera",
    date: "05 Aug 2020",
  },
  {
    id: 3,
    surgery: "Knee Arthroscopy",
    hospital: "Asiri Hospital",
    doctor: "Dr. K. Perera",
    date: "05 Aug 2020",
  },
  {
    id: 4,
    surgery: "Knee Arthroscopy",
    hospital: "Asiri Hospital",
    doctor: "Dr. K. Perera",
    date: "05 Aug 2020",
  },
]);

const [allergies] = useState([
  {
    id: 1,
    allergy: "Penicillin",
  },
  {
    id: 2,
    allergy: "Seafood",
  },
  {
    id: 3,
    allergy: "Dust",
  },
]);

const [vaccinations] = useState([
  {
    id: 1,
    vaccine: "Covid-19 Booster",
    date: "2025",
  },
  {
    id: 2,
    vaccine: "Hepatitis B",
    date: "2023",
  },
  {
    id: 3,
    vaccine: "Tetanus",
    date: "2024",
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

  const [emergencyContact] = useState({
    name: "Mary Doe",
    relationship: "Wife",
    phone: "+94 77 123 4567",
  });

 

  const handleMenuClick = (menu) => {

    if(menu === "Medical History"){
        setMedicalHistoryOpen(true);
    }

  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#F5F7FA] overflow-hidden">

      {/* Sidebar */}
      <Sidebar
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
    onMenuClick={handleMenuClick}
/>

      {/* Main Content */}
      <main className="flex-1 xl:ml-64 p-3 sm:p-4 md:p-6 overflow-y-auto h-screen">

        {/* Navbar */}
        <Navbar
  user={user}
  setSidebarOpen={setSidebarOpen}
/>

        {/* Grid Layout */}
        {/* Row 1 */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  <HealthCard user={user} />
  <PersonalInfo user={user} />
</div>

{/* Row 2 */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
  <MedicalHistory
      medicalHistory={medicalHistory}
      onViewAll={() => setMedicalHistoryOpen(true)}
  />
  <PrescriptionCard prescriptions={prescriptions} />
</div>

{/* Row 3 */}
<div className="mt-6">
  <EmergencyContact emergencyContact={emergencyContact} />
</div>

      </main>

      <MedicalHistoryPopup
    open={medicalHistoryOpen}
    onClose={() => setMedicalHistoryOpen(false)}
    user={user}
    medicalHistory={medicalHistory}
    surgeries={surgeries}
    allergies={allergies}
    vaccinations={vaccinations}
/>

    </div>
  );
}