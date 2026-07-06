import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/logo.png";
import Hero from "../assets/hero.png";

import {
  FaEye,
  FaEyeSlash,
  FaShieldHalved,
  FaUserDoctor,
  FaUserShield,
  FaUserTie,
} from "react-icons/fa6";

import { FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const LoginForm = ({ onLoginSuccess }) => {
  // Core State Tracking
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); 
  const [showPassword, setShowPassword] = useState(false);
  
  // Track the checkbox tick status
  const [rememberMe, setRememberMe] = useState(false);

  // Status Tracking
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check for a saved email when the login page initially opens
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Form Submission handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password || !role) {
      setErrorMessage("Please fill out all fields and select a role.");
      return;
    }

    try {
      setLoading(true);
      
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role, 
      });

      if (response.data) {
        alert("Login Successful!");

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        if (onLoginSuccess) onLoginSuccess(role); 
      }
    } catch (error) {
      console.error("Backend Error Response:", error.response);
      setErrorMessage(
        error.response?.data?.message || "Connection to backend failed. Check CORS/Server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 p-3 sm:p-5 flex items-center justify-center">
      <div
        className="w-full min-h-[calc(100vh-24px)] sm:min-h-[calc(100vh-40px)] rounded-[24px] sm:rounded-[40px] overflow-y-auto bg-cover bg-center flex items-center justify-center lg:justify-start px-4 sm:px-10 md:px-16 lg:px-24 py-8"
        style={{ backgroundImage: `url(${Hero})` }}
      >
        <div className="w-full max-w-xl bg-white/90 backdrop-blur-md border border-white/50 rounded-[24px] sm:rounded-[32px] shadow-2xl p-6 sm:p-8 md:p-10 my-auto">
          
          {/* Logo Header Section */}
          <div className="flex flex-row justify-center items-center mb-6 sm:mb-8 gap-3 sm:gap-4">
            <img src={Logo} alt="logo" className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain" />
            <div className="leading-tight">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">Medicare</h1>
              <p className="text-lg sm:text-xl md:text-2xl tracking-[0.2em] font-black text-blue-700 mt-0.5">HOSPITAL</p>
            </div>
          </div>

          {/* Welcome Text Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 text-base sm:text-lg md:text-xl font-medium">Sign in to continue to your account</p>
          </div>

          {/* Error Banner Notification */}
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2.5 rounded-xl mb-6 font-semibold text-sm sm:text-base md:text-lg text-center">
              {errorMessage}
            </div>
          )}

          {/* Form Area */}
          <form className="space-y-4 sm:space-y-5 md:space-y-6" onSubmit={handleLoginSubmit}>
            
            {/* Email Input Field */}
            <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-sm">
              <MdOutlineMailOutline className="text-slate-400 text-2xl sm:text-3xl shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full ml-3 sm:ml-4 bg-transparent outline-none text-base sm:text-lg md:text-xl text-slate-800 placeholder-slate-400 font-medium"
                required
              />
            </div>

            {/* Password Input Field */}
            <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-xl sm:rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-sm">
              <RiLockPasswordFill className="text-slate-400 text-2xl sm:text-3xl shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full ml-3 sm:ml-4 bg-transparent outline-none text-base sm:text-lg md:text-xl text-slate-800 placeholder-slate-400 font-medium"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 text-xl sm:text-2xl ml-2 transition shrink-0"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-row justify-between items-center px-1 gap-2">
              <label className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-xl text-slate-600 cursor-pointer select-none font-medium">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600" 
                />
                Remember me
              </label>
              <a href="#" className="text-sm sm:text-base md:text-xl text-blue-700 font-bold hover:text-blue-800 hover:underline transition whitespace-nowrap">
                Forgot Password?
              </a>
            </div>

            {/* Role Grid Selection */}
            <div className="pt-2">
              <p className="font-bold text-base sm:text-lg md:text-xl text-slate-800 mb-3 sm:mb-4 px-1">Select Role</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Patient Selection Card */}
                <div 
                  onClick={() => setRole("Patient")}
                  className={`border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 ${
                    role === "Patient" ? "border-blue-600 bg-blue-100/70 ring-2 ring-blue-400" : "border-slate-200 bg-white"
                  }`}
                >
                  <FaUser className="text-2xl sm:text-3xl md:text-4xl text-green-500 mb-2" />
                  <p className="font-bold text-sm sm:text-base md:text-lg text-slate-700">Patient</p>
                </div>

                {/* Doctor Selection Card */}
                <div 
                  onClick={() => setRole("Doctor")}
                  className={`border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 ${
                    role === "Doctor" ? "border-blue-600 bg-blue-100/70 ring-2 ring-blue-400" : "border-slate-200 bg-white"
                  }`}
                >
                  <FaUserDoctor className="text-2xl sm:text-3xl md:text-4xl text-blue-500 mb-2" />
                  <p className="font-bold text-sm sm:text-base md:text-lg text-slate-700">Doctor</p>
                </div>

                {/* Staff Selection Card */}
                <div 
                  onClick={() => setRole("Staff")}
                  className={`border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 ${
                    role === "Staff" ? "border-blue-600 bg-blue-100/70 ring-2 ring-blue-400" : "border-slate-200 bg-white"
                  }`}
                >
                  <FaUserTie className="text-2xl sm:text-3xl md:text-4xl text-purple-500 mb-2" />
                  <p className="font-bold text-sm sm:text-base md:text-lg text-slate-700">Staff</p>
                </div>

                {/* Admin Selection Card */}
                <div 
                  onClick={() => setRole("Admin")}
                  className={`border rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shadow-sm hover:-translate-y-0.5 ${
                    role === "Admin" ? "border-blue-600 bg-blue-100/70 ring-2 ring-blue-400" : "border-slate-200 bg-white"
                  }`}
                >
                  <FaUserShield className="text-2xl sm:text-3xl md:text-4xl text-orange-500 mb-2" />
                  <p className="font-bold text-sm sm:text-base md:text-lg text-slate-700">Admin</p>
                </div>

              </div>
            </div>

            {/* Login Submission Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-lg sm:text-xl font-bold shadow-lg shadow-blue-700/20 hover:scale-[1.01] hover:shadow-xl hover:from-blue-800 hover:to-cyan-700 transition duration-300 mt-2 active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>

          {/* Secure Trust Footer Badge */}
          <div className="flex justify-center items-center mt-6 sm:mt-8 md:mt-10 pt-3 border-t border-slate-100">
            <FaShieldHalved className="text-blue-600 text-xl sm:text-2xl mr-2 sm:mr-3 shrink-0" />
            <p className="text-xs sm:text-sm md:text-base font-bold text-slate-600 tracking-wide text-center">Secure & Trusted Healthcare System</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default LoginForm;