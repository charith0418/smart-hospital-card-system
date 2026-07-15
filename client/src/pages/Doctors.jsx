import { useState } from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavebar";
import DoctorModal from "../components/doctors/DoctorModal";
import DoctorTable from "../components/doctors/DoctorTable";

export default function Doctors() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      doctorId: "DOC0001",name: "Dr. Nimal Perera",specialization: "Cardiologist",email: "doc0001@dr.mh.ac.lk",phone: "0712345678",
    },
    {
      id: 2,doctorId: "DOC0002",name: "Dr. Kasun Silva",specialization: "Neurologist",email: "doc0002@dr.mh.ac.lk",phone: "0771234567",
    },
    {
      id: 3,doctorId: "DOC0003",name: "Dr. Sachini Fernando",specialization: "Dermatologist",email: "doc0003@dr.mh.ac.lk",phone: "0769876543",
    },
    {
      id: 4,doctorId: "DOC0004",name: "Dr. Sachini Fernando",specialization: "Dermatologist",email: "doc0004@dr.mh.ac.lk",phone: "0769876543",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);

  const totalDoctors = doctors.length;

  // Add new doctor
  const addDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <AdminNavbar admin={{ name: "John Admin" }} />

        {/* Header */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Doctor Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage doctor accounts and information.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow"
          >
            + Add Doctor
          </button>
        </div>

        {/* Search & Summary */}
        <div className="mt-8">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Search doctor..."
              className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
            <div className="bg-white rounded-xl shadow p-5">
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <h2 className="text-3xl font-bold mt-2">
                {totalDoctors}
              </h2>
            </div>
          </div>
        </div>

        {/* Doctor Table */}
        <DoctorTable doctors={doctors} />
      </main>

      {/* Add Doctor Modal */}
      <DoctorModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        addDoctor={addDoctor}
        doctorCount={doctors.length}
      />
    </div>
  );
}