import React from "react";
import { FaCalendarAlt, FaUserMd, FaClock } from "react-icons/fa";

export default function AppointmentCard({ appointment = {} }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">

      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            Upcoming Appointment
          </h3>
          <p className="text-sm text-gray-500">
            Next scheduled doctor visit
          </p>
        </div>

        <div className="w-12 h-12 rounded-xl bg-blue-100 text-[#1E5FAD] flex items-center justify-center">
          <FaCalendarAlt className="text-xl" />
        </div>
      </div>

      {/* Appointment Info */}
      {appointment.doctor ? (
        <div className="space-y-4">

          <div className="border border-gray-100 rounded-xl p-5 hover:shadow-md transition">

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-50 text-[#1E5FAD] p-3 rounded-full">
                <FaUserMd />
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  {appointment.doctor}
                </h4>

                <p className="text-sm text-gray-500">
                  {appointment.specialization || "Specialist"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-600 mb-3">
              <FaCalendarAlt />
              <span>
                {appointment.date || "--/--/----"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-gray-600">
              <FaClock />
              <span>
                {appointment.time || "--:--"}
              </span>
            </div>

          </div>

        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-400">
            No upcoming appointments
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-5 text-right">
        <button className="text-[#1E5FAD] font-semibold text-sm hover:underline">
          View All
        </button>
      </div>

    </div>
  );
}