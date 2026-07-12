import React from "react";
import { FaPills } from "react-icons/fa";

export default function PrescriptionCard({ prescriptions = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Latest Prescriptions
          </h3>
          <p className="text-sm text-gray-500">
            Current prescribed medicines
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
          <FaPills className="text-xl" />
        </div>
      </div>

      {/* Prescription List */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-2">

        {prescriptions.length > 0 ? (
          prescriptions.map((medicine, index) => (
            <div
              key={index}
              className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">

                <div className="bg-red-50 text-red-500 p-3 rounded-full">
                  <FaPills />
                </div>

                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800">
                    {medicine.name || "Medicine Name"}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {medicine.dosage || "Dosage not available"}
                  </p>

                  <p className="text-xs text-gray-400 mt-2">
                    Duration: {medicine.duration || "--"}
                  </p>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-400">
              No prescriptions available
            </p>
          </div>
        )}

      </div>

      {/* Footer */}
      <div className="mt-5 text-right">
        <button className="text-[#1E5FAD] font-semibold text-sm hover:underline">
          View All
        </button>
      </div>

    </div>
  );
}