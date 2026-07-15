import React from "react";
import { useState } from "react";

export default function DoctorModal({ open, onClose, addDoctor, doctorCount, }) {
  if (!open) return null;

  const doctorId = `DOC${String(doctorCount + 1).padStart(4, "0")}`;

  const email = `${doctorId.toLowerCase()}@dr.mh.ac.lk`;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [license, setLicense] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {

      // Check required fields
      if (
        !firstName ||
        !lastName ||
        !phone ||
        !nic ||
        !specialization ||
        !license ||
        !password ||
        !confirmPassword
      ) {
        alert("Please fill all fields.");
        return;
      }

      // Check password
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      // Create doctor object
      const newDoctor = {
        id: doctorCount + 1,
        doctorId,
        name: `Dr. ${firstName} ${lastName}`,
        specialization,
        email,
        phone,
        nic,
        license,
      };

      // Send doctor to Doctors.jsx
      addDoctor(newDoctor);

      // Close popup
      onClose();

      // Clear form
      setFirstName("");
      setLastName("");
      setPhone("");
      setNic("");
      setSpecialization("");
      setLicense("");
      setPassword("");
      setConfirmPassword("");
    };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-4xl p-8 shadow-2xl">

        {/* Header */}

        <div className="flex justify-between items-center border-b pb-4">

          <h2 className="text-2xl font-bold text-gray-800">
            Register New Doctor
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-red-500"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <div className="grid grid-cols-2 gap-5 mt-6">

          <div>
            <label className="block text-sm font-medium mb-2">
              Doctor ID
            </label>

            <input
              type="text"
              value={doctorId}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="w-full border rounded-lg px-4 py-3 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              First Name
            </label>

            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Last Name
            </label>

            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="07XXXXXXXX"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              NIC
            </label>

            <input
              type="text"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              placeholder="Enter NIC"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Specialization
            </label>

            <select
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="">Select Specialization</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Dentist">Dentist</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Medical License No.
            </label>

            <input
              type="text"
              value={license}
              onChange={(e) => setLicense(e.target.value)}
              placeholder="SLMC12345"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleRegister}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Register Doctor
          </button>

        </div>

      </div>

    </div>
  );
}