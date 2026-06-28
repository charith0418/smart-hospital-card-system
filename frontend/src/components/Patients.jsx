import React, { useState } from 'react';
import { FaSearch, FaEye, FaUserEdit } from 'react-icons/fa';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const dummyPatients = [
    { id: "P10024", name: "John Doe", age: 29, blood: "O+", visit: "20 May 2026", status: "Completed" },
    { id: "P10018", name: "Maria Fernando", age: 34, blood: "A-", visit: "20 May 2026", status: "Pending" },
    { id: "P10011", name: "David Perera", age: 45, blood: "B+", visit: "19 May 2026", status: "Completed" },
    { id: "P10007", name: "Nimal Silva", age: 52, blood: "O-", visit: "19 May 2026", status: "Completed" }
  ];

  return (
    <div className="space-y-5 max-w-6xl mx-auto text-[#1e293b]">
      {/* Search Bar Block */}
      <div className="max-w-md bg-white p-2 rounded-xl shadow-xs border border-gray-100 flex items-center">
        <div className="text-gray-400 px-3"><FaSearch /></div>
        <input 
          type="text" 
          placeholder="Search patients by name or ID..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent py-1.5 outline-hidden text-sm"
        />
      </div>

      {/* Directory Data Ledger Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500">
                <th className="p-4">Patient ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Age</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Last Visit</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-50 font-medium text-gray-700">
              {dummyPatients.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 text-[#078a72] font-bold">{p.id}</td>
                  <td className="p-4 text-gray-900 font-bold">{p.name}</td>
                  <td className="p-4">{p.age} Yrs</td>
                  <td className="p-4"><span className="bg-gray-100 px-2 py-0.5 rounded font-mono font-bold text-xs">{p.blood}</span></td>
                  <td className="p-4 text-gray-400 text-xs">{p.visit}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-center space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 p-1 flex items-center space-x-1 cursor-pointer"><FaEye /> <span className="text-xs font-bold">View</span></button>
                    <button className="text-gray-500 hover:text-gray-700 p-1 flex items-center space-x-1 cursor-pointer"><FaUserEdit /> <span className="text-xs font-bold">Edit</span></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;