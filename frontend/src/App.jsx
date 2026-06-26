import React, { useState } from 'react'
// import LoginForm from './pages/LoginForm'
import StaffDashboard from './pages/StaffDashboard'

const App = () => {
  // 1. Tracks whether a user is logged in (toggle to false to show login form later)
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 text-[#1e293b] antialiased">
      {isAuthenticated ? (
        <StaffDashboard />
      ) : (
        // <LoginForm onLoginSuccess={() => setIsAuthenticated(true)} />
        <div className="flex items-center justify-center h-screen">Login Form Standby</div>
      )}
    </div>
  )
}

export default App