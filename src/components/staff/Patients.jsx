import React, { useState, useEffect } from 'react';
import { FaSearch, FaEye, FaUserEdit, FaTimes } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const DUMMY_PATIENTS = [
  {
    patientId: "PT-8392",
    fullName: "Eleanor Vance",
    dob: "1994-08-12",
    bloodGroup: "A+",
    lastVisit: "2026-07-10",
    phone: "+1 (555) 234-5678",
    email: "eleanor.v@example.com",
    address: "742 Evergreen Terrace, Springfield"
  },
  {
    patientId: "PT-2048",
    fullName: "Marcus Sterling",
    dob: "1981-11-23",
    bloodGroup: "O-",
    lastVisit: "2026-06-28",
    phone: "+1 (555) 876-5432",
    email: "m.sterling@example.com",
    address: "104 Baker St, London"
  },
  {
    patientId: "PT-5712",
    fullName: "Amara Patel",
    dob: "2003-01-15",
    bloodGroup: "B+",
    lastVisit: "2026-07-02",
    phone: "+1 (555) 456-7890",
    email: "amara.patel@example.com",
    address: "456 Oak Avenue, Maplewood"
  },
  {
    patientId: "PT-9401",
    fullName: "Liam Nilsson",
    dob: "1965-04-30",
    bloodGroup: "AB-",
    lastVisit: "2026-05-14",
    phone: "+1 (555) 987-6543",
    email: "liam.nilsson@example.com",
    address: "89 Pine Boulevard, Seattle"
  },
  {
    patientId: "PT-3110",
    fullName: "Clara Zhang",
    dob: "1991-12-05",
    bloodGroup: "O+",
    lastVisit: "2026-07-12",
    phone: "+1 (555) 321-7654",
    email: "clara.z@example.com",
    address: "12 Cherry Lane, San Francisco"
  }
];

