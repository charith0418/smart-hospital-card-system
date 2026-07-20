import React, { useState } from "react";
import { 
  FaSearch, FaQrcode, FaExclamationTriangle, FaFileMedical, 
  FaTimes, FaStethoscope, FaPlus, FaPrescriptionBottleAlt, 
  FaCheckCircle, FaHistory, FaCapsules, FaTrashAlt
} from "react-icons/fa";

import DoctorNavbar from "./DoctorNavbar";
import DoctorSidebar from "./DoctorSidebar";
import MedicalHistory from "./MedicalHistory";
import MedicalHistoryPopup from "./MedicalHistoryPopup";
import PrescriptionsRecordsModal from "./PrescriptionPopup";

const mockPatients = {
  P10024: {
    id: "P10024",
    name: "Alexander Mercer",
    age: 27,
    gender: "Male",
    bloodGroup: "B+",
    dob: "15 May 1995",
    allergies: ["Penicillin", "Seafood", "Dust"],
    surgeries: [
      { name: "Appendectomy", doctor: "Dr. N. Silva", date: "12 Mar 2022" },
      { name: "Knee Arthroscopy", doctor: "Dr. K. Perera", date: "05 Aug 2020" }
    ],
    history: [
      { diagnosis: "Hypertension", doctor: "Dr. N. Silva", date: "12 Apr 2026", notes: "Reduce salt intake. Drink enough water. Visit again after one month." },
      { diagnosis: "Asthma", doctor: "Dr. K. Perera", date: "02 Feb 2026", notes: "Prescribed inhaler maintenance updates." },
      { diagnosis: "Diabetes Type II", doctor: "Dr. N. Silva", date: "18 Nov 2025", notes: "Routine glycemic control evaluation." }
    ],
    prescriptions: [
      {
        id: "RX-2026-001",
        doctor: "Dr. N. Silva",
        hospital: "National Hospital Colombo",
        date: "12 Apr 2026",
        diagnosis: "Hypertension",
        instructions: "Reduce salt intake. Drink enough water. Visit again after one month.",
        medicines: [
          { name: "Amlodipine 5mg", dosage: "1 Tablet", frequency: "Morning", duration: "30 Days" },
          { name: "Aspirin 75mg", dosage: "1 Tablet", frequency: "Night", duration: "30 Days" }
        ]
      }
    ]
  }
};

const hospitalFormulary = ["Amoxicillin 500mg", "Azithromycin 250mg", "Ibuprofen 400mg", "Paracetamol 500mg", "Omeprazole 20mg", "Cetirizine 10mg"];
const standardDosages = ["Take 1 capsule every 8 hours (TID)", "Take 1 tablet daily in morning (QD)", "Take 1 tablet every 12 hours (BID)"];
const standardDurations = ["5 Days Course", "7 Days Course", "30 Days Chronic Refill"];

