import React from "react";
import StaffSidebar from "./components/staff/StaffSidebar";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-[#1e293b] antialiased">
      <StaffSidebar onLogout={() => {}} />
    </div>
  );
};

export default App;