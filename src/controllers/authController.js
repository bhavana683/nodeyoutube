/*const { Oauth2Client, oauth2client } = require("../utils/googleConfig");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const User=require("../models/userModel")
const axios= require('axios')
require('dotenv').config()

const register=async(req,res)=>{

  

  try {
    const { username, password, role,name,contact,designation,dob } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role,name,contact,designation,dob});

    await newUser.save();
    res.status(201).json({ message: `User registered with username ${username}` });

  } catch (error) {
    console.error("Error during registration:", error); 
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


const googleLogin = async (req, res) => {

 try{
 const {code}=req.query;
 const googleRes=await oauth2client.getToken(code)
 oauth2client.setCredentials(googleRes.tokens)
 const userRes=await axios.get( `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
const {email,name,picture}=userRes.data; 
const username=email
const role='admin'
const pass=`${username}@123`
const password=await bcrypt.hash(pass, 10);
let user=await User.findOne({username});
if(!user){
  user=await User.create({
    name,username,password,image:picture,role
  })
}
const{_id}=user;
 const token=jwt.sign(
      {id:user._id,role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}

     
    )
     req.session.userEmail = username;
    req.session.userId = user._id;
    return ( res.status(200).json({message:'success',token,
      user
    }))
}
 catch(err){
  console.log(err)
res.status(500).json({message:'internal error'})
 }
};




const login=async(req,res)=>{
try{
  const {username,password}=req.body;
  const user=await User.findOne({username})
    if(!user){
      return res.status(404).json({message:`user with ${username} not found`})
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return res.status(400).json({message:`Invalid credentials`})
    }
    const token=jwt.sign(
      {id:user._id,role:user.role,  },
      process.env.JWT_SECRET,
      {expiresIn:"1h"}

     
    )
    req.session.userEmail = user.username;
    console.log("Session set with:", req.session.userEmail);
    var uname=req.session.userEmail
  

    res.status(200).json({token,user:{id:user._id, username:user.username,role:user.role}})
  }
  catch(err){
    res.status(500).json({message:`something went wrong`})
  }
}

const ResetPassword=async(req,res)=>{
  try{
    const {username,newpassword}=req.body;
    if (!username || !newpassword) {
      return res.status(400).json({ message: "Username and new password are required" });
    }
    const user=await User.findOne({username})
      if(!user){
        return res.status(404).json({message:`user with ${username} not found`})
       
      }
      else{
        console.log("user found")
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      user.password ={ hashedPassword};
      console.log(user.password)
      console.log(newpassword)

await user.save();

res.status(401).json({ message: "Password reset successfully" });}

    }
    catch(err){
      console.log(err)
      res.status(500).json({message:`something went wrong`})
    }
}
// 🔹 **Logout Function**
const logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "Logged out successfully" });
  });
};
const getCurrentUser = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated"
      });
    }

    const user = await User.findOne({ username: req.session.user.username })
      .select('-password -__v');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        contact: user.contact,
        designation: user.designation,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Get current user error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch current user",
      error: error.message
    });
  }
};
// Add these methods to authController.js

// Get session data
const getSession = async (req, res) => {
  try {
    if (!req.session.userEmail) {
      return res.status(401).json({
        success: false,
        message: "Session not found"
      });
    }

    return res.status(200).json({
      success: true,
      userEmail: req.session.userEmail
    });

  } catch (error) {
    console.error('Get session error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to get session",
      error: error.message
    });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ username: email }).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        contact: user.contact,
        designation: user.designation,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
};


module.exports = {
  register,
  login,
  ResetPassword,
  googleLogin,
  logout,
  getCurrentUser,
  getSession,
  getUserByEmail,

};*/
const { Oauth2Client, oauth2client } = require("../utils/googleConfig");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const axios = require('axios');
require('dotenv').config();

// Helper function to validate email
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Helper function to validate phone number
const isValidPhone = (phone) => {
  return /^\d{10}$/.test(phone);
};

// User Registration
const register = async (req, res) => {
  try {
    const { username, password, role, name, contact, designation, dob } = req.body;

    // Validate required fields
    if (!username || !password || !role || !name || !contact || !designation || !dob) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Validate email format
    if (!isValidEmail(username)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // Validate phone number
    if (!isValidPhone(contact)) {
      return res.status(400).json({ 
        success: false,
        message: "Phone number must be 10 digits" 
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      name,
      contact,
      designation,
      dob: new Date(dob),
      lastLogin: new Date()
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set session
    req.session.userEmail = username;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role,
        name: newUser.name,
        contact: newUser.contact,
        designation: newUser.designation
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// User Login
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Basic validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required"
      });
    }

    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set session
    req.session.userEmail = user.username;

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        contact: user.contact,
        designation: user.designation,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};

// Google OAuth Login
const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code is required"
      });
    }

    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    
    const { email, name, picture } = userRes.data;
    const username = email;
    const role = 'admin'; // Default role for Google users
    const pass = `${username}@123`; // Temporary password
    const password = await bcrypt.hash(pass, 12);

    // Find or create user
    let user = await User.findOne({ username });
    if (!user) {
      user = await User.create({
        name,
        username,
        password,
        image: picture,
        role
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Set session
    req.session.userEmail = username;
    req.session.userId = user._id;

    return res.status(200).json({
      success: true,
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Google login error:', error);
    return res.status(500).json({
      success: false,
      message: "Google authentication failed",
      error: error.message
    });
  }
};

// Reset Password
const ResetPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    if (!username || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Username and new password are required"
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    });

  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
      error: error.message
    });
  }
};

// User Logout
const logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error('Session destruction error:', err);
        return res.status(500).json({
          success: false,
          message: "Logout failed"
        });
      }

      res.clearCookie('connect.sid');
      return res.status(200).json({
        success: true,
        message: "Logged out successfully"
      });
    });
  } catch (error) {
    console.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message
    });
  }
};

// Get session data
const getSession = async (req, res) => {
  try {
    if (!req.session.userEmail) {
      return res.status(401).json({
        success: false,
        message: "Session not found"
      });
    }

    return res.status(200).json({
      success: true,
      userEmail: req.session.userEmail
    });

  } catch (error) {
    console.error('Get session error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to get session",
      error: error.message
    });
  }
};

// Get user by email
const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findOne({ username: email }).select('-password -__v');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
        contact: user.contact,
        designation: user.designation,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  ResetPassword,
  logout,
  getSession,
  getUserByEmail
};