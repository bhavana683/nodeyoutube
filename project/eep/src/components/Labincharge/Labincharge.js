import React from "react";
import 'styles/Labincharge.css'; // Import the CSS file
import { Outlet, Link } from "react-router-dom";
import UserProfile from "components/UserProfile";
const Labincharge = () => {
  return (
    <div className="incharge-container">
      <header className="header">
        <h1 className="title" >Lab incharge Dashboard</h1>
        <div className="profile-section">
          <UserProfile theme="dark" />
        </div>
      </header>

      <nav className="navbar">
      <Link to="/incharge">
          <button className="navButton">Home</button>
        </Link>
        <Link to="inview_history">
          <button className="navButton">View History</button>
        </Link>
        <Link to="inlab-update">
          <button className="navButton">Lab Update</button>
        </Link>
       
        <Link to="inupload-issue">
          <button className="navButton">Upload issue</button>
        </Link>
      </nav>

      <main className="mainContent">
        <h2 className="welcomeText">Welcome, Labincharge!</h2>
        <p className="description">
        
        <div className="dynamic-content">
          <Outlet />
        </div>
        </p>
      </main>
    </div>
  );
};

export default Labincharge;/*
'use client';
import React from "react";
import { Link } from "react-router-dom";  // Import Link for routing
import 'styles/Technician.css';  // Import the Technician CSS

const Technician = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Technician</h1>
        <img
          src="https://via.placeholder.com/40"
          alt="Profile Icon"
          className="profileIcon"
        />
      </header>

      <nav className="navbar">
        
        <Link to="accept" className="navButton">Accept</Link>
        <Link to="view-history" className="navButton">View History</Link>
        <Link to="lab-updates" className="navButton">Lab Updates</Link>
        <Link to="issue-updates" className="navButton">Issue Updates</Link>
      </nav>

      <main className="mainContent">
        <h2 className="welcomeText">Welcome, Technician!</h2>
        <p className="description">
          
        </p>
      </main>
    </div>
  );
};

export default Technician;*/