export default function DoctorDashboard({ onLogout }) {
  // Simulating logged-in doctor profile data (Replace with global auth state / context props as needed)
  const [currentDoctor, setCurrentDoctor] = useState({
    id: 101,
    name: "Dr. N. Silva",
    specialty: "Cardiologist"
  });

  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchId, setSearchId] = useState("");
  const [activePatient, setActivePatient] = useState(null);
  const [searchError, setSearchError] = useState("");

  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [showMedicalHistoryPopup, setShowMedicalHistoryPopup] = useState(false);
  const [showRxPopup, setShowRxPopup] = useState(false);

  const [diagnosedCondition, setDiagnosedCondition] = useState("");
  const [newAllergies, setNewAllergies] = useState("");
  const [treatmentNotes, setTreatmentNotes] = useState("");
  
  const [drugSearch, setDrugSearch] = useState("");
  const [selectedDrug, setSelectedDrug] = useState("");
  const [selectedDosage, setSelectedDosage] = useState(standardDosages[0]);
  const [selectedDuration, setSelectedDuration] = useState(standardDurations[0]);
  const [currentPrescriptionList, setCurrentPrescriptionList] = useState([]);

  const filteredDrugs = drugSearch && selectedDrug !== drugSearch
    ? hospitalFormulary.filter(d => d.toLowerCase().includes(drugSearch.toLowerCase()))
    : [];

  const handlePatientSearch = (e, directId = null) => {
    if (e) e.preventDefault();
    const idToLookup = (directId || searchId).trim().toUpperCase();
    if (mockPatients[idToLookup]) {
      setActivePatient(mockPatients[idToLookup]);
      setSearchError("");
    } else {
      setActivePatient(null);
      setSearchError("No patient profile found matching that ID number.");
    }
  };

  const clearActivePatient = () => {
    setActivePatient(null);
    setSearchId("");
    setDiagnosedCondition("");
    setNewAllergies("");
    setTreatmentNotes("");
    setCurrentPrescriptionList([]);
  };

  const addDrugToPrescription = () => {
    if (!selectedDrug) return;
    setCurrentPrescriptionList([...currentPrescriptionList, { drug: selectedDrug, dosage: selectedDosage, duration: selectedDuration }]);
    setDrugSearch("");
    setSelectedDrug("");
  };

  // Asynchronous handler to compile data and commit it to your backend API database
  const handleSaveVisit = async () => {
    const visitPayload = {
      patientId: activePatient.id,
      doctorId: currentDoctor.id, // Links record directly to the current doctor's ID
      doctorName: currentDoctor.name,
      date: new Date().toISOString().split('T')[0], 
      
      // Clinical diagnostic info
      diagnosis: diagnosedCondition,
      notes: treatmentNotes,
      reportedAllergies: newAllergies,

      // Prescription list matrix
      prescriptions: currentPrescriptionList.map(med => ({
        medicineName: med.drug,
        dosage: med.dosage,
        duration: med.duration
      }))
    };

    console.log("Submitting record payload to DB endpoint:", visitPayload);

    try {
      // Replace with your real API endpoint path (e.g., "/api/prescriptions")
      const response = await fetch("http://localhost:5000/api/visitations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visitPayload),
      });

      if (response.ok) {
        alert(`Successfully linked and saved record to database under ${currentDoctor.name}!`);
        clearActivePatient();
      } else {
        alert("Server rejected session database save.");
      }
    } catch (error) {
      console.error("Database connectivity error:", error);
      alert("Network Error: Could not connect to the database API server.");
    }
  };

  const renderDoctorContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <div className="space-y-8 w-full animate-fadeIn">
            {!activePatient && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-center">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Find Patient File</h3>
                  <form onSubmit={(e) => handlePatientSearch(e)} className="flex gap-4">
                    <div className="flex bg-slate-50 rounded-xl border-2 border-slate-200 overflow-hidden focus-within:border-emerald-600 focus-within:bg-white transition-all flex-1">
                      <input 
                        type="text" 
                        placeholder="Type Patient ID (e.g., P10024)..." 
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        className="w-full bg-transparent px-6 py-4 outline-none text-lg font-medium placeholder-slate-400 text-slate-900"
                      />
                    </div>
                    <button type="submit" className="bg-slate-800 hover:bg-slate-900 text-white px-8 rounded-xl text-sm font-bold tracking-wider uppercase shadow-xs flex items-center gap-3 transition-colors cursor-pointer">
                      <FaSearch /> Open Profile
                    </button>
                  </form>
                  {searchError && <p className="text-rose-600 font-medium text-sm mt-4 ml-2">⚠️ {searchError}</p>}
                </div>
                <div className="w-full">
                  <div onClick={() => { setSearchId("P10024"); handlePatientSearch(null, "P10024"); }} className="bg-white border-2 border-dashed border-emerald-600/60 bg-emerald-50/5 p-8 rounded-2xl text-center h-full flex flex-col justify-center items-center group cursor-pointer hover:bg-emerald-50/10 transition-all">
                    <h3 className="text-slate-800 font-bold mb-3 text-lg tracking-wide uppercase">Scan Wristband</h3>
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-105 transition-transform"><FaQrcode /></div>
                    <p className="text-[11px] font-bold text-slate-400 mt-5 uppercase tracking-widest">Turn on barcode scanner</p>
                  </div>
                </div>
              </div>
            )}

            {activePatient && (
              <div className="space-y-8 w-full animate-fadeIn">
                <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-md border border-slate-700 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
                    <div className="w-14 h-14 rounded-xl bg-emerald-600 font-bold text-2xl flex items-center justify-center border border-white/10 uppercase text-white shrink-0">{activePatient.name.charAt(0)}</div>
                    <div className="space-y-1 min-w-0">
                      <h2 className="text-2xl font-bold tracking-tight text-white truncate">{activePatient.name}</h2>
                      <div className="text-xs text-slate-300 font-medium flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded font-bold uppercase">ID: {activePatient.id}</span>
                        <span>• Age: {activePatient.age} Yrs</span>
                        <span>• Gender: {activePatient.gender}</span>
                        <span>• Blood Type: <strong className="text-rose-400 font-bold">{activePatient.bloodGroup}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto shrink-0 border-t border-slate-700 lg:border-t-0 pt-4 lg:pt-0">
                    <button onClick={() => setShowMedicalHistoryPopup(true)} className="flex-1 sm:flex-none px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-xs flex items-center justify-center gap-2 font-bold uppercase tracking-wider shadow-xs"><FaFileMedical /> Medical Archive</button>
                    <button onClick={() => setShowRxPopup(true)} className="flex-1 sm:flex-none px-4 py-3 bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl text-xs flex items-center justify-center gap-2 font-bold uppercase tracking-wider shadow-xs"><FaPrescriptionBottleAlt /> Medication Logs</button>
                    <button onClick={clearActivePatient} className="px-4 py-3 bg-white/5 text-slate-300 hover:text-white hover:bg-rose-600 rounded-xl text-xs flex items-center justify-center gap-2 font-bold uppercase tracking-wider border border-white/10"><FaTimes /> Close File</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start w-full">
                  <div className="xl:col-span-3 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl text-2xl shrink-0"><FaStethoscope /></div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-800 tracking-tight uppercase">Add Diagnosis & Visit Notes</h4>
                            <p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">Log current symptoms, illnesses, checkups, or treatment notes for today's visit.</p>
                          </div>
                        </div>
                        {diagnosedCondition && <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-800"><span className="text-slate-400 uppercase tracking-widest block text-[10px] font-bold mb-1">Staged Diagnosis</span>{diagnosedCondition}</div>}
                        <button onClick={() => setShowTreatmentModal(true)} className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider">Open Form</button>
                      </div>

                      <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="p-4 bg-slate-50 text-slate-600 border border-slate-200 rounded-2xl text-2xl shrink-0"><FaPrescriptionBottleAlt /></div>
                          <div>
                            <h4 className="text-xl font-bold text-slate-800 tracking-tight uppercase">Write New Prescription</h4>
                            <p className="text-sm text-slate-400 font-medium mt-1 leading-relaxed">Search the hospital stock list to quickly add medicines, doses, and directions.</p>
                          </div>
                        </div>
                        {currentPrescriptionList.length > 0 && <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm font-medium text-slate-800"><span className="text-slate-400 uppercase tracking-widest block text-[10px] font-bold mb-1">Selected Medicines</span>{currentPrescriptionList.length} Items Selected</div>}
                        <button onClick={() => setShowPrescriptionModal(true)} className="w-full py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider">Open Form</button>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                      <button 
                        onClick={handleSaveVisit} 
                        disabled={!diagnosedCondition && currentPrescriptionList.length === 0 && !newAllergies} 
                        className="w-full py-4 bg-slate-800 text-white rounded-xl text-base font-bold tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-black disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                      >
                        <FaCheckCircle /> Save & Finish Patient Visit
                      </button>
                    </div>
                  </div>

                  <div className="space-y-8 w-full">
                    <div className="bg-rose-50/40 border border-rose-200 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-2 border-b border-rose-200 pb-3 text-rose-800">
                        <FaExclamationTriangle className="text-base" />
                        <h4 className="text-xs font-bold uppercase tracking-widest">Known Allergies</h4>
                      </div>
                      {activePatient.allergies?.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {activePatient.allergies.map((allergy, idx) => (
                            <span key={idx} className="bg-white border border-rose-100 text-rose-700 font-bold px-3.5 py-2 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> {allergy}
                            </span>
                          ))}
                        </div>
                      ) : <p className="text-sm font-medium text-slate-400 italic">No allergies recorded.</p>}
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
                      <div className="flex items-center gap-2 border-b border-slate-100 pb-3"><FaHistory className="text-slate-400 text-base" /><h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest">Past History Quick View</h4></div>
                      <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                        {activePatient.history.map((h, i) => (
                          <div key={i} className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs transition-all hover:bg-white hover:border-slate-300">
                            <div className="flex justify-between text-[10px] text-slate-400 font-bold"><span>📅 {h.date}</span><span className="text-emerald-700 uppercase">{h.doctor}</span></div>
                            <h5 className="font-bold text-slate-800 text-sm tracking-tight">{h.diagnosis}</h5>
                            <p className="text-slate-600 leading-relaxed font-medium">{h.notes}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {showTreatmentModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <div className="flex items-center gap-3"><FaStethoscope className="text-emerald-600 text-xl" /><h3 className="text-lg font-bold text-slate-800 uppercase">Diagnosis & Treatment Notes</h3></div>
                    <button onClick={() => setShowTreatmentModal(false)} className="text-slate-400 text-lg hover:bg-slate-200 p-2 rounded-xl"><FaTimes /></button>
                  </div>
                  <div className="p-8 space-y-6 flex-1 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnosis / Illness Name</label><input type="text" placeholder="e.g., Asthma, Hypertension" value={diagnosedCondition} onChange={(e) => setDiagnosedCondition(e.target.value)} className="w-full bg-slate-50 rounded-xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-900 focus:bg-white focus:border-emerald-600 outline-none" /></div>
                      <div><label className="block text-xs font-bold text-rose-500 uppercase tracking-widest mb-2">Add New Allergies (If Any)</label><input type="text" placeholder="e.g., Penicillin" value={newAllergies} onChange={(e) => setNewAllergies(e.target.value)} className="w-full bg-rose-50/10 rounded-xl border-2 border-rose-200 focus:border-rose-500 px-4 py-3 text-rose-700 outline-none" /></div>
                    </div>
                    <div><label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Doctor Notes & Treatment Plan</label><textarea rows="5" placeholder="Write any specific instructions, advice, or observation details here..." value={treatmentNotes} onChange={(e) => setTreatmentNotes(e.target.value)} className="w-full bg-slate-50 rounded-xl border-2 border-slate-200 px-4 py-3 font-medium text-slate-800 focus:bg-white focus:border-emerald-600 outline-none resize-none" /></div>
                  </div>
                  <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end"><button onClick={() => setShowTreatmentModal(false)} className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-xs">Keep Changes</button></div>
                </div>
              </div>
            )}

            {showPrescriptionModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-slate-200 flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <div className="flex items-center gap-3"><FaPrescriptionBottleAlt className="text-emerald-600 text-xl" /><h3 className="text-lg font-bold text-slate-800 uppercase">Write New Prescription</h3></div>
                    <button onClick={() => setShowPrescriptionModal(false)} className="text-slate-400 text-lg hover:bg-slate-200 p-2 rounded-xl"><FaTimes /></button>
                  </div>
                  <div className="p-8 space-y-6 flex-1 relative w-full">
                    <div className="relative w-full">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Search Hospital Medicine List</label>
                      <div className="flex bg-slate-50 rounded-xl border-2 border-slate-200 items-center px-4 focus-within:border-emerald-600 focus-within:bg-white transition-all"><FaCapsules className="text-slate-400 text-lg" /><input type="text" placeholder="Type medicine name..." value={drugSearch} onChange={(e) => setDrugSearch(e.target.value)} className="w-full px-4 py-3.5 text-base font-medium outline-none text-slate-900" /></div>
                      {filteredDrugs.length > 0 && (
                        <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl max-h-56 overflow-y-auto z-50 divide-y divide-slate-100">
                          {filteredDrugs.map((drug, idx) => (
                            <div key={idx} onClick={() => { setSelectedDrug(drug); setDrugSearch(drug); }} className="px-6 py-3.5 text-base font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer">{drug}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    {selectedDrug && (
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">How Often to Take (Directions)</label><select value={selectedDosage} onChange={(e) => setSelectedDosage(e.target.value)} className="w-full bg-white rounded-xl border p-3 font-medium text-slate-800 outline-none">{standardDosages.map((d, i) => <option key={i} value={d}>{d}</option>)}</select></div>
                          <div><label className="block text-xs font-bold text-slate-500 mb-2">Total Treatment Days (Duration)</label><select value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)} className="w-full bg-white rounded-xl border p-3 font-medium text-slate-800 outline-none">{standardDurations.map((d, i) => <option key={i} value={d}>{d}</option>)}</select></div>
                        </div>
                        <button onClick={addDrugToPrescription} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider">Add to Prescription</button>
                      </div>
                    )}
                    <div className="space-y-4 w-full">
                      <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Medicines Added So Far</h5>
                      {currentPrescriptionList.length === 0 ? <div className="text-center p-6 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200 text-xs text-slate-400 font-bold uppercase tracking-wide">No medicines added yet</div> : (
                        <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 max-h-56 overflow-y-auto">
                          {currentPrescriptionList.map((med, index) => (
                            <div key={index} className="p-4 bg-white flex justify-between items-center"><div className="flex items-center gap-4"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div><div><h6 className="font-bold text-slate-900 text-base">{med.drug}</h6><p className="text-xs text-slate-500 font-medium">{med.dosage} • <span className="text-emerald-700 font-bold">{med.duration}</span></p></div></div><button onClick={() => setCurrentPrescriptionList(currentPrescriptionList.filter((_, i) => i !== index))} className="text-slate-300 hover:text-rose-600 p-2 text-base"><FaTrashAlt /></button></div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-5 border-t border-slate-100 bg-slate-50 rounded-b-2xl flex justify-end"><button onClick={() => setShowPrescriptionModal(false)} className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-xs">Keep Changes</button></div>
                </div>
              </div>
            )}

            {showMedicalHistoryPopup && <MedicalHistoryPopup patient={activePatient} onClose={() => setShowMedicalHistoryPopup(false)} />}
            {showRxPopup && <PrescriptionsRecordsModal patient={activePatient} onClose={() => setShowRxPopup(false)} />}
          </div>
        );
        
      case "medical_history":
        return <MedicalHistory activePatient={activePatient} />;
      case "prescriptions":
        return activePatient ? (
          <PrescriptionsRecordsModal patient={activePatient} onClose={() => setActiveTab("dashboard")} />
        ) : (
          <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-xs w-full">
            <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight mb-2">Prescription Files</h3>
            <p className="text-slate-400 font-medium text-sm">Please find and select a patient profile on the main workspace to see their prescription history.</p>
          </div>
        );
      default:
        return <div className="p-10 bg-white border border-slate-200 rounded-2xl font-bold text-slate-800 uppercase text-sm">Page not found: {activeTab}</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-700 antialiased w-full max-w-full overflow-x-hidden font-sans">
      <DoctorSidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      <main className="flex-1 flex flex-col overflow-x-hidden min-w-0 w-full">
        <DoctorNavbar />
        <section className="p-8 flex-1 overflow-y-auto w-full max-w-full mx-auto">
          {renderDoctorContent()}
        </section>
      </main>
    </div>
  );
}