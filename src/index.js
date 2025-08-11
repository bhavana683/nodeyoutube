/*
const express =require("express")
const dotenv=require("dotenv").config();
const dbConnect=require("./config/dbConnect")
const authRoutes=require("./routes/authRoutes")
const userRoutes=require("./routes/userRoutes")
const cors=require("cors")
const multer=require('multer')
const path=require('path')
const MongoStore = require('connect-mongo');
const session = require("express-session");
const cookieParser = require("cookie-parser"); 
dbConnect();

const app=express();
//Middleware
app.use(express.json())
app.use(express.urlencoded({extend:true}))


app.use(cors({
  origin:"https://labrfrontend.onrender.com",
  methods:["GET" ,"POST","PUT","DELETE"],
  credentials:true,
 exposedHeaders: ['Authorization', 'Set-Cookie'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie','Accept']}))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key', // Use a strong secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING, // MongoDB connection string
    ttl: 24 * 60 * 60, // 7 days in seconds
    autoRemove: 'native', // Use MongoDB's TTL index
    collectionName: 'sessions' // Collection to store sessions
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    secure: true, // HTTPS in production
    sameSite: 'none',
       domain: '.onrender.com'
  }
}));
//Routes
app.use("/api/auth",authRoutes)
app.use("/api/users/",userRoutes)
 app.use('/uploads', express.static(path.join(__dirname, 'file/labupload')));




const PORT=process.env.PORT||7000
app.listen(PORT,()=>{
  console.log(`server is running at port${PORT}`)
}
)*/
require('dotenv').config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const multer = require('multer');
const path = require('path');
const MongoStore = require('connect-mongo');
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Initialize database connection
dbConnect();

const app = express();

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Fixed typo from 'extend' to 'extended'

// CORS Configuration
app.use(cors({
  origin: "https://labrfrontend.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie', 'Accept']
}));

// Cookie and Session Middleware
app.use(cookieParser());

// Session Configuration
app.use(session({
  name: 'labr.sid', // Custom session cookie name
  secret: process.env.SESSION_SECRET || 'default-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING,
    ttl: 7 * 24 * 60 * 60, // 7 days in seconds
    autoRemove: 'native',
    collectionName: 'sessions',
    crypto: {
      secret: process.env.SESSION_STORE_SECRET || 'different-secret-for-store'
    }
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain: process.env.NODE_ENV === 'production' ? '.onrender.com' : undefined
  }
}));

// Trust proxy in production
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'file/labupload')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
