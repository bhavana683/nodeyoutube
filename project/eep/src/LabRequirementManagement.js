/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LabRequirementManagement = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelection = () => {
    if (!userType) {
      setErrorMessage('Please select a user type before proceeding.');
    } else {
      setErrorMessage('');
      navigate('/SignUp'); // Navigate to SignIn page
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'url(/background.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <h1 style={{ color: 'red' }}>Lab Requirement Management</h1>
      <select
        id="options"
        value={userType}
        onChange={(e) => setUserType(e.target.value)}
        style={styles.select}
        aria-label="User type selection"
      >
        <option value="" disabled>
          Select User Type
        </option>
        <option value="Technician">Technician</option>
        <option value="Lab Incharge">Lab Incharge</option>
        <option value="Admin">Admin</option>
        <option value="SubAdmin">SubAdmin</option>
      </select>
      <br />
      <button onClick={handleSelection} style={styles.button}>
        Ok
      </button>
      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
    </div>
  );
};

const styles = {
  select: {
    fontSize: '16px',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
  },
  button: {
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4CAF50',
    color: 'white',
    cursor: 'pointer',
  },
  error: {
    color: 'yellow',
    marginTop: '10px',
  },
};

export default LabRequirementManagement;*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LabRequirementManagement = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSelection = () => {
    if (!userType) {
      setErrorMessage('Please select a user type before proceeding.');
    } else {
      setErrorMessage('');
      navigate('/SignUp', { state: { role: userType } });
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.title}>Lab Management System</h1>
          <p style={styles.subtitle}>Streamline your laboratory operations and equipment maintenance</p>
        </div>
      </div>

      <div style={styles.mainContent}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Get Started</h2>
          
          <div style={styles.formGroup}>
            <label htmlFor="userType" style={styles.label}>
              Select Your Role
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={styles.select}
              aria-label="User type selection"
            >
              <option value="" disabled>Select User Type</option>
              <option value="technician">Technician</option>
              <option value="incharge">Lab Incharge</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {errorMessage && <p style={styles.error}>{errorMessage}</p>}

          <button 
            onClick={handleSelection}
            style={styles.button}
            disabled={!userType}
          >
            Continue to Registration
          </button>
        </div>

        <div style={styles.features}>
          <h3 style={styles.featuresTitle}>Key Features</h3>
          <ul style={styles.featuresList}>
            <li style={styles.featureItem}>✔ Equipment maintenance tracking</li>
            <li style={styles.featureItem}>✔ Role-based access control</li>
            <li style={styles.featureItem}>✔ Real-time issue reporting</li>
            <li style={styles.featureItem}>✔ Comprehensive dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f8f9fa',
    fontFamily: 'Arial, sans-serif',
  },
  hero: {
    background: 'linear-gradient(135deg, #1a3a8f 0%, #2a5cb8 100%)',
    color: 'white',
    padding: '3rem 1rem',
    textAlign: 'center',
  },
  heroContent: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    fontWeight: '600',
  },
  subtitle: {
    fontSize: '1.2rem',
    opacity: 0.9,
  },
  mainContent: {
    maxWidth: '1000px',
    margin: '2rem auto',
    padding: '0 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '2rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  cardTitle: {
    color: '#2a5cb8',
    marginTop: 0,
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '500',
    color: '#333',
  },
  select: {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '14px',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#2a5cb8',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    marginTop: '1rem',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
  error: {
    color: '#e74c3c',
    backgroundColor: '#fdecea',
    padding: '10px',
    borderRadius: '4px',
    marginTop: '1rem',
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  featuresTitle: {
    color: '#2a5cb8',
    marginTop: 0,
    marginBottom: '1rem',
    textAlign: 'center',
  },
  featuresList: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  featureItem: {
    padding: '8px 0',
    color: '#333',
    fontSize: '0.95rem',
  },
};

export default LabRequirementManagement;