import React from "react";
import Patient from "./pages/Patient";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-[#1e293b] antialiased">
      <Patient onLogout={() => {}} />
    </div>
  );
};

export default App;