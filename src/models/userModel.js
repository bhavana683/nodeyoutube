/*const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },
  role:{
    type:String,
    required:true,
    enum:["admin","technician","incharge"],
  },
  
},
{
  timestamps:true,
})
module.exports=mongoose.model("User",userSchema)*/
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "technician", "incharge"],
    },
    name: {
      type: String,
      //required:true,
      

     // If you want this to be mandatory for new users
    },
    contact: {
      type: Number,
      //required:true,
      
      //unique: true, // Prevent duplicate phone numbers
    },
    designation: {
      type: String,
     
      
    },
    dob: {
      type: Date,
      
     
    },
    image:{
      type:String
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
