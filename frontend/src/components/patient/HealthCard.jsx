import React from "react";
import { FaDownload } from "react-icons/fa";

// CHANGED PLACE: Added a 'fullWidth' prop to conditionally style its size
export default function HealthCard({ user = {}, fullWidth = false }) {
  return (
    <div className={`bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-2xl p-6 sm:p-8 shadow-sm transition-all w-full ${
      fullWidth ? "max-w-4xl mx-auto" : "lg:col-span-2"
    }`}>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-green-200/40">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-green-800">
            Digital Health Card
          </h3>
          <p className="text-sm text-gray-500">
            Scan the QR code to access patient information.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition font-medium shadow-sm">
          <FaDownload />
          Download Card
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 bg-white/60 p-6 rounded-xl border border-white/80">

        {/* Left Side */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-6 w-full">

          <img
            src={user.profileImage || "https://i.pravatar.cc/150?img=11"}
            alt="Patient"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />

          <div className="space-y-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {user.name || "Patient Name"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-base text-gray-600">
              <p>
                <span className="font-semibold text-gray-700">Patient ID:</span>{" "}
                {user.patientId || "P00000"}
              </p>
              <p>
                <span className="font-semibold text-gray-700">Blood Group:</span>{" "}
                {user.bloodGroup || "--"}
              </p>
              <p className="sm:col-span-2">
                <span className="font-semibold text-gray-700">Date of Birth:</span>{" "}
                {user.dob || "--/--/----"}
              </p>
            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100 min-w-[180px]">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
              user.patientId || "Patient"
            }`}
            alt="QR Code"
            className="w-36 h-36"
          />
          <p className="text-xs font-medium text-gray-400 mt-3 tracking-wide">
            SCAN TO VERIFY PATIENT
          </p>
        </div>

      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <p className="text-xs text-gray-400 font-medium">Gender</p>
          <h4 className="font-bold text-gray-800 mt-1 text-base">{user.gender || "--"}</h4>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <p className="text-xs text-gray-400 font-medium">Phone</p>
          <h4 className="font-bold text-gray-800 mt-1 text-base">{user.phone || "--"}</h4>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <p className="text-xs text-gray-400 font-medium">Email Address</p>
          <h4 className="font-bold text-gray-800 mt-1 text-sm truncate">{user.email || "--"}</h4>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-50">
          <p className="text-xs text-gray-400 font-medium">Status</p>
          <h4 className="font-bold text-green-600 mt-1 text-base">Active Registered</h4>
        </div>
      </div>

    </div>
  );
}