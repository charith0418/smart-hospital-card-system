import { useState } from "react";

import AdminSidebar from "../components/Dashboard/AdminSidebar";
import AdminNavbar from "../components/Dashboard/AdminNavebar";
import StaffModal from "../components/staff/StaffModal";
import StaffTable from "../components/staff/StaffTable";
import ViewStaffModal from "../components/staff/ViewStaffModal";

export default function Staff() {
  const [staff, setStaff] = useState([
    {
      id: 1,staffId: "STF/0001",name: "Nimal Perera",role: "Nurse",email: "stf0001@dr.mh.ac.lk",phone: "0712345678",nic: "199812345678",
    },
    {
      id: 2,staffId: "STF/0002",name: "Kasun Silva",role: "Receptionist",email: "stf0002@dr.mh.ac.lk",phone: "0771234567",nic: "199812345678",
    },
    {
      id: 3,staffId: "STF/0003",name: "Sachini Fernando",role: "Pharmacist",email: "stf0003@dr.mh.ac.lk",phone: "0769876543",nic: "199812345678",
    },
    {
      id: 4,staffId: "STF/0004",name: "Sachini Fernando",role: "Lab Technician",email: "stf0004@dr.mh.ac.lk",phone: "0769876543",nic: "199812345678",
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editStaff, setEditStaff] = useState(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const staffPerPage = 5;
  const totalStaff = staff.length;
  
  // Add new staff
  const addStaff = (newStaff) => {
    setStaff((prevStaff) => [...prevStaff, newStaff]);
  };

  //View Staff
  const handleView = (staff) => {
    setSelectedStaff(staff);
    setViewOpen(true);
    };

  //Edit Staff
  const handleEdit = (staff) => {
    setEditStaff(staff);
    setIsEdit(true);
    setOpenModal(true);
  };

  //update Staff Values
  const updateStaff = (updatedStaff) => {
    setStaff((prevStaff) =>
      prevStaff.map((staff) =>
        staff.id === updatedStaff.id
          ? updatedStaff
          : staff
      )
    );
  };

  //Delete Staff
  const deleteStaff = (id) => {
    setStaff((prevStaff) =>
      prevStaff.filter((staff) => staff.id !== id)
    );
  };

//Auto genarate Id and email
  const getNextStaffId = () => {
    if (staff.length === 0) {
      return "STF/0001";
    }

    const maxNumber = Math.max(
      ...staff.map((staff) =>
        Number(staff.staffId.replace("STF/", ""))
      )
    );

    return `STF/${String(maxNumber + 1).padStart(4, "0")}`;
  };

  //Filter Staff
  const filteredStaff = staff.filter((staff) =>
    staff.staffId.toLowerCase().includes(search.toLowerCase()) ||
    staff.name.toLowerCase().includes(search.toLowerCase()) ||
    staff.role.toLowerCase().includes(search.toLowerCase())
  );

  //Pagination Logic
  const indexOfLastStaff = currentPage * staffPerPage;
  const indexOfFirstStaff = indexOfLastStaff - staffPerPage;

  const currentStaff = filteredStaff.slice(
    indexOfFirstStaff,
    indexOfLastStaff
  );

  const totalPages = Math.ceil(filteredStaff.length / staffPerPage);

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
              Staff Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage hospital staff accounts and information.
            </p>
          </div>

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold shadow"
          >
            + Add Staff
          </button>
        </div>

        {/* Search & Summary */}
        <div className="mt-8">
          <div className="flex justify-between">
            <input
              type="text"
              placeholder="Search by ID, Name or Role..."
              value={search}
              onChange={(e) => {setSearch(e.target.value);setCurrentPage(1);}}
              className="w-full md:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Staff Table */}
        <StaffTable
          staff={currentStaff}
          totalStaff={staff.length}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={deleteStaff}
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

      {/* Add Staff Modal and Edit*/}
      <StaffModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setIsEdit(false);
          setEditStaff(null);
        }}
        addStaff={addStaff}
        updateStaff={updateStaff}
        nextStaffId={getNextStaffId()}
        isEdit={isEdit}
        staff={editStaff}
      />
      <ViewStaffModal
        open={viewOpen}
        staff={selectedStaff}
        onClose={() => {
          setViewOpen(false);
          setSelectedStaff(null);
        }}
      />
    </div>
  );
}