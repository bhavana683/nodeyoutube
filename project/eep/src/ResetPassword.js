'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SignIn from 'SignIn';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    username: '',
    newPassword: '',
    confirmPassword: '',
  });
  const navigate =useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try{
      const username=formData.username
      const newPassword=formData.newPassword
      const response=await axios.post("http://localhost:7001/api/auth/ResetPassword",{
       username,newPassword
        
      },{
        headers:{
          "Content-Type":"application/json"
        },withCredentials:true
      })
      console.log("password reseted")
      
        navigate("/SignIn")
      
    }
    catch(err){
      console.log(err)
    }

    if (formData.newPassword !== formData.confirmPassword) {
      console.error('Passwords do not match');
    } else {
      console.log('Password reset with', formData);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Reset Password</h2>
        <form  action="POST"onSubmit={handleReset} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="captcha">Enter user name</label>
            <input
              type="email"
              id="username"
              value={formData.captcha}
              onChange={handleChange}
              placeholder="Enter email id"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={formData.newpassword}
              onChange={handleChange}
              placeholder="Enter your new password"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your new password"
              required
              style={styles.input}
            />
          </div>
          <button
            type="submit"
            style={{
              ...styles.roundedButton,
              backgroundColor: '#FF7F50',
              marginTop: '20px',
            }}
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
const styles = {
  page: {
    backgroundColor: '#ffe4e1', // Light pink background
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  roundedButton: {
    padding: '10px',
    border: 'none',
    borderRadius: '50px', // Fully rounded corners
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
};

export default ResetPassword;
