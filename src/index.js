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
  origin:"http://localhost:3000",
  methods:["GET" ,"POST","PUT","DELETE"],
  credentials:true}))
app.use(cookieParser())
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret-key', // Use a strong secret
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.CONNECTION_STRING, // MongoDB connection string
    ttl: 7 * 24 * 60 * 60, // 7 days in seconds
    autoRemove: 'native', // Use MongoDB's TTL index
    collectionName: 'sessions' // Collection to store sessions
  }),
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    sameSite: 'lax'
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
)
