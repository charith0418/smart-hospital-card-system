import React, { useState } from 'react'
import Logo from "../assets/logo.png";
import { IoClose } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdLogout, MdLibraryBooks } from "react-icons/md";
import { FaHospitalUser } from "react-icons/fa";
import { BiQrScan } from "react-icons/bi";
import { LuHospital } from "react-icons/lu";
import { FaPrescriptionBottleMedical } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";

// Import your form component directly here
import RegisterPatient from "./RegisterPatient";

const DoctorSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Dashboard");

    const navItems = [
        { name: "Dashboard", icon: <MdOutlineDashboardCustomize /> },
        { name: "Register Patient", icon: <FaHospitalUser /> },
        { name: "Patients", icon: <BiQrScan /> },
        { name: "QR Generator", icon: <LuHospital /> },
        { name: "Print Card", icon: <MdLibraryBooks /> },
        { name: "Update Records", icon: <FaPrescriptionBottleMedical /> },
        { name: "Reports", icon: <TbReportSearch /> },
        { name: "Logout", icon: <MdLogout /> },
    ];

    return (
        <div className='flex bg-gray-100 h-screen w-full overflow-hidden'>
            {/* Sidebar View Container */}
            <div className={`fixed bg-[#078a72] w-64 h-screen shadow-lg ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static font-sans antialiased transition-transform duration-200 z-50`}>
                <div className='p-4 flex justify-between items-center border-b border-white/10'>
                    <div className='flex items-center space-x-2'>
                        <img src={Logo} alt='logo' className='w-10 h-10 object-contain'/>
                        <div className='text-white text-lg font-bold tracking-wide'>Medicare Hospital</div>
                    </div>
                    <button className='cursor-pointer text-white text-xl lg:hidden hover:bg-white/10 p-1 rounded' onClick={() => setSidebarOpen(false)}>
                        <IoClose />
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className='mt-4 p-4 space-y-1'>
                    {navItems.map((item) => {
                        const isActive = activeTab === item.name;
                        return (
                            <div 
                                key={item.name}
                                onClick={() => {
                                    setActiveTab(item.name);
                                    setSidebarOpen(false); // Auto-closes sidebar drawer on mobile tap
                                }}
                                className={`flex items-center p-3 cursor-pointer rounded-xl transition-all ${
                                    isActive 
                                        ? 'bg-white/20 text-white font-bold shadow-inner' 
                                        : 'text-white/80 hover:bg-white/10 hover:text-white font-medium'
                                }`}
                            > 
                                <div className='text-xl'>{item.icon}</div>
                                <div className='text-md ml-3 tracking-wide'>{item.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Dynamic View Panel (Header + Main Page Workspace) */}
            <div className='flex-1 flex flex-col min-w-0 overflow-y-auto'>
                {/* Navbar Header Component */}
                <header className='bg-white flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 z-40 shadow-sm'>
                    <div className='flex items-center space-x-3'>
                        <button className='p-2 text-xl font-bold lg:hidden text-gray-600 hover:bg-gray-100 rounded-lg' onClick={() => setSidebarOpen(true)}>
                            <FaBars />
                        </button>
                        {/* Dynamically displays the current active screen title */}
                        <h1 className='text-2xl font-bold text-gray-800 tracking-tight'>
                            {activeTab}
                        </h1>
                    </div>
                    <div className='bg-gray-300 w-10 h-10 rounded-full border border-gray-200 shadow-sm'></div>
                </header>

                {/* Main Content Workspace Body */}
                <main className='p-6 flex-1 bg-gray-50'>
                    {activeTab === "Dashboard" && (
                        <div className="p-4 text-gray-500 font-medium">
                            Welcome! This is your main Dashboard overview area.
                        </div>
                    )}
                    
                    {activeTab === "Register Patient" && (
                        <RegisterPatient />
                    )}

                    {activeTab === "Patients" && (
                        <div className="p-4 text-gray-500 font-medium">Patients list directory component...</div>
                    )}

                    {activeTab === "QR Generator" && (
                        <div className="p-4 text-gray-500 font-medium">QR code workspace generator component...</div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default DoctorSidebar;