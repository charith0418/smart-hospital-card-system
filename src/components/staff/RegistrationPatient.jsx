import React, { useState } from 'react';
import { FaPlusSquare, FaPhoneAlt, FaPrint, FaDownload } from "react-icons/fa";

const RegistrationPatient = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nic: '',
    dob: '',
    gender: '',
    phone: '',
    address: '',
    bloodGroup: 'O+' // Added to support your card architecture template
  });

  const [generatedPatientId, setGeneratedPatientId] = useState("P10025");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting registration to medical database...", formData);
    setIsRegistered(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 text-slate-800 p-6 lg:p-10 space-y-8">
      
      {/* ==================== 1. FULL SCREEN UPPER SECTION GRID ==================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* 📋 PATIENT INTEL REGISTRATION INTERFACE */}
        <div className="xl:col-span-2 bg-white p-6 lg:p-8 rounded-2xl shadow-xs border border-slate-200 print:hidden">
          <div className="pb-4 border-b border-slate-100 mb-6 text-left">
            <h2 className="text-2xl font-black text-slate-950 tracking-wide">Hospital Admission Registry</h2>
            <p className="text-sm lg:text-base text-slate-500 mt-1">
              Input new patient demographics to initialize secure hardware identification access profiles.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Patient Full Name</label>
                <input 
                  type="text" 
                  name="fullName" 
                  value={formData.fullName}
                  placeholder="e.g. John Doe" 
                  onChange={handleChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                  required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">NIC / National ID Number</label>
                <input 
                  type="text" 
                  name="nic" 
                  value={formData.nic}
                  placeholder="Enter identity registration code" 
                  onChange={handleChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                  required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Phone Vector</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone}
                  placeholder="e.g. 0771234567" 
                  onChange={handleChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                  required 
                />
              </div>

              <div className="text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  value={formData.dob}
                  onChange={handleChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Gender</label>
                  <select 
                    name="gender" 
                    value={formData.gender}
                    onChange={handleChange} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                    required
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Blood Type</label>
                  <select 
                    name="bloodGroup" 
                    value={formData.bloodGroup}
                    onChange={handleChange} 
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                    required
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2 text-left">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Residential Street Address</label>
                <input 
                  type="text" 
                  name="address" 
                  value={formData.address}
                  placeholder="Enter physical residential locator details" 
                  onChange={handleChange} 
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-base text-slate-950 focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all" 
                />
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button type="submit" className="w-full sm:w-auto px-8 py-4 bg-[#078a72] hover:bg-[#056b58] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer tracking-wide">
                Register & Save to Database
              </button>
            </div>
          </form>
        </div>

        {/* ==================== 2. INTERACTIVE LIVE SMART CARD PREVIEW ==================== */}
        <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xs border border-slate-200 flex flex-col items-center justify-between text-center min-h-[580px]">
          <div className="w-full flex flex-col items-center">
            <div className="pb-4 border-b border-slate-100 mb-6 text-left w-full print:hidden">
              <h2 className="text-2xl font-black text-slate-950 tracking-wide">Live Card Matrix</h2>
              <p className="text-sm text-slate-500 mt-1">Real-time verification layout output generator</p>
            </div>
            
            {/* USER FRIENDLY LARGE SIZE LIVE DATA SMART CARD */}
            <div id="printable-health-card" className="w-[360px] sm:w-[420px] h-[260px] bg-gradient-to-br from-[#1C4E80] to-[#0A2540] text-white rounded-3xl p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-950 group transition-all duration-300">
              <div className="absolute -right-4 -top-4 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
              
              {/* Card Header */}
              <div className="flex justify-between items-center border-b border-white/10 pb-2.5 z-10">
                <div className="flex items-center gap-2.5">
                  <FaPlusSquare className="text-xl text-emerald-400" />
                  <div className="text-left">
                    <h1 className="text-xs font-black tracking-widest uppercase leading-none">Medicare Health Network</h1>
                    <p className="text-[8px] text-slate-400 uppercase font-semibold mt-0.5 tracking-wider">Secure Identification Profile</p>
                  </div>
                </div>
                <span className="bg-red-500/20 text-red-300 border border-red-500/30 font-black text-[8px] px-2 py-0.5 rounded tracking-wide">EMERGENCY DATA</span>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 items-center justify-between gap-4 py-3 z-10 text-left">
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Full Registered Name</p>
                    <h2 className="text-base font-bold truncate max-w-[200px] text-white mt-0.5 tracking-wide">
                      {formData.fullName || "Awaiting Registry Input"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Patient File ID</p>
                      <p className="text-xs font-mono font-bold tracking-wider mt-0.5 text-slate-200">{generatedPatientId}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">Blood Type</p>
                      <p className="text-sm font-black text-emerald-400 mt-0.5">{formData.bloodGroup}</p>
                    </div>
                  </div>
                </div>

                {/* QR Generation System Frame */}
                <div className="bg-white p-1.5 rounded-xl shrink-0 shadow-lg border border-slate-200/20">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&color=0A2540&data=${generatedPatientId}`} 
                    alt="Patient QR Code" 
                    className="w-16 h-16 sm:w-20 sm:h-20"
                  />
                </div>
              </div>

              {/* Card Footer */}
              <div className="border-t border-white/10 pt-2 flex items-center justify-between z-10 text-slate-300">
                <div className="flex items-center gap-1.5">
                  <FaPhoneAlt className="text-[9px] text-emerald-400" />
                  <span className="text-[9px] tracking-wide text-slate-400">ICE Contact:</span>
                  <span className="font-bold font-mono tracking-wide text-[10px] text-white">{formData.phone || "--- --- ----"}</span>
                </div>
                <span className="text-[8px] font-mono opacity-40 tracking-widest">ISO CR-80 COMPLIANT</span>
              </div>
            </div>

            <div className="mt-6 px-6 py-3 bg-slate-50 rounded-xl border border-slate-200 text-sm font-black text-slate-700 tracking-wide print:hidden">
              System Assigned Node ID: <span className="text-[#078a72] font-mono">{generatedPatientId}</span>
            </div>
          </div>

          {/* Action Trigger Handles */}
          <div className="w-full space-y-2 mt-6 print:hidden">
            <button 
              type="button" 
              onClick={handlePrint}
              disabled={!isRegistered}
              className={`w-full py-3.5 font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 tracking-wide ${
                isRegistered 
                  ? 'bg-slate-900 text-white hover:bg-black cursor-pointer shadow-md' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
              }`}
            >
              <FaPrint /> Print Secure Smart Card
            </button>
            <button 
              type="button" 
              disabled={!isRegistered}
              className={`w-full py-3 border font-bold text-xs rounded-xl transition flex items-center justify-center gap-2 tracking-wide ${
                isRegistered 
                  ? 'border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer shadow-xs' 
                  : 'border-transparent text-slate-300 cursor-not-allowed'
              }`}
            >
              <FaDownload /> Cache Local Manifest
            </button>
          </div>
        </div>
      </div>

      {/* CSS Print Stylesheet Injector Override */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #printable-health-card, #printable-health-card * { visibility: visible !important; }
          #printable-health-card {
            position: absolute !important;
            left: 50% !important;
            top: 40% !important;
            transform: translate(-50%, -50%) scale(1.4) !important;
            box-shadow: none !important;
            border: 1px solid #000000 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default RegistrationPatient;