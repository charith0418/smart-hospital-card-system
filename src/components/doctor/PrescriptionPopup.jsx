import React, { useState } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import PrescriptionCard from "./PrescriptionCard";

export default function PrescriptionsRecordsModal({ patient, onClose }) {
  const [activeRxIndex, setActiveRxIndex] = useState(0);
  const [rxSearch, setRxSearch] = useState("");

  if (!patient.prescriptions || patient.prescriptions.length === 0) {
    return (
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-2xl border border-slate-200">
          <p className="font-bold text-slate-800 text-lg">No active prescriptions found.</p>
          <button onClick={onClose} className="mt-5 w-full py-3 bg-slate-800 text-white rounded-xl font-bold uppercase tracking-wider hover:bg-black transition-colors cursor-pointer">Close</button>
        </div>
      </div>
    );
  }

  const currentRx = patient.prescriptions[activeRxIndex];
  const filteredRxList = patient.prescriptions.filter(rx => 
    rx.id.toLowerCase().includes(rxSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[92vh] overflow-y-auto border border-slate-200 flex flex-col">
        <div className="bg-slate-800 text-white p-6 flex justify-between items-center rounded-t-2xl border-b border-slate-700">
          <div className="flex items-center gap-4">
            <span className="text-3xl text-emerald-400">💊</span>
            <div>
              <h3 className="text-2xl font-bold tracking-tight uppercase">Medication History</h3>
              <p className="text-xs text-slate-400 font-medium tracking-wider uppercase mt-0.5">List of active and past prescriptions</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl p-2 cursor-pointer transition-colors rounded-xl hover:bg-white/5">
            <FaTimes />
          </button>
        </div>

        <div className="p-8 space-y-8 bg-slate-50/50 flex-1 w-full">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-lg"><FaSearch /></span>
            <input 
              type="text"
              placeholder="Search by Prescription Number..."
              value={rxSearch}
              onChange={(e) => setRxSearch(e.target.value)}
              className="w-full bg-white rounded-xl border-2 border-slate-200 pl-12 pr-4 py-3.5 text-base font-medium text-slate-900 outline-none focus:border-emerald-600 transition-colors placeholder-slate-400"
            />
          </div>

          {currentRx && <PrescriptionCard rx={currentRx} />}

          <div className="space-y-3 w-full">
            <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select a Prescription to View</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-40 overflow-y-auto pr-1 w-full">
              {filteredRxList.map((rx, index) => (
                <div 
                  key={rx.id}
                  onClick={() => setActiveRxIndex(index)}
                  className={`p-4 bg-white border-2 rounded-xl flex justify-between items-center transition-all cursor-pointer shadow-xs group ${
                    activeRxIndex === index ? 'border-emerald-600 bg-emerald-50/10 ring-4 ring-emerald-600/5' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="font-bold text-slate-900 block text-sm tracking-tight group-hover:text-emerald-700 transition-colors">ID: {rx.id}</span>
                    <span className="text-slate-400 text-xs font-medium mt-0.5 block">Date: {rx.date}</span>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2.5 py-1.5 rounded-lg border border-slate-200 uppercase tracking-wider group-hover:bg-emerald-600 group-hover:text-white transition-all">View</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}