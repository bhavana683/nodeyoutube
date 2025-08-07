/*
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from "axios";
import SignIn from "SignIn";
const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Load role from localStorage (Prevents unnecessary state updates)
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    designation: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: localStorage.getItem("userRole") || "", // ✅ Load role from storage
  });

  const [errors, setErrors] = useState({});

  // ✅ Ensure role is pre-filled on mount
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setFormData((prev) => ({ ...prev, role: storedRole }));
    }
  }, []);

  // ✅ Handle input changes correctly
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Role Selection (Updated to Set Role in `formData`)
  const handleSelection = (e) => {
    setFormData((prev) => ({ ...prev, role: e.target.value }));
    localStorage.setItem("role", e.target.value); // Save role to localStorage
  };
  

  // ✅ Form validation function
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.contact || formData.contact.length !== 10)
      newErrors.contact = "Contact must be a 10-digit number.";
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.username || !/\S+@\S+\.\S+/.test(formData.username))
      newErrors.username = "Enter a valid email.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  // ✅ Handle Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
   const username= formData.username
    const password=formData.password
    const role=localStorage.getItem('role')
    const name= formData.name
    const contact= formData.contact
    const designation= formData.designation
    const dob= formData.dob

    console.log(username,password,role,name,contact,designation,dob)
    try {
      await axios.post("http://localhost:7001/api/auth/register", {
       username,password,role,name,contact,designation,dob // ✅ Role is correctly passed
      },{headers:{
        "Content-Type":"application/json"
      },withCredentials:true
    });

      console.log("Sign-up successful!");
      localStorage.removeItem("userRole"); // ✅ Clear role after signup
      navigate("/SignIn");
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message || "An error occurred during signup.");
      } else {
        setErrorMessage("Server is unreachable. Please try again later.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign Up</h2>
        <form onSubmit={handleSignUp} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required style={styles.input} />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="contact">Contact</label>
            <input type="number" id="contact" value={formData.contact} onChange={handleChange} placeholder="Enter your contact number" required style={styles.input} />
            {errors.contact && <span style={styles.error}>{errors.contact}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="designation">Designation</label>
            <input type="text" id="designation" value={formData.designation} onChange={handleChange} placeholder="Enter your designation" required style={styles.input} />
            {errors.designation && <span style={styles.error}>{errors.designation}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input type="date" id="dob" value={formData.dob} onChange={handleChange} required style={styles.input} />
            {errors.dob && <span style={styles.error}>{errors.dob}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input type="email" id="username" value={formData.username} onChange={handleChange} placeholder="Enter your email" required style={styles.input} />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input type={showPassword ? "text" : "password"} id="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required style={styles.input} />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type={showPassword ? "text" : "password"} id="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required style={styles.input} />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>

          <div style={styles.inputGroup}>
            <label>
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> Show Password
            </label>
          </div>

          <div style={styles.inputGroup}>
            <label>User Type</label>
            <select id="role" value={formData.role} onChange={handleSelection} style={styles.input} aria-label="User type selection">
              <option value="" disabled>Select User Type</option>
              <option value="technician">technician</option>
              <option value="incharge"> incharge</option>
              <option value="admin">admin</option>
              <option value="SubAdmin">SubAdmin</option>
            </select>
          </div>

          <button type="submit" style={styles.roundedButton}>Sign Up</button>
          <p >
          Already have an account? <Link to="/signin" className="auth-link">Login here</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: { backgroundColor: "#f7f8fa", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" },
  container: { maxWidth: "400px", padding: "30px", backgroundColor: "#fff", border: "1px solid #ddd", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center" },
  title: { marginBottom: "20px", color: "#333" },
  form: { display: "flex", flexDirection: "column" },
  inputGroup: { marginBottom: "15px", textAlign: "left" },
  input: { width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "4px" },
  error: { color: "red", fontSize: "12px" },
  roundedButton: { padding: "10px", border: "none", borderRadius: "50px", color: "#fff", cursor: "pointer", fontSize: "16px", fontWeight: "bold", textAlign: "center", width: "100%", backgroundColor: "#FF7F50" },
};

export default SignUp;
*/
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation,Link} from "react-router-dom";
import axios from "axios";
import SignIn from "SignIn";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    designation: "",
    dob: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "", // Will be set from location state
  });

  const [errors, setErrors] = useState({});

  // Set role from navigation state when component mounts
  useEffect(() => {
    if (location.state?.role) {
      setFormData(prev => ({ ...prev, role: location.state.role }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.contact || formData.contact.length !== 10)
      newErrors.contact = "Contact must be a 10-digit number.";
    if (!formData.designation) newErrors.designation = "Designation is required.";
    if (!formData.dob) newErrors.dob = "Date of birth is required.";
    if (!formData.username || !/\S+@\S+\.\S+/.test(formData.username))
      newErrors.username = "Enter a valid email.";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    if (!formData.role) newErrors.role = "User type is required.";
    return newErrors;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await axios.post("http://localhost:7001/api/auth/register", {
        username: formData.username,
        password: formData.password,
        role: formData.role,
        name: formData.name,
        contact: formData.contact,
        designation: formData.designation,
        dob: formData.dob
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      navigate("/SignIn");
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || 
        "Server is unreachable. Please try again later."
      );
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Sign Up</h2>
        {errorMessage && <p style={styles.formError}>{errorMessage}</p>}
        <form onSubmit={handleSignUp} style={styles.form}>
          {/* Name Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>

          {/* Contact Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="contact">Contact</label>
            <input
              type="number"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Enter 10-digit number"
              required
              style={styles.input}
            />
            {errors.contact && <span style={styles.error}>{errors.contact}</span>}
          </div>

          {/* Designation Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              value={formData.designation}
              onChange={handleChange}
              placeholder="Enter your designation"
              required
              style={styles.input}
            />
            {errors.designation && <span style={styles.error}>{errors.designation}</span>}
          </div>

          {/* Date of Birth Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              style={styles.input}
            />
            {errors.dob && <span style={styles.error}>{errors.dob}</span>}
          </div>

          {/* Email Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
            {errors.username && <span style={styles.error}>{errors.username}</span>}
          </div>

          {/* Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 chars)"
              required
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
              style={styles.input}
            />
            {errors.confirmPassword && <span style={styles.error}>{errors.confirmPassword}</span>}
          </div>

          {/* Show Password Checkbox */}
          <div style={styles.inputGroup}>
            <label>
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              Show Password
            </label>
          </div>

          {/* Role Field (read-only if passed from home page) */}
          <div style={styles.inputGroup}>
            <label htmlFor="role">User Type</label>
            <input
              type="text"
              id="role"
              value={formData.role}
              readOnly
              style={styles.input}
            />
          </div>

          <button type="submit" style={styles.roundedButton}>
            Complete Registration
          </button>
          <p >
                    Already have an account? <Link to="/signin" className="auth-link">login here</Link>
                    </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  page: { 
    backgroundColor: "#f7f8fa", 
    minHeight: "100vh", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  container: { 
    maxWidth: "400px", 
    padding: "30px", 
    backgroundColor: "#fff", 
    border: "1px solid #ddd", 
    borderRadius: "8px", 
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
    textAlign: "center" 
  },
  title: { 
    marginBottom: "20px", 
    color: "#333" 
  },
  form: { 
    display: "flex", 
    flexDirection: "column" 
  },
  inputGroup: { 
    marginBottom: "15px", 
    textAlign: "left" 
  },
  input: { 
    width: "100%", 
    padding: "10px", 
    marginTop: "5px", 
    border: "1px solid #ccc", 
    borderRadius: "4px" 
  },
  error: { 
    color: "red", 
    fontSize: "12px" 
  },
  formError: {
    color: "red",
    backgroundColor: "#ffeeee",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px"
  },
  roundedButton: { 
    padding: "12px", 
    border: "none", 
    borderRadius: "4px", 
    color: "#fff", 
    cursor: "pointer", 
    fontSize: "16px", 
    fontWeight: "bold", 
    backgroundColor: "#4CAF50",
    marginTop: "10px"
  },
};

export default SignUp;
