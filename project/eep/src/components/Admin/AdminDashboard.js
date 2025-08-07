

import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";  // Import Outlet for nested routing
import "styles/Admin.css"; // Adjusted import path
import UserProfile from "components/UserProfile";
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("DashboardHome");

  return (
   <div className="admin-container">
         <header className="header">
           <h1 className="title">Admin Dashboard</h1>
           <div className="profile-section" >
             <UserProfile theme="dark"/>
           </div>
         </header>

      <nav className="navbar">
      <Link to="/admin">
          <button className="navButton">Home</button>
        </Link>
        <Link to="view-history">
          <button className="navButton">View History</button>
        </Link>
        <Link to="lab-update">
          <button className="navButton">Lab Update</button>
        </Link>
       
      </nav>

      <main className="mainContent">
        <h2 className="welcomeText">Welcome, Admin!</h2>
        <div className="description">
        {/* Outlet will render the child routes */}
        <div className="dynamic-content">
          <Outlet />
        </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