const calculateAge = (dob) => {
  if (!dob) return 'N/A';
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editPatient, setEditPatient] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patients`);
        if (!response.ok) throw new Error("API not responding");
        const data = await response.json();
        setPatients(data.length > 0 ? data : DUMMY_PATIENTS);
      } catch (error) {
        console.warn('Using fallback dummy data:', error);
        setPatients(DUMMY_PATIENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const filtered = patients.filter(p =>
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setPatients(prev => prev.map(p => p.patientId === editPatient.patientId ? editPatient : p));
    setEditPatient(null);
  };

  return (
    <div className="space-y-6 w-full text-[#1e293b]">
      
      {/* Search Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        <div className="w-full max-w-md bg-white p-3 rounded-2xl shadow-xs border border-slate-200 flex items-center focus-within:border-[#078a72] focus-within:ring-2 focus-within:ring-[#078a72]/10 transition-all">
          <div className="text-slate-400 px-3 text-lg"><FaSearch /></div>
          <input
            type="text"
            placeholder="Search patients by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent py-1 outline-hidden text-base text-slate-800 placeholder-slate-400"
          />
        </div>
        <div className="text-base font-semibold text-slate-500">
          Showing <span className="text-[#078a72] font-bold text-lg">{filtered.length}</span> patient profiles
        </div>
      </div>

      {/* Main Table Card (Full Screen) */}
      <div className="w-full bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-20 text-center">
              <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-[#078a72] rounded-full animate-spin mb-4"></div>
              <p className="text-slate-400 font-semibold text-base">Loading patients list...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-20 text-center">
              <p className="text-slate-400 font-semibold text-lg">No patients match your search criteria.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-sm font-bold uppercase tracking-wider text-slate-500/80">
                  <th className="p-6 pl-8">Patient ID</th>
                  <th className="p-6">Name</th>
                  <th className="p-6">Age</th>
                  <th className="p-6">Blood Group</th>
                  <th className="p-6">Last Visit</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-base divide-y divide-slate-100 font-medium text-slate-700">
                {filtered.map((p) => (
                  <tr key={p.patientId} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-6 pl-8 text-[#078a72] font-bold font-mono tracking-tight text-lg">{p.patientId}</td>
                    <td className="p-6">
                      <div>
                        <p className="text-slate-900 font-bold text-lg">{p.fullName}</p>
                        <p className="text-sm text-slate-400 font-normal mt-0.5">{p.email || 'No email provided'}</p>
                      </div>
                    </td>
                    <td className="p-6 text-slate-600 font-semibold text-lg">{calculateAge(p.dob)} Yrs</td>
                    <td className="p-6">
                      <span className="bg-rose-50 text-rose-600 border border-rose-100 px-3 py-1.5 rounded-xl font-mono font-bold text-sm">
                        {p.bloodGroup || 'N/A'}
                      </span>
                    </td>
                    <td className="p-6 text-slate-500 font-medium text-sm">
                      {p.lastVisit ? new Date(p.lastVisit).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A'}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center space-x-3">
                        <button 
                          onClick={() => setSelectedPatient(p)}
                          className="text-[#078a72] hover:bg-[#078a72]/10 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <FaEye className="text-base" />
                          <span className="text-sm font-bold">View</span>
                        </button>
                        <button 
                          onClick={() => setEditPatient({ ...p })}
                          className="text-slate-500 hover:bg-slate-100 p-2.5 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                        >
                          <FaUserEdit className="text-base" />
                          <span className="text-sm font-bold">Edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ==================== VIEW DETAILS MODAL ==================== */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#078a72] p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md">Patient File</span>
                <h3 className="text-2xl font-black mt-1.5">{selectedPatient.fullName}</h3>
              </div>
              <button onClick={() => setSelectedPatient(null)} className="text-white/80 hover:text-white text-2xl cursor-pointer">
                <FaTimes />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Patient ID</p>
                  <p className="font-bold font-mono text-slate-800 text-lg mt-0.5">{selectedPatient.patientId}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Blood Group</p>
                  <p className="font-bold text-rose-600 text-lg mt-0.5">{selectedPatient.bloodGroup}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Date of Birth</p>
                  <p className="font-bold text-slate-800 text-lg mt-0.5">{selectedPatient.dob}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Age</p>
                  <p className="font-bold text-slate-800 text-lg mt-0.5">{calculateAge(selectedPatient.dob)} Years</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Phone</p>
                  <p className="font-bold text-slate-800 text-lg mt-0.5">{selectedPatient.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Email Address</p>
                <p className="font-semibold text-slate-800 text-base mt-0.5">{selectedPatient.email || 'N/A'}</p>
              </div>
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Residential Address</p>
                <p className="font-semibold text-slate-800 text-base mt-0.5">{selectedPatient.address || 'N/A'}</p>
              </div>
            </div>

            <div className="bg-slate-50 p-5 flex justify-end">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="px-6 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-base rounded-xl transition cursor-pointer"
              >
                Close File
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== EDIT RECORD MODAL ==================== */}
      {editPatient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <form onSubmit={handleEditSubmit} className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#078a72] p-6 text-white flex justify-between items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-md">Modify Record</span>
                <h3 className="text-2xl font-black mt-1.5">Edit Patient</h3>
              </div>
              <button type="button" onClick={() => setEditPatient(null)} className="text-white/80 hover:text-white text-2xl cursor-pointer">
                <FaTimes />
              </button>
            </div>
            
            <div className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  value={editPatient.fullName}
                  onChange={e => setEditPatient(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Blood Group</label>
                  <select 
                    value={editPatient.bloodGroup}
                    onChange={e => setEditPatient(prev => ({ ...prev, bloodGroup: e.target.value }))}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Phone Number</label>
                  <input 
                    type="tel" 
                    value={editPatient.phone}
                    onChange={e => setEditPatient(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Date of Birth</label>
                <input 
                  type="date" 
                  value={editPatient.dob}
                  onChange={e => setEditPatient(prev => ({ ...prev, dob: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Email Address</label>
                <input 
                  type="email" 
                  value={editPatient.email}
                  onChange={e => setEditPatient(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800"
                />
              </div>

              <div>
                <label className="text-xs text-slate-500 uppercase font-bold tracking-wider">Home Address</label>
                <textarea 
                  value={editPatient.address}
                  onChange={e => setEditPatient(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full mt-1.5 px-4 py-3 rounded-xl border border-slate-200 focus:border-[#078a72] outline-hidden text-base font-semibold text-slate-800 h-24 resize-none"
                />
              </div>
            </div>

            <div className="bg-slate-50 p-5 flex justify-end space-x-3">
              <button 
                type="button"
                onClick={() => setEditPatient(null)}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-base rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-6 py-3 bg-[#078a72] hover:bg-[#06735f] text-white font-bold text-base rounded-xl transition cursor-pointer shadow-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default Patients;