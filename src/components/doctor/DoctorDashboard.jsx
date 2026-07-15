import React, { useState } from "react";
import { 
  FaQrcode, FaSearch, FaHistory, FaUserMd, 
  FaStethoscope, FaPrescriptionBottleAlt, FaClock, FaTimes, FaCapsules, 
  FaPlus, FaTrashAlt, FaCheckCircle, FaExclamationTriangle 
} from "react-icons/fa";
import DoctorSidebar from "./DoctorSidebar";
import DoctorNavbar from "./DoctorNavbar";

// Mock Database for Patient ID lookup
const mockPatients = {
  "P10024": {
    id: "P10024",
    name: "John Doe",
    age: "28",
    gender: "Male",
    bloodGroup: "O+",
    phone: "0771234567",
    allergies: ["Penicillin", "Peanuts"],
    history: [
      { date: "2026-04-15", diagnosis: "Chronic Sinusitis", doctor: "Dr. K. Perera", notes: "Patient reported severe headaches and nasal congestion for over 2 weeks." }
    ],
    treatments: [
      { date: "2026-05-10", condition: "Severe Viral Fever", consultant: "Dr. Asela Perera (OPD)", advice: "Recommended 3 days complete bed rest." }
    ],
    prescriptions: [
      { drug: "Tab. Paracetamol 500mg", dosage: "3 Times a Day (TDS)", duration: "3 DAYS" }
    ]
  },
  "P10018": {
    id: "P10018",
    name: "Chanchala Madhushani",
    age: "31",
    gender: "Female",
    bloodGroup: "A+",
    phone: "0719876543",
    allergies: ["Sulfa Drugs", "NSAIDs"],
    history: [
      { date: "2026-02-18", diagnosis: "Migraine Aura", doctor: "Dr. N. Fernando", notes: "Frequent stress-induced triggers." }
    ],
    treatments: [
      { date: "2026-05-20", condition: "Allergic Bronchitis", consultant: "Dr. Asela Perera (OPD)", advice: "Avoid dust exposures." }
    ],
    prescriptions: [
      { drug: "Tab. Cetirizine 10mg", dosage: "Night Only (OD)", duration: "7 DAYS" }
    ]
  }
};

const drugFormulary = [
  "Tab. Paracetamol 500mg",
  "Cap. Amoxicillin 500mg",
  "Tab. Cetirizine 10mg",
  "Tab. Metformin 500mg",
  "Tab. Atorvastatin 20mg",
  "Syr. Amoxicillin 125mg/5ml",
  "Inhaler Salbutamol 100mcg",
  "Tab. Omeprazole 20mg",
  "Tab. Losartan Potassium 50mg",
  "Tab. Ciprofloxacin 500mg"
];

const standardDosages = ["Once a Day (OD)", "Twice a Day (BD)", "Three Times a Day (TDS)", "Four Times a Day (QDS)", "When Needed (PRN)"];
const standardDurations = ["3 DAYS", "5 DAYS", "7 DAYS", "14 DAYS", "1 MONTH", "2 MONTHS"];

export default function DoctorDashboard({ onLogout, loggedInDoctor = { name: "Dr. Asela Perera", id: "DOC-9941" } }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Patient Search States
  const [searchId, setSearchId] = useState("");
  const [activePatient, setActivePatient] = useState(null);
  const [searchError, setSearchError] = useState("");

  // Linked Treatment & Prescription Workspace States
  const [treatmentNotes, setTreatmentNotes] = useState("");
  const [diagnosedCondition, setDiagnosedCondition] = useState("");
  const [newAllergies, setNewAllergies] = useState(""); 
  
  // Prescription Auto-complete States
  const [drugSearch, setDrugSearch] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedDosage, setSelectedDosage] = useState("Three Times a Day (TDS)");
  const [selectedDuration, setSelectedDuration] = useState("3 DAYS");
  const [currentPrescriptionList, setCurrentPrescriptionList] = useState([]);

  // Filtering Formulary
  const filteredDrugs = drugSearch.trim() === "" ? [] : drugFormulary.filter(drug => 
    drug.toLowerCase().includes(drugSearch.toLowerCase()) && drug !== selectedDrug
  );

  const handlePatientSearch = (e) => {
    if (e) e.preventDefault();
    const idUpper = searchId.trim().toUpperCase();
    
    if (mockPatients[idUpper]) {
      setActivePatient(mockPatients[idUpper]);
      setSearchError("");
      setTreatmentNotes("");
      setDiagnosedCondition("");
      setNewAllergies("");
      setCurrentPrescriptionList([]);
    } else {
      setActivePatient(null);
      setSearchError("Patient ID not found in database registry.");
    }
  };

  const addDrugToPrescription = () => {
    if (!selectedDrug) return;
    
    const newEntry = {
      drug: selectedDrug,
      dosage: selectedDosage,
      duration: selectedDuration
    };

    setCurrentPrescriptionList([...currentPrescriptionList, newEntry]);
    setSelectedDrug("");
    setDrugSearch("");
  };

  const removeDrugFromPrescription = (indexToRemove) => {
    setCurrentPrescriptionList(currentPrescriptionList.filter((_, index) => index !== indexToRemove));
  };

  const handleSaveConsultation = () => {
    const consultationPayload = {
      patientId: activePatient.id,
      date: new Date().toISOString().split('T')[0],
      doctorName: loggedInDoctor.name, 
      doctorId: loggedInDoctor.id,     
      diagnosis: diagnosedCondition,
      notes: treatmentNotes,
      newAllergies: newAllergies ? newAllergies.split(",").map(a => a.trim()) : [],
      prescriptions: currentPrescriptionList 
    };

    console.log("Sending structured data to Backend Payload:", consultationPayload);
    alert(`Consultation and Prescriptions saved and signed digitally by ${loggedInDoctor.name}!`);
    clearActivePatient();
  };

  const clearActivePatient = () => {
    setActivePatient(null);
    setSearchId("");
    setSearchError("");
    setCurrentPrescriptionList([]);
  };

  const renderDoctorContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-10 animate-fadeIn w-full">
            
            {/* INITIAL LANDING: SEARCH AND SCAN ENTRY */}
            {!activePatient && (
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch w-full pt-6">
                <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-center">
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Patient Database Lookup</h3>
                  <form onSubmit={handlePatientSearch} className="flex gap-4">
                    <div className="flex bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden focus-within:border-[#078a72] transition-all flex-1">
                      <input 
                        type="text" 
                        placeholder="Enter Patient ID Code (e.g., P10024, P10018)..." 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full bg-transparent px-6 py-4 outline-none text-xl font-bold placeholder-slate-400"
                      />
                    </div>
                    <button type="submit" className="bg-[#078a72] hover:bg-[#056b58] text-white px-10 rounded-xl text-xl font-black shadow-md flex items-center gap-3 transition-colors cursor-pointer">
                      <FaSearch /> View
                    </button>
                  </form>
                  {searchError && <p className="text-red-600 font-bold text-base mt-3 ml-2">⚠️ {searchError}</p>}
                </div>
                
                <div className="w-full">
                  <div 
                    onClick={() => { setSearchId("P10024"); setTimeout(() => handlePatientSearch(), 100); }} 
                    className="bg-white border-3 border-dashed border-[#078a72] bg-emerald-50/10 p-8 rounded-2xl shadow-xs text-center h-full flex flex-col justify-center items-center group cursor-pointer hover:bg-emerald-50/40 transition-all duration-300"
                  >
                    <h3 className="text-slate-900 font-black mb-3 text-xl tracking-wide">Scan Patient Card</h3>
                    <div className="w-20 h-20 bg-[#078a72]/10 rounded-2xl flex items-center justify-center text-[#078a72] text-4xl animate-pulse group-hover:scale-110 transition-transform">
                      <FaQrcode />
                    </div>
                    <p className="text-sm font-black text-slate-400 mt-4 uppercase tracking-widest group-hover:text-[#078a72]">
                      Launch Camera Scanner
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* LIVE SYSTEM INTEGRATED WORKSPACE */}
            {activePatient && (
              <div className="space-y-8 animate-slideUp w-full">
                
                {/* ACTIVE PATIENT INFOBAR */}
                <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-xl bg-[#078a72] font-black text-2xl flex items-center justify-center border border-white/10 uppercase">
                      {activePatient.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-3xl font-black tracking-tight">{activePatient.name}</h2>
                      <p className="text-base text-slate-300 font-medium mt-1 flex flex-wrap items-center gap-2">
                        ID: <span className="font-mono font-bold text-[#078a72] bg-white/10 px-2 py-0.5 rounded text-sm">{activePatient.id}</span> • Age: {activePatient.age} • Gender: {activePatient.gender} • Blood Group: <span className="text-amber-400 font-black">{activePatient.bloodGroup}</span>
                        {activePatient.allergies && activePatient.allergies.length > 0 && (
                          <span className="ml-2 bg-red-600/20 text-red-400 border border-red-500/30 px-2.5 py-0.5 rounded-md text-xs font-black flex items-center gap-1 uppercase tracking-wider">
                            <FaExclamationTriangle /> Severe Allergies Configured
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs bg-slate-800 text-slate-400 px-3 py-2 rounded-lg font-bold border border-slate-700">
                      🟢 Attending Doctor: {loggedInDoctor.name}
                    </span>
                    <button 
                      onClick={clearActivePatient} 
                      className="p-3 bg-white/10 text-white hover:bg-red-600 rounded-xl transition text-sm cursor-pointer flex items-center gap-2 font-bold"
                    >
                      <FaTimes /> Close File
                    </button>
                  </div>
                </div>

                {/* THE 2-COLUMN HUB SPREAD */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
                  
                  {/* WORKSPACE SIDE: COALESCED TREATMENT AND MEDICATION BUILDER */}
                  <div className="lg:col-span-2 space-y-8">
                    
                    {/* TREATMENT DESIGN SYSTEM COMPONENT */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <FaStethoscope className="text-[#078a72] text-2xl" />
                        <h4 className="text-2xl font-black text-slate-900">Clinical Treatment & Findings</h4>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-black text-slate-500 uppercase tracking-wider mb-2">Primary Diagnosis</label>
                            <input 
                              type="text" 
                              placeholder="e.g., Acute Pharyngitis..."
                              value={diagnosedCondition}
                              onChange={(e) => setDiagnosedCondition(e.target.value)}
                              className="w-full bg-slate-50 rounded-xl border-2 border-slate-200 px-5 py-3.5 text-lg font-bold outline-none focus:border-[#078a72] transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-black text-red-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                              <FaExclamationTriangle /> Record Newly Noted Allergies
                            </label>
                            <input 
                              type="text" 
                              placeholder="Type allergy triggers..."
                              value={newAllergies}
                              onChange={(e) => setNewAllergies(e.target.value)}
                              className="w-full bg-red-50/10 rounded-xl border-2 border-red-200 focus:border-red-500 px-5 py-3.5 text-lg font-bold outline-none transition-colors text-red-700 placeholder-red-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-black text-slate-500 uppercase tracking-wider mb-2">Clinical Notes & Management Advice</label>
                          <textarea 
                            rows="3"
                            placeholder="Type internal medical checkup notes or home rest directives..."
                            value={treatmentNotes}
                            onChange={(e) => setTreatmentNotes(e.target.value)}
                            className="w-full bg-slate-50 rounded-xl border-2 border-slate-200 px-5 py-4 text-base font-medium outline-none focus:border-[#078a72] transition-colors resize-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* MEDICATION SCRIPT BUILDER COMPONENT */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-6">
                      <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                        <FaPrescriptionBottleAlt className="text-[#078a72] text-2xl" />
                        <h4 className="text-2xl font-black text-slate-900">Prescription Formulation Hub</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 relative">
                        <div>
                          <label className="block text-sm font-black text-slate-500 uppercase tracking-wider mb-2">Search Medication Formulary</label>
                          <div className="flex bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden items-center px-4 focus-within:border-[#078a72]">
                            <FaCapsules className="text-slate-400 text-xl" />
                            <input 
                              type="text" 
                              placeholder="Type brand or generic name..."
                              value={drugSearch}
                              onChange={(e) => setDrugSearch(e.target.value)}
                              className="w-full bg-transparent px-4 py-3.5 text-lg font-bold outline-none"
                            />
                          </div>
                          
                          {filteredDrugs.length > 0 && (
                            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto z-50 divide-y divide-slate-100">
                              {filteredDrugs.map((drug, idx) => (
                                <div 
                                  key={idx}
                                  onClick={() => { setSelectedDrug(drug); setDrugSearch(drug); }}
                                  className="px-6 py-3.5 text-base font-bold text-slate-800 hover:bg-emerald-50 hover:text-[#078a72] cursor-pointer transition-colors"
                                >
                                  💊 {drug}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {selectedDrug && (
                        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-4 animate-fadeIn">
                          <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Selected: <span className="text-[#078a72] text-base font-black normal-case">{selectedDrug}</span></p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Directions / Frequency</label>
                              <select value={selectedDosage} onChange={(e) => setSelectedDosage(e.target.value)} className="w-full bg-white rounded-lg border border-slate-300 p-2.5 font-bold text-sm">
                                {standardDosages.map((d, i) => <option key={i} value={d}>{d}</option>)}
                              </select>
                            </div>
                            <div>
                              <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1.5">Period Duration</label>
                              <select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className="w-full bg-white rounded-lg border border-slate-300 p-2.5 font-bold text-sm">
                                {standardDurations.map((d, i) => <option key={i} value={d}>{d}</option>)}
                              </select>
                            </div>
                          </div>
                          <button type="button" onClick={addDrugToPrescription} className="w-full bg-[#078a72] hover:bg-[#056b58] text-white py-3 rounded-lg font-black text-base flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors">
                            <FaPlus /> Insert Medication Into List
                          </button>
                        </div>
                      )}

                      <div className="space-y-3">
                        <h5 className="text-sm font-black text-slate-400 uppercase tracking-wider">Current Session Script Output</h5>
                        {currentPrescriptionList.length === 0 ? (
                          <div className="text-center p-6 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-sm text-slate-400 font-bold">
                            No items added to prescription script yet.
                          </div>
                        ) : (
                          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 shadow-xs">
                            {currentPrescriptionList.map((med, index) => (
                              <div key={index} className="p-4 bg-white flex justify-between items-center gap-4 animate-fadeIn">
                                <div className="flex items-center gap-3">
                                  <div className="w-2.5 h-2.5 rounded-full bg-[#078a72]"></div>
                                  <div>
                                    <h6 className="font-black text-slate-900 text-base">{med.drug}</h6>
                                    <p className="text-xs text-slate-500 font-bold mt-0.5">{med.dosage} • <span className="text-[#078a72] font-mono">{med.duration}</span></p>
                                  </div>
                                </div>
                                <button onClick={() => removeDrugFromPrescription(index)} className="text-slate-300 hover:text-red-600 p-2 text-base transition-colors cursor-pointer">
                                  <FaTrashAlt />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-2">
                        <button 
                          onClick={handleSaveConsultation}
                          disabled={!diagnosedCondition && currentPrescriptionList.length === 0 && !newAllergies}
                          className="w-full py-4 bg-slate-900 text-white rounded-xl text-xl font-black shadow-md flex items-center justify-center gap-3 hover:bg-black transition-colors cursor-pointer disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
                        >
                          <FaCheckCircle /> Authorize & Save Medical Case File
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* SIDEBAR RIGHT SIDE: ALLERGIES AND CHRONIC TIMELINES */}
                  <div className="space-y-6">
                    <div className="bg-red-50/50 border border-red-200 p-6 rounded-2xl space-y-4 shadow-xs">
                      <div className="flex items-center gap-2 border-b border-red-100 pb-3 text-red-700">
                        <FaExclamationTriangle className="text-xl" />
                        <h4 className="text-lg font-black uppercase tracking-wider">Patient Allergies Vault</h4>
                      </div>
                      {activePatient.allergies && activePatient.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {activePatient.allergies.map((allergy, idx) => (
                            <span key={idx} className="bg-red-600 text-white font-black px-3 py-1.5 rounded-xl text-xs tracking-wide shadow-xs uppercase">
                              ⚠️ {allergy}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm font-bold text-slate-500">No known allergies documented.</p>
                      )}
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                        <FaHistory className="text-slate-400 text-xl" />
                        <h4 className="text-lg font-black text-slate-900">Historical Health Timeline</h4>
                      </div>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                        <p className="text-xs font-black uppercase tracking-wider text-slate-400">Past Diagnoses</p>
                        {activePatient.history.map((h, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-1 text-sm">
                            <div className="flex justify-between font-mono text-xs font-bold text-slate-400">
                              <span>📅 {h.date}</span>
                              <span className="text-[#078a72] font-bold">{h.doctor}</span>
                            </div>
                            <h5 className="font-black text-slate-900">{h.diagnosis}</h5>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1">{h.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>
        );
        
      default:
        return <div className="p-10 bg-white border border-slate-200 rounded-2xl shadow-md font-black text-2xl text-slate-800">Module View: {activeTab} Screen</div>;
    }
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden w-full relative text-slate-800">
      <DoctorSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen xl:pl-64">
        <DoctorNavbar setSidebarOpen={setSidebarOpen} activeTab={activeTab} />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-full mx-auto">
            {renderDoctorContent()}
          </div>
        </main>
      </div>
    </div>
  );
}