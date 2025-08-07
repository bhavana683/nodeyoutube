import React from "react";
import { Outlet,Link } from "react-router-dom"; // For navigation links
import "styles/Technician.css"; // Adjusted import path for the stylesheet
import UserProfile from "components/UserProfile";
const Technician = () => {
  return (
    <div className="tech-container">
          <header className="header">
            <h1 className="title">Technician Dashboard</h1>
            <div className="profile-section">
              <UserProfile theme="light"/>
            </div>
          </header>

      <nav className="navbar">
      <Link to="/technician">
          <button className="navButton">Home</button>
        </Link>
        <Link to="/technician/accept">
          <button className="navButton">Accept</button>
        </Link>
        <Link to="/technician/techviewhi">
          <button className="navButton">View History</button>
        </Link>
        <Link to="/technician/techlab-update">
          <button className="navButton">Lab Updates</button>
        </Link>
        <Link to="/technician/techissue-update">
          <button className="navButton">Issue update</button>
        </Link>
        
      </nav>

      <main className="mainContent">
        <h2 className="welcomeText">Welcome, Technician!</h2>
        <div id="techdescription">
        <div className="dynamic-content" >
          <Outlet />
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default Technician;
