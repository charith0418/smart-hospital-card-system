import React, { useState } from 'react';
import LoginForm from './pages/LoginForm';
import StaffSidebar from './components/StaffSidebar';
import Patient from './pages/Patient'; // Make sure this matches your file path exactly!
import Doctor from './pages/Doctor';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(""); 

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-[#1e293b] antialiased">
      {isAuthenticated ? (
        <>
          {userRole === "Staff" && (
            <StaffSidebar onLogout={handleLogout} />
          )}

          {userRole === "Patient" && (
            // FIXED CHANGED PLACE: Added the missing onLogout prop here!
            <Patient onLogout={handleLogout} />
          )}

          {userRole === "Doctor" && (
            <Doctor onLogout={handleLogout} />
          )}

          {userRole === "Admin" && (
            <div className="p-10 text-center">
              <h1 className="text-3xl font-bold mb-4">Admin Management System</h1>
              <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-white rounded-xl">Logout</button>
            </div>
          )}
        </>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
};

export default App;