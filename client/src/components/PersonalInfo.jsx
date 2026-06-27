import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaIdCard,
} from "react-icons/fa";

export default function PersonalInfo({ user = {} }) {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm p-6 h-full">

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800">
          Personal Information
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          Patient basic details
        </p>
      </div>

      {/* Information */}
      <div className="space-y-5">

        {/* Patient ID */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-[#1E5FAD] flex items-center justify-center">
            <FaIdCard />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Patient ID
            </p>

            <h4 className="font-semibold text-gray-800">
              {user.patientId || "Not Available"}
            </h4>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
            <FaPhoneAlt />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Phone Number
            </p>

            <h4 className="font-semibold text-gray-800">
              {user.phone || "Not Available"}
            </h4>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-yellow-100 text-yellow-600 flex items-center justify-center">
            <FaEnvelope />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Email Address
            </p>

            <h4 className="font-semibold text-gray-800 break-all">
              {user.email || "Not Available"}
            </h4>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-red-100 text-red-500 flex items-center justify-center">
            <FaMapMarkerAlt />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Address
            </p>

            <h4 className="font-semibold text-gray-800">
              {user.address || "Not Available"}
            </h4>
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
            <FaVenusMars />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Gender
            </p>

            <h4 className="font-semibold text-gray-800">
              {user.gender || "Not Available"}
            </h4>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
            <FaBirthdayCake />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Date of Birth
            </p>

            <h4 className="font-semibold text-gray-800">
              {user.dob || "Not Available"}
            </h4>
          </div>
        </div>

      </div>

    </div>
  );
}