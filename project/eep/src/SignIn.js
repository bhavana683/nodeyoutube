/*
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import GoogleLoginButton from './GoogleLoginButton'
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"

import ResetPassword from './ResetPassword.js'; // Correct path to ResetPassword.js

const SignIn = () => {
  const navigate = useNavigate();
  
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigateBasedOnRole = (role) => {
  
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "incharge") {
      navigate("/incharge");
    } else if (role === "technician") {
      navigate("/technician");
    } /*else if (role === "student") {
      navigate("/student/dashboard");
    } else {
      navigate("/"); // Default route if role is unknown
    }
  };

  async function  handleSignIn (e) {
    e.preventDefault();
    console.log('Sign-In with', { username, password });
    try
    {
      const response=await axios.post("http://localhost:7001/api/auth/login",{
        username,
        password
      },{
        headers:{
          "Content-Type":"application/json"
        },withCredentials:true
      })
      console.log("login successful");
      const{token,user}=response.data
      localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);

    // Redirect based on role
    navigateBasedOnRole(user.role);
    }
    catch(err){
    console.log(err)
    }
   
  };

  const handleGoogleSignIn = () => {
    console.log('Sign-In with Google');
   
  };

  const handleSignUp = () => {
    console.log('Navigate to Sign-Up Page');
    navigate('/SignUp' );
  };





  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign In </h2>
        <form  ation="POST"onSubmit={handleSignIn} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>
          <div style={styles.link} onClick={()=>{
            navigate('/ResetPassword')
          }}>Forgot password?</div>
            
          
          <div style={styles.actionsRow}>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              style={{ ...styles.roundedButton, backgroundColor: '#28a745' }}
            >
              Google
            </button>
            <button
              type="button"
              onClick={handleSignUp}
              style={{ ...styles.roundedButton, backgroundColor: '#FF7F50' }}
            >
              Sign Up
            </button>
          </div>
          <button
            type="submit"
            onClick={handleSignIn}
            style={{
              ...styles.roundedButton,
              backgroundColor: '#FF7F50',
              marginTop: '20px',
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );}
  const styles = {
    page: {
      backgroundColor: '#f7f8fa',
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
    link: {
      marginTop: '10px',
      color: '#007BFF',
      textDecoration: 'none',
      fontSize: '14px',
      alignSelf: 'flex-start',
    },
    actionsRow: {
      marginTop: '15px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    roundedButton: {
      flex: 1,
      padding: '10px',
      margin: '5px',
      border: 'none',
      borderRadius: '50px', 
      color: '#fff',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: 'bold',
      textAlign: 'center',
    },
};


export default SignIn;
*/
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import { BrowserRouter,Route,Navigate,useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin,useGoogleLogin} from "@react-oauth/google";

import {GoogleLoginButton} from "./GoogleLoginButton";
const clientId = "104041074711-krfvb3p7908jmc28sl1i3il8io663dc8.apps.googleusercontent.com "// Replace with your Google Client ID

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("googleUser"));
    if (storedUser) {
      setGoogleUser(storedUser);
    }
  }, []);

  const navigateBasedOnRole = (role) => {
    if (role === "admin") navigate("/admin");
    else if (role === "incharge") navigate("/incharge");
    else if (role === "technician") navigate("/technician");
  };

  async function handleSignIn(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7001/api/auth/login",
        { username, password },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("Login successful");
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      navigateBasedOnRole(user.role);
    } catch (err) {
      console.log(err);
    }
  }

  
 
  const handleGoogleSuccess = (response) => {
    console.log("Google Login Success:", response);
    const user = {
      name: response.credential, // Google user token (decode on backend)
    };
    setGoogleUser(user);
    localStorage.setItem("googleUser", JSON.stringify(user));
  };

  const handleGoogleFailure = () => {
    console.log("Google Login Failed");
  };

  const handleLogout = () => {
    localStorage.removeItem("googleUser");
    setGoogleUser(null);
    navigate("/"); // Redirect to sign-in page
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign In</h2>

        {googleUser ? (
          <div style={styles.profile}>
            <h3>Welcome, {googleUser.name}</h3>
            <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
          </div>
        ) : (
          <form onSubmit={handleSignIn} style={styles.form}>
            <div style={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                value={username}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                style={styles.input}
              />
            </div>

            <div style={styles.link} onClick={() => navigate("/ResetPassword")}>
              Forgot password?
            </div>

            <button type="submit" style={styles.roundedButton}>Sign In</button>
         
 <p >
          Do not  have an account? <Link to="/signup" className="auth-link">Register here</Link>
          </p>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: "#f7f8fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  container: { maxWidth: "400px", padding: "30px", backgroundColor: "#ffffff", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center", fontFamily: "Arial, sans-serif" },
  title: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "15px", textAlign: "left" },
  input: { width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" },
  link: { marginTop: "10px", color: "#007BFF", textDecoration: "none", fontSize: "14px", cursor: "pointer" },
  roundedButton: { padding: "10px", margin: "10px 0", border: "none", borderRadius: "50px", color: "#fff", backgroundColor: "#FF7F50", cursor: "pointer", fontSize: "16px", fontWeight: "bold" },
  profile: { textAlign: "center", marginBottom: "20px" },
  logoutButton: { backgroundColor: "#d9534f", color: "#fff", padding: "10px", border: "none", borderRadius: "5px", cursor: "pointer" },
};

export default SignIn;

