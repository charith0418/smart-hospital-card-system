import React, { useState } from 'react';
import { MdLibraryBooks } from "react-icons/md";
import { FaUserEdit, FaUsers } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";

const RegistrationPatient = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    phone: '',
    address: ''
  });

  const [generatedPatientId, setGeneratedPatientId] = useState("P10025");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting registration...", formData);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      
      {/* Upper Section: Two Column Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Card: Patient Registration Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-5">Patient Registration</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                <input type="text" name="fullName" placeholder="Enter full name" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">NIC / ID Number</label>
                <input type="text" name="nic" placeholder="Enter NIC or ID" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all" required />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" name="dob" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all text-gray-500" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Gender</label>
                  <select name="gender" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all text-gray-500" required>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number</label>
                <input type="tel" name="phone" placeholder="Enter phone number" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Address</label>
                <input type="text" name="address" placeholder="Enter address" onChange={handleChange} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-hidden transition-all" />
              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="px-6 py-2.5 bg-[#078a72] text-white font-medium rounded-xl hover:bg-[#06735f] shadow-xs transition-colors cursor-pointer">
                  Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Card: QR Code Generation View */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 flex flex-col items-center justify-between text-center">
          <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-left">QR Code Generation</h2>
            
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 rounded-2xl bg-gray-50 max-w-[240px] mx-auto">
              <div className="w-36 h-36 bg-white p-2 shadow-xs rounded-xl flex items-center justify-center border border-gray-100">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${generatedPatientId}`} 
                  alt="Patient QR Code" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="mt-5 inline-block px-6 py-2 bg-gray-50 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 tracking-wide">
              Patient ID: <span className="text-[#078a72]">{generatedPatientId}</span>
            </div>
          </div>

          <button type="button" className="w-full mt-6 py-2.5 bg-[#078a72] text-white font-semibold rounded-xl hover:bg-[#06735f] transition-all shadow-xs cursor-pointer">
            Download QR
          </button>
        </div>

      </div>

      {/* Lower Section: Quick Actions Panel */}
      <div className="bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
        <h3 className="text-md font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl text-xl"><MdLibraryBooks /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">Print Patient Card</p>
              <p className="text-[10px] text-gray-400 font-medium">Print new card</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-2.5 bg-emerald-50 text-[#078a72] rounded-xl text-xl"><FaUserEdit /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">Update Patient</p>
              <p className="text-[10px] text-gray-400 font-medium">Update information</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl text-xl"><FaUsers /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">View Patients</p>
              <p className="text-[10px] text-gray-400 font-medium">Manage patients</p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl text-xl"><TbReportSearch /></div>
            <div>
              <p className="text-xs font-bold text-gray-800">Reports</p>
              <p className="text-[10px] text-gray-400 font-medium">Generate reports</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default RegistrationPatient;