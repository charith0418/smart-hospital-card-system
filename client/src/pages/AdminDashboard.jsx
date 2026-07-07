import React from "react";

import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavebar";
import StatCard from "../components/StatCard";
import OverviewChart from "../components/OverviewChart";
import ActivityChart from "../components/ActivityChart";
import ActivityLogs from "../components/ActivityLogs";


import {
  FaUsers,
  FaUserMd,
  FaUserNurse,
  FaCalendarCheck,
} from "react-icons/fa";


export default function AdminDashboard() {


  // TEMPORARY DATA (later replace with backend API)

  const dashboard = {

    admin: {
      name: "John Admin",
    },


    stats: {

      patients: 2450,
      patientsGrowth: "+12%",

      doctors: 85,
      doctorsGrowth: "+5%",

      staff: 120,
      staffGrowth: "+8%",

    },


    overview: [

      {
        month: "Jan",
        patients: 400,
    
      },

      {
        month: "Feb",
        patients: 600,
   
      },

      {
        month: "Mar",
        patients: 800,
    
      },

      {
        month: "Apr",
        patients: 1000,
   
      },

      {
        month: "May",
        patients: 1200,

      },

      {
        month: "Jun",
        patients: 1500,
      }

    ],


    activity: [

      {
        name: "Patients",
        value: 60
      },

      {
        name: "Doctors",
        value: 15
      },

      {
        name: "Staff",
        value: 10
      },

    ],


    activityLogs: [

      {
        id:1,
        type:"patient",
        title:"New Patient Registered",
        description:"A new patient joined the system",
        date:"2026-07-07",
        time:"10:30 AM"
      },


      {
        id:2,
        type:"doctor",
        title:"Doctor Profile Updated",
        description:"Doctor information updated",
        date:"2026-07-07",
        time:"11:20 AM"
      },


    ],


    security: {

      serverStatus:"Online",
      databaseStatus:"Online",
      apiStatus:"Online",
      securityStatus:"Online"

    }

  };


  return (

    <div className="flex h-screen bg-gray-100 overflow-hidden">

        <div className="w-72 flex-shrink-0">
            <AdminSidebar />
        </div>

  <main className="flex-1 overflow-y-auto p-8">


        <AdminNavbar
          admin={dashboard.admin}
        />



        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">


          <StatCard
            title="Patients"
            value={dashboard.stats.patients}
            change={dashboard.stats.patientsGrowth}
            icon={<FaUsers />}
          />


          <StatCard
            title="Doctors"
            value={dashboard.stats.doctors}
            change={dashboard.stats.doctorsGrowth}
            icon={<FaUserMd />}
          />


          <StatCard
            title="Staff"
            value={dashboard.stats.staff}
            change={dashboard.stats.staffGrowth}
            icon={<FaUserNurse />}
          />


        </div>



        {/* Charts */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">


          <div className="xl:col-span-2">

            <OverviewChart
              data={dashboard.overview}
            />

          </div>


          <ActivityChart
            data={dashboard.activity}
          />


        </div>




        {/* Bottom Section */}


        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 mt-6">


          <div className="xl:col-span-2">

            <ActivityLogs
              logs={dashboard.activityLogs}
            />

          </div>



        </div>


      </main>


    </div>

  );

}