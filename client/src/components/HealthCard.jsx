import React from "react";
import { FaDownload, FaUserCircle } from "react-icons/fa";

export default function HealthCard({ user = {} }) {
  return (
    <div className="lg:col-span-2 bg-gradient-to-r from-green-100 to-green-50 border border-green-200 rounded-2xl p-6 shadow-sm">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-green-800">
            Digital Health Card
          </h3>
          <p className="text-sm text-gray-500">
            Scan the QR code to access patient information.
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition">
          <FaDownload />
          Download
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">

        {/* Left Side */}
        <div className="flex items-center gap-5">

          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center overflow-hidden">
  {user.profileImage ? (
    <img
      src={user.profileImage}
      alt="Patient"
      className="w-full h-full object-cover"
    />
  ) : (
    <FaUserCircle className="w-full h-full text-gray-400" />
  )}
</div>

          <div className="space-y-2">

            <h2 className="text-2xl font-bold text-gray-800">
              {user.name || "Patient Name"}
            </h2>

            <p className="text-gray-600">
              <span className="font-semibold">
                Patient ID :
              </span>{" "}
              {user.patientId || "P00000"}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">
                Blood Group :
              </span>{" "}
              {user.bloodGroup || "--"}
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">
                Date of Birth :
              </span>{" "}
              {user.dob || "--/--/----"}
            </p>

          </div>

        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center">

          <div className="bg-white p-3 rounded-xl shadow border">

            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${
                user.patientId || "Patient"
              }`}
              alt="QR Code"
              className="w-32 h-32"
            />

          </div>

          <p className="text-xs text-gray-500 mt-3">
            Scan to verify patient
          </p>

        </div>

      </div>

      {/* Footer */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Gender
          </p>
          <h4 className="font-semibold mt-1">
            {user.gender || "--"}
          </h4>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Phone
          </p>
          <h4 className="font-semibold mt-1">
            {user.phone || "--"}
          </h4>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500">
            Blood Type
          </p>
          <h4 className="font-semibold mt-1">
            {user.bloodGroup || "--"}
          </h4>
        </div>


      </div>

    </div>
  );
}