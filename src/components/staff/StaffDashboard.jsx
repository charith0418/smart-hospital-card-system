import React, { useState, useEffect } from 'react';
import { FaSearch, FaQrcode, FaFileMedical, FaPrescription, FaUserCheck, FaTimes, FaCalendarAlt, FaStethoscope, FaUserMd, FaClock, FaCapsules, FaPrint, FaPlusSquare, FaPhoneAlt } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const StaffDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showMedicalCards, setShowMedicalCards] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live database records automatically on load with Auth headers
  useEffect(() => {
    const fetchLiveRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/patients`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error("Failed connecting to internal medical API");
        const data = await response.json();
        
        // Match schema outputs cleanly into local state variables
        const normalized = data.map(p => ({
          id: p.patientId || p._id.substring(18).toUpperCase(),
          _id: p._id,
          name: p.fullName || "Registered Patient",
          nic: p.nic || "N/A",
          dob: p.dob ? p.dob.split('T')[0] : "N/A",
          gender: p.gender || "Not Specified",
          phone: p.phone || "N/A",
          bloodGroup: p.bloodGroup || "N/A",
          date: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "Recent"
        }));
        
        setPatients(normalized);
      } catch (err) {
        console.error("Database connection error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveRecords();
  }, []);

  // 2. Real-time state search filters through database arrays 
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }
    
    const filtered = patients.filter(p => 
      p.name.toLowerCase().includes(value.toLowerCase()) || 
      p.id.toLowerCase().includes(value.toLowerCase()) ||
      p.nic.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient);
    setSearchQuery("");
    setSearchResults([]);
    setShowMedicalCards(false); 
  };

  return (
    <div className="w-full min-h-screen bg-slate-50/50 text-slate-800 p-6 lg:p-10 space-y-8">
      
      {/* ==================== 1. FULL SCREEN SCANNER CONSOLE ==================== */}
      <div className="w-full bg-white p-6 lg:p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/10 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative overflow-hidden print:hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 opacity-60" />
        <div className="flex items-center gap-6 text-left">
          <div className="p-5 bg-emerald-50 text-[#078a72] rounded-xl text-4xl shadow-2xs shrink-0 ring-4 ring-emerald-500/5">
            <FaQrcode className="animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-black text-slate-950 tracking-wide">Automated Smart Card Scanner</h2>
            <p className="text-sm lg:text-base text-slate-500 mt-1 max-w-2xl">
              Awaiting incoming hardware sequence transmission. Place the patient's physical smart card or digital identification barcode under the reader array.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 bg-emerald-600/10 text-emerald-800 border border-emerald-200/60 rounded-xl font-bold text-xs tracking-wide uppercase shadow-2xs whitespace-nowrap">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping inline-block mr-1" /> Active Scanner Ready
        </div>
      </div>

      {/* ==================== 2. PROMINENT FULL-WIDTH SEARCH SYSTEM ==================== */}
      <div className="w-full bg-white p-6 lg:p-8 rounded-2xl border border-slate-200 relative shadow-xs print:hidden">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 block text-left">
          Manual Medical Registry Database Lookup
        </label>
        <div className="flex w-full bg-slate-50 rounded-xl border border-slate-200 overflow-hidden focus-within:ring-2 focus-within:ring-[#078a72] transition-all">
          <input 
            type="text" 
            placeholder="Type patient registration ID number, full identity name, or national card numbers..." 
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-transparent px-5 py-4 outline-hidden text-base font-medium placeholder-slate-400 text-slate-950"
          />
          <button className="bg-[#078a72] hover:bg-[#056b58] text-white px-8 flex items-center justify-center text-lg gap-2 font-bold transition-colors">
            <FaSearch /> <span className="hidden sm:inline text-sm tracking-wide">Search</span>
          </button>
        </div>

        {/* FULL-WIDTH DROPDOWN RESULTS */}
        {searchResults.length > 0 && (
          <div className="absolute top-[120px] left-6 right-6 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-72 overflow-y-auto">
            {searchResults.map((p) => (
              <div key={p.id} onClick={() => handleSelectPatient(p)} className="flex items-center justify-between p-4 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-none transition">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-slate-200 text-[#078a72] flex items-center justify-center font-bold text-lg border border-slate-300">
                    {p.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <h4 className="text-base font-bold text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">{p.id} • NIC Account: {p.nic}</p>
                  </div>
                </div>
                <span className="text-xs font-bold bg-[#078a72]/10 text-[#078a72] px-4 py-1.5 rounded-md tracking-wide">Load Account</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ==================== 3. ACTIVE PATIENT QUICK-BAR ==================== */}
      {selectedPatient && (
        <div className="w-full bg-slate-900 border border-slate-800 p-5 rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn print:hidden">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full ring-2 ring-emerald-500 bg-slate-800 text-white flex items-center justify-center font-bold text-xl">
              {selectedPatient.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white tracking-wide">{selectedPatient.name}</h3>
                <span className="text-[10px] font-mono bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded border border-slate-700">{selectedPatient.id}</span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                NIC: {selectedPatient.nic} • DOB: {selectedPatient.dob} • Group: <span className="font-bold text-emerald-400">{selectedPatient.bloodGroup}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button onClick={() => setShowMedicalCards(!showMedicalCards)} className="flex-1 sm:flex-none px-5 py-2.5 bg-[#078a72] hover:bg-[#056b58] text-white font-bold text-xs rounded-lg shadow-sm transition flex items-center justify-center gap-2 tracking-wide">
              <FaUserCheck /> {showMedicalCards ? "Show Card View" : "Load Clinical History"}
            </button>
            <button onClick={() => { setSelectedPatient(null); setShowMedicalCards(false); }} className="p-3 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition text-sm">
              <FaTimes />
            </button>
          </div>
        </div>
      )}

      {/* ==================== 4. EXPANDED USER FRIENDLY SMART CARD ==================== */}
      {selectedPatient && !showMedicalCards && (
        <div className="w-full flex flex-col items-center justify-center animate-fadeIn print:p-0">
          <div id="printable-health-card" className="w-[500px] h-[300px] bg-gradient-to-br from-[#1C4E80] to-[#0A2540] text-white rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-slate-950 transition-all duration-300">
            <div className="absolute -right-4 -top-4 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-center border-b border-white/10 pb-3 z-10">
              <div className="flex items-center gap-3">
                <FaPlusSquare className="text-2xl text-emerald-400" />
                <div className="text-left">
                  <h1 className="text-sm font-black tracking-widest uppercase leading-none">Medicare Health Network</h1>
                  <p className="text-[9px] text-slate-400 uppercase font-semibold mt-1 tracking-wider">Secure Identification Profile</p>
                </div>
              </div>
              <span className="bg-red-500/20 text-red-300 border border-red-500/30 font-black text-[10px] px-3 py-1 rounded-md tracking-wide">EMERGENCY DATA</span>
            </div>

            <div className="flex flex-1 items-center justify-between gap-6 py-4 z-10 text-left">
              <div className="flex-1 space-y-4">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Full Registered Name</p>
                  <h2 className="text-lg font-bold truncate max-w-[260px] text-white mt-0.5 tracking-wide">{selectedPatient.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Patient File ID</p>
                    <p className="text-sm font-mono font-bold tracking-wider mt-0.5">{selectedPatient.id}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase font-bold tracking-widest">Blood Type</p>
                    <p className="text-base font-black text-emerald-400 mt-0.5">{selectedPatient.bloodGroup}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-2 rounded-2xl shrink-0 shadow-lg border border-slate-200/20">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&color=0A2540&data=${selectedPatient.id}`} alt="QR Verification" className="w-24 h-24" />
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex items-center justify-between z-10 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <FaPhoneAlt className="text-[10px] text-emerald-400" />
                <span className="text-[10px] tracking-wide text-slate-400">ICE Contact:</span>
                <span className="font-bold font-mono tracking-wide">{selectedPatient.phone}</span>
              </div>
              <span className="text-[9px] font-mono opacity-40 tracking-widest">ISO CR-80 COMPLIANT</span>
            </div>
          </div>

          <button onClick={() => window.print()} className="w-[500px] mt-6 py-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition shadow-md flex items-center justify-center gap-2 print:hidden cursor-pointer tracking-wide">
            <FaPrint /> Print Smart Health Card Architecture
          </button>
        </div>
      )}

      {/* ==================== 5. TREATMENT RECORD LOGS ==================== */}
      {selectedPatient && showMedicalCards && (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slideUp w-full text-left">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
              <FaFileMedical className="text-xl text-slate-500" />
              <h3 className="font-bold text-slate-900 text-base">Clinical Treatment History Log</h3>
            </div>
            <div className="border border-slate-100 rounded-lg p-4 bg-slate-50/60 space-y-3">
              <div className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                <FaCalendarAlt /> Date Outpatient: 2026-05-10
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase">Diagnosis</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1"><FaStethoscope className="text-xs text-slate-400" /> Severe Viral Fever</span>
                </div>
                <div>
                  <span className="text-[10px] block font-bold text-slate-400 uppercase">Consultant</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1"><FaUserMd className="text-xs text-slate-400" /> Dr. Asela Perera</span>
                </div>
              </div>
              <div className="bg-white p-3 rounded border-l-4 border-emerald-600 text-xs text-slate-600 shadow-2xs">
                Recommended 3 days complete bed rest. Avoid cold foods.
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100 mb-4">
              <FaPrescription className="text-xl text-slate-500" />
              <h3 className="font-bold text-slate-900 text-base">Active Pharmaceutical Items</h3>
            </div>
            <div className="divide-y divide-slate-100 border border-slate-200 rounded-lg overflow-hidden">
              {[
                { name: "Tab. Paracetamol 500mg", instruction: "3 Times a Day (TDS) — After Meals", duration: "3 DAYS" },
                { name: "Cap. Amoxicillin 500mg", instruction: "Twice a Day (BD) — Morning & Night", duration: "5 DAYS" }
              ].map((drug, idx) => (
                <div key={idx} className="p-4 bg-white flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <FaCapsules className="text-lg text-slate-400" />
                    <div>
                      <h4 className="font-bold text-slate-900">{drug.name}</h4>
                      <p className="text-slate-500 text-xs mt-0.5">{drug.instruction}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono bg-slate-100 font-bold text-slate-700 px-3 py-1.5 rounded flex items-center gap-1">
                    <FaClock /> {drug.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================== 6. BASELINE RECENT LOGS VIEW ==================== */}
      {!selectedPatient && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 w-full text-left print:hidden shadow-xs">
          <h3 className="text-xs font-bold mb-4 text-slate-400 uppercase tracking-wider">Recent Active Sessions</h3>
          {loading ? (
            <div className="py-10 text-center text-slate-400 font-medium">
              Loading current database profiles...
            </div>
          ) : patients.length === 0 ? (
            <div className="py-10 text-center text-slate-400 font-medium">
              No medical database patient entries detected.
            </div>
          ) : (
            <div className="space-y-2">
              {patients.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-lg border border-transparent hover:border-slate-100 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 text-[#078a72] flex items-center justify-center font-black">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-800">{p.name}</h4>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{p.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-slate-400 font-medium">{p.date}</span>
                    <button onClick={() => handleSelectPatient(p)} className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer tracking-wide">
                      Load Records
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StaffDashboard;