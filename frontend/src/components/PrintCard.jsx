import React, { useState } from "react";

export default function PrintCard() {
  const [patientId, setPatientId] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(false);

  // රෝගියාගේ දත්ත සහ QR Code එක Fetch කිරීම
  const handleFetchCard = async (e) => {
    e.preventDefault();
    if (!patientId) return;

    setLoading(true);
    try {
      // Backend Endpoint: GET /api/patients/:id/card-details
      const response = await fetch(`/api/patients/${patientId}`);
      const data = await response.json();
      setPatientData(data);
    } catch (err) {
      console.error("Error fetching card details", err);
    } finally {
      setLoading(false);
    }
  };

  // 🖨️ බ්‍රව්සර් ප්‍රින්ට් එක ක්‍රියාත්මක කිරීමේ ෆන්ක්ෂන් එක
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      {/* 🔍 Search Bar (මුද්‍රණය කරද්දී මේ කොටස හැංගෙනවා) */}
      <form onSubmit={handleFetchCard} className="print:hidden flex gap-3 max-w-md mx-auto bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <input
          type="text"
          placeholder="Enter Patient ID (e.g., P10024)"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-emerald-500"
        />
        <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition">
          {loading ? "Loading..." : "Load Card"}
        </button>
      </form>

      {patientData && (
        <div className="flex flex-col items-center gap-6">
          
          {/* ==================== SMART CARD LAYOUT ==================== */}
          {/* මුද්‍රණයට සුදුසු ප්‍රමාණයට (CR80 standard ID size) සකසා ඇත */}
          <div id="hospital-card" className="w-[450px] h-[260px] bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden border border-emerald-700">
            
            {/* Card Header */}
            <div className="flex justify-between items-start border-b border-emerald-600/40 pb-3">
              <div>
                <h1 className="font-bold text-lg tracking-wide flex items-center gap-1">🟢 Medicare Hospital</h1>
                <p className="text-[10px] text-emerald-300 tracking-widest uppercase">Smart Health Access Card</p>
              </div>
              <span className="text-xs bg-emerald-700/60 px-2.5 py-1 rounded-md border border-emerald-500/30 font-mono font-bold">
                {patientData.patientId || "P10000"}
              </span>
            </div>

            {/* Card Body (Details + QR) */}
            <div className="flex gap-4 items-center my-auto">
              {/* QR Code Container */}
              <div className="bg-white p-2 rounded-xl border border-slate-100 flex items-center justify-center shadow-inner">
                {/* Backend එකෙන් එවන Base64 QR code එක හෝ URL එක මෙතනට වැටේ */}
                <img 
                  src={patientData.qrCodeUrl || "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Placeholder"} 
                  alt="Patient QR" 
                  className="w-24 h-24 object-contain"
                />
              </div>

              {/* Patient Info */}
              <div className="space-y-1.5 flex-1">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">Patient Name</p>
                  <p className="text-base font-bold text-white truncate">{patientData.fullName}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">NIC / ID</p>
                    <p className="text-xs font-medium font-mono">{patientData.nic || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">Blood Group</p>
                    <p className="text-xs font-bold text-amber-300">{patientData.bloodGroup || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="text-[9px] text-emerald-400 border-t border-emerald-600/30 pt-2 flex justify-between font-mono">
              <span>Issued: 2026 / 2027</span>
              <span>Contact: +94 11 234 5678</span>
            </div>
          </div>
          {/* ============================================================ */}

          {/* 🖨️ Action Button (මුද්‍රණය කරද්දී මේ බොත්තම හැංගෙනවා) */}
          <button
            onClick={triggerPrint}
            className="print:hidden px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition shadow-lg flex items-center gap-2"
          >
            🖨️ Print Smart Card
          </button>
        </div>
      )}

      {/* CSS Styles for Clean Printing (කාඩ් එක විතරක් ප්‍රින්ට් වෙන්න) */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #hospital-card, #hospital-card * {
            visibility: visible;
          }
          #hospital-card {
            position: absolute;
            left: 50%;
            top: 40%;
            transform: translate(-50%, -50%) scale(1.2);
            box-shadow: none;
            border: 1px solid #065f46;
          }
        }
      `}</style>
    </div>
  );
}