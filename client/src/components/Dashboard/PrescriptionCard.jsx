import React from "react";
import { FaPills } from "react-icons/fa";

export default function PrescriptionCard({
  prescriptions = [],
  onViewAll,
}) {
  // Get the latest prescription (assuming the first one is the latest)
  const latestPrescription = prescriptions[0];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Prescriptions & Treatments
          </h3>
          <p className="text-sm text-gray-500">
            Current prescribed medicines
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
          <FaPills className="text-xl" />
        </div>
      </div>

      {latestPrescription ? (
        <>
          {/* Prescription Details */}
          <div className="flex justify-between items-start mb-4">
            <h4 className="font-semibold text-gray-800">
              {latestPrescription.diagnosis}
            </h4>
            <p className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              {latestPrescription.date}
            </p>
          </div>

          {/* Medicines */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
            {latestPrescription.medicines.map((medicine) => (
              <div
                key={medicine.id}
                className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h5 className="font-semibold text-gray-800">
                      {medicine.medicine}
                    </h5>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dosage:</span>{" "}
                      {medicine.dosage}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Frequency:</span>{" "}
                      {medicine.frequency}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Duration:</span>{" "}
                      {medicine.duration}
                    </p>
                  </div>

                  <div className="bg-red-100 p-2 rounded-full text-red-500">
                    <FaPills />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-10 text-gray-400">
          No prescriptions available
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 text-right">
        <button
          onClick={onViewAll}
          className="text-[#1E5FAD] font-semibold text-sm hover:underline"
        >
          View All
        </button>
      </div>
    </div>
  );
}