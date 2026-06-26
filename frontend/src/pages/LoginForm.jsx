// import React, { useState } from "react";
// import Logo from "../assets/logo.png";
// import Hero from "../assets/hero.png";

// import {
//   FaEye,
//   FaEyeSlash,
//   FaShieldHalved,
//   FaUserDoctor,
//   FaUserShield,
//   FaUserTie,
// } from "react-icons/fa6";

// import { FaUser } from "react-icons/fa";
// import { MdOutlineMailOutline } from "react-icons/md";
// import { RiLockPasswordFill } from "react-icons/ri";

// const App = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-200 p-5">
//       {/* Background Container */}
//       <div
//         className="min-h-[calc(100vh-40px)] rounded-[40px] overflow-hidden bg-cover bg-center flex items-center px-6 md:px-16"
//         style={{ backgroundImage: `url(${Hero})` }}
//       >
//         {/* Login Card - Increased width constraint to max-w-xl & shifted right */}
//         <div className="w-full max-w-xl bg-white/85 backdrop-blur-md border border-white/50 rounded-[32px] shadow-2xl p-10 md:p-10 lg:mr-auto lg:ml-28 xl:mr-16">
          
//           {/* Logo Header Section */}
//           <div className="flex justify-center items-center mb-10 gap-4">
//             <img
//               src={Logo}
//               alt="logo"
//               className="w-24 h-24 object-contain"
//             />
//             <div className="leading-tight">
//               <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
//                 Medicare
//               </h1>
//               <p className="text-2xl tracking-[0.2em] font-black text-blue-700 mt-0.5">
//                 HOSPITAL
//               </p>
//             </div>
//           </div>

//           {/* Welcome Text Header */}
//           <div className="text-center mb-10">
//             <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
//               Welcome Back
//             </h2>
//             <p className="text-slate-500 mt-3 text-xl font-medium">
//               Sign in to continue to your account
//             </p>
//           </div>

//           {/* Form Area */}
//           <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
//             {/* Email Input Field */}
//             <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-2xl px-6 py-4.5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-sm">
//               <MdOutlineMailOutline className="text-slate-400 text-3xl shrink-0" />
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className="w-full ml-4 bg-transparent outline-none text-xl text-slate-800 placeholder-slate-400 font-medium"
//               />
//             </div>

//             {/* Password Input Field */}
//             <div className="flex items-center bg-slate-50/80 border border-slate-200 rounded-2xl px-6 py-4.5 focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-100 focus-within:bg-white transition-all shadow-sm">
//               <RiLockPasswordFill className="text-slate-400 text-3xl shrink-0" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="w-full ml-4 bg-transparent outline-none text-xl text-slate-800 placeholder-slate-400 font-medium"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="text-slate-400 hover:text-slate-600 text-2xl ml-2 transition shrink-0"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </button>
//             </div>

//             {/* Remember Me & Forgot Password Layout */}
//             <div className="flex justify-between items-center px-1">
//               <label className="flex items-center gap-3 text-xl text-slate-600 cursor-pointer select-none font-medium">
//                 <input 
//                   type="checkbox" 
//                   className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600" 
//                 />
//                 Remember me
//               </label>

//               <a
//                 href="#"
//                 className="text-xl text-blue-700 font-bold hover:text-blue-800 hover:underline transition"
//               >
//                 Forgot Password?
//               </a>
//             </div>

//             {/* Role Grid Selection */}
//             <div className="pt-2">
//               <p className="font-bold text-xl text-slate-800 mb-4 px-1">
//                 Select Role
//               </p>

//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 {/* Patient Selection Card */}
//                 <div className="border border-slate-200 rounded-2xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50/50 hover:shadow-md">
//                   <FaUser className="text-4xl text-green-500 mb-3" />
//                   <p className="font-bold text-lg text-slate-700">Patient</p>
//                 </div>

//                 {/* Doctor Selection Card */}
//                 <div className="border border-slate-200 rounded-2xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50/50 hover:shadow-md">
//                   <FaUserDoctor className="text-4xl text-blue-500 mb-3" />
//                   <p className="font-bold text-lg text-slate-700">Doctor</p>
//                 </div>

//                 {/* Staff Selection Card */}
//                 <div className="border border-slate-200 rounded-2xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50/50 hover:shadow-md">
//                   <FaUserTie className="text-4xl text-purple-500 mb-3" />
//                   <p className="font-bold text-lg text-slate-700">Staff</p>
//                 </div>

//                 {/* Admin Selection Card */}
//                 <div className="border border-slate-200 rounded-2xl p-5 flex flex-col items-center cursor-pointer transition-all duration-300 bg-white shadow-sm hover:-translate-y-1 hover:border-blue-600 hover:bg-blue-50/50 hover:shadow-md">
//                   <FaUserShield className="text-4xl text-orange-500 mb-3" />
//                   <p className="font-bold text-lg text-slate-700">Admin</p>
//                 </div>
//               </div>
//             </div>

//             {/* Login Submission Action Button */}
//             <button
//               type="submit"
//               className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-blue-700 to-cyan-600 text-white text-xl font-bold shadow-lg shadow-blue-700/20 hover:scale-[1.01] hover:shadow-xl hover:from-blue-800 hover:to-cyan-700 transition duration-300 mt-4 active:scale-[0.99]"
//             >
//               Login
//             </button>
//           </form>

//           {/* Secure Trust Footer Badge */}
//           <div className="flex justify-center items-center mt-10 pt-2 border-t border-slate-100">
//             <FaShieldHalved className="text-blue-600 text-2xl mr-3" />
//             <p className="text-base font-bold text-slate-600 tracking-wide">
//               Secure & Trusted Healthcare System
//             </p>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;