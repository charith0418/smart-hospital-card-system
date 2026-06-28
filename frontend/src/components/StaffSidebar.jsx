import React, { useState } from "react";
import Logo from "../assets/logo.png";

import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdLogout, MdLibraryBooks } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { LuHospital } from "react-icons/lu";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { AiFillMedicineBox } from "react-icons/ai";
import { GiMedicines } from "react-icons/gi";

import RegistrationPatient from "./RegistrationPatient";

import StaffDashboard from "../components/StaffDashboard";

import Patients from "../components/Patients";
import ScanQR from "./ScanQR";

import Reports from "./Reports"

import Treatments from "./Treatments";

import Prescriptions from "./Prescription";
const StaffSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const navItems = [
    { name: "Dashboard", icon: <MdOutlineDashboardCustomize /> },
    { name: "Register Patient", icon: <FaHospitalUser /> },
    { name: "Patients", icon: <BiQrScan /> },
    { name: "Treatments", icon: <AiFillMedicineBox /> },
    { name: "Prescriptions", icon: <GiMedicines /> },
    { name: "QR Generator", icon: <LuHospital /> },
    { name: "Print Card", icon: <MdLibraryBooks /> },
    { name: "Update Records", icon: <FaPrescriptionBottleMedical /> },
    { name: "Reports", icon: <TbReportSearch /> },
    { name: "Logout", icon: <MdLogout /> },
  ];

  return (
    <div className="flex bg-gray-100 h-screen w-full overflow-hidden">

      {/* Sidebar */}
      <div
        className={`fixed bg-[#078a72] w-64 h-screen shadow-lg transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="p-4 flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="logo" className="w-10" />
            <h2 className="text-white font-bold">Medicare Hospital</h2>
          </div>

          <button
            className="lg:hidden text-white text-2xl"
            onClick={() => setSidebarOpen(false)}
          >
            <IoClose />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {navItems.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition ${
                activeTab === item.name
                  ? "bg-white/20 text-white"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">

        <header className="bg-white p-4 border-b flex justify-between items-center">
          <div className="flex items-center gap-3">

            <button
              className="lg:hidden text-xl"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars />
            </button>

            <h1 className="text-2xl font-bold">
              {activeTab}
            </h1>

          </div>

          <div className="w-10 h-10 rounded-full bg-gray-300"></div>
        </header>

        <main className="p-6 flex-1 bg-gray-50">

          {activeTab === "Dashboard" && (
           <StaffDashboard />
          )}

          {activeTab === "Register Patient" && (
            <RegistrationPatient />
          )}

          {activeTab === "Patients" && (
            <Patients />
          )}

           {activeTab === "Treatments" && (
            <Treatments />
          )}

          {activeTab === "Prescriptions" && (
            <Prescriptions />
          )}

          {activeTab === "QR Generator" && (
            <ScanQR/>
          )}

          {activeTab === "Print Card" && (
            <h2>Print Card</h2>
          )}

          {activeTab === "Update Records" && (
            <h2>Update Records</h2>
          )}

          {activeTab === "Reports" && (
            <Reports />
          )}

        </main>

      </div>

    </div>
  );
};

export default StaffSidebar;