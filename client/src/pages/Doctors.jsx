import { useState } from "react";

import AdminSidebar from "../components/Dashboard/AdminSidebar";
import AdminNavbar from "../components/Dashboard/AdminNavebar";
import DoctorModal from "../components/doctors/DoctorModal";
import DoctorTable from "../components/doctors/DoctorTable";
import ViewDoctorModal from "../components/doctors/ViewDoctorModal";

export default function Doctors() {
  const [doctors, setDoctors] = useState([
    {
      id: 1,doctorId: "DOC/0001",name: "Dr. Nimal Perera",specialization: "Cardiologist",email: "doc0001@dr.mh.ac.lk",phone: "0712345678",nic: "199812345678",license: "SLMC10001",
    },
    {
      id: 2,doctorId: "DOC/0002",name: "Dr. Kasun Silva",specialization: "Neurologist",email: "doc0002@dr.mh.ac.lk",phone: "0771234567",nic: "199812345678",license: "SLMC10002",
    },
    {
      id: 3,doctorId: "DOC/0003",name: "Dr. Sachini Fernando",specialization: "Dermatologist",email: "doc0003@dr.mh.ac.lk",phone: "0769876543",nic: "199812345678",license: "SLMC10003",
    },
    {
      id: 4,doctorId: "DOC/0004",name: "Dr. Sachini Fernando",specialization: "Dermatologist",email: "doc0004@dr.mh.ac.lk",phone: "0769876543",nic: "199812345678",license: "SLMC10004",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editDoctor, setEditDoctor] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const doctorsPerPage = 5;
  const totalDoctors = doctors.length;
  
  // Add new doctor
  const addDoctor = (newDoctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, newDoctor]);
  };

  //View Doctor
  const handleView = (doctor) => {
    setSelectedDoctor(doctor);
    setViewOpen(true);
    };

  //Edit Doctor
  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setIsEdit(true);
    setOpenModal(true);
  };

  //update Doctor Values
  const updateDoctor = (updatedDoctor) => {
    setDoctors((prevDoctors) =>
      prevDoctors.map((doctor) =>
        doctor.id === updatedDoctor.id
          ? updatedDoctor
          : doctor
      )
    );
  };

  //Delete Doctor
  const deleteDoctor = (id) => {
    setDoctors((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor.id !== id)
    );
  };

//Auto genarate Id and email
  const getNextDoctorId = () => {
    if (doctors.length === 0) {
      return "DOC/0001";
    }

    const maxNumber = Math.max(
      ...doctors.map((doctor) =>
        Number(doctor.doctorId.replace("DOC/", ""))
      )
    );

    return `DOC/${String(maxNumber + 1).padStart(4, "0")}`;
  };

  //Filter Doctor
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.doctorId.toLowerCase().includes(search.toLowerCase()) ||
    doctor.name.toLowerCase().includes(search.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(search.toLowerCase())
  );

  //Pagination Logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;

  const currentDoctors = filteredDoctors.slice(
    indexOfFirstDoctor,
    indexOfLastDoctor
  );

  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

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
              placeholder="Search by ID, Name or Specialization..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Doctor Table */}
        <DoctorTable
          doctors={currentDoctors}
          totalDoctors={doctors.length}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={deleteDoctor}
        />

        {/* Pagination Buttons */}
        <div className="flex justify-between items-center mt-6">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-2">

            {[...Array(totalPages)].map((_, index) => (

              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-10 h-10 rounded-lg ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>

            ))}

          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>

        </div>


      </main>

      {/* Add Doctor Modal and Edit*/}
      <DoctorModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsEdit(false);
          setEditDoctor(null);
        }}
        addDoctor={addDoctor}
        updateDoctor={updateDoctor}
        nextDoctorId={getNextDoctorId()}
        isEdit={isEdit}
        doctor={editDoctor}
      />
      <ViewDoctorModal
        open={viewOpen}
        doctor={selectedDoctor}
        onClose={() => {
          setViewOpen(false);
          setSelectedDoctor(null);
        }}
      />
    </div>
  );
}