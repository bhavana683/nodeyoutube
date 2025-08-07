import React,{ useState } from "react";

import ViewHistory from "./components/Technician/TechViewHistory";
import LabUpdate from "./LabUpdate";
import IssueUpdate from "./components/Technician/TechIssueUpdate";
import DashboardHome from "./DashboardHome";
const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("DashboardHome");
  const renderComponent = () => {
    switch (activeComponent) {
      case "ViewHistory":
        return <ViewHistory />;
      case "LabUpdate":
        return <LabUpdate />;
      case "IssueUpdate":
        return <IssueUpdate />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={styles.container}>

      <header style={styles.header}>
        <h1 style={styles.title}>Admin</h1>
        <img
          src="https://images.app.goo.gl/rA6LrAvnai97zqrK7"
          
          alt="Profile Icon"
          style={styles.profileIcon}
        />
      </header>

      <nav style={styles.navbar}>
      <button style={styles.navButton} onClick={() => setActiveComponent("DashboardHome")}>Home</button>
        <button style={styles.navButton} onClick={() => setActiveComponent("ViewHistory")}>View History</button>
        <button style={styles.navButton}onClick={() => setActiveComponent("LabUpdate")}>Lab Update</button>
        <button style={styles.navButton} onClick={() => setActiveComponent("IssueUpdate")}>Issue Update</button>
      </nav>

      <main style={styles.mainContent}>
        <h2 style={styles.welcomeText}>Welcome, Admin!</h2>
        <p style={styles.description}>
        </p>
        <div className="dynamic-content">{renderComponent()}</div>
      
    
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundImage: 'url('/')',  // Replace with your desired background image
    backgroundRepeat: 'no-repeat',
   
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundSize: "cover",
    height: "100vh",
    color: "#333",
    padding: "20px",
  
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "20px",
    borderBottom: "1px solid #ccc",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: 0,
  },
  profileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    border: "2px solid #333",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    margin: "20px 0",
  },
  navButton: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  mainContent: {
    textAlign: "center",
    marginTop: "20px",
  },
  welcomeText: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  description: {
    fontSize: "16px",
    lineHeight: "1.6",
    width: "80%",
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.9)",
    padding: "15px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default AdminDashboard;

