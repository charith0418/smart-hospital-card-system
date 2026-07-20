import React from "react";

export default function MedicalHistory({ activePatient }) {
  if (!activePatient) {
    return (
      <div className="p-8 bg-white border border-slate-200 rounded-2xl shadow-xs w-full">
        <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight mb-2">Past Medical Records</h3>
        <p className="text-slate-400 font-medium text-sm">Please find and select a patient on the main workspace to view their files here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 border border-slate-200 rounded-2xl shadow-xs space-y-6 w-full">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">Past Visits & Diagnoses</h3>
        <p className="text-slate-400 font-medium text-sm">Patient: {activePatient.name}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {activePatient.history.map((h, i) => (
          <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-xl space-y-3 transition-all hover:bg-white hover:border-slate-300 shadow-xs">
            <div className="flex justify-between text-xs font-bold text-slate-400">
              <span>📅 {h.date}</span>
              <span className="text-emerald-700 font-bold uppercase tracking-wider">{h.doctor}</span>
            </div>
            <h5 className="font-bold text-slate-800 text-lg tracking-tight">{h.diagnosis}</h5>
            <p className="text-sm text-slate-600 leading-relaxed bg-white p-3 border border-slate-100 rounded-lg">{h.notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}