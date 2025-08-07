const express = require("express");
const router = express.Router();
const multer=require('multer')
const path=require('path')
// Ensure token is verified
 // Import your Issue model
 const LabUpdate =require("../models/labUpdate")
 const getlabUpdate=async (req,res)=>{
  try {
             const update = await LabUpdate.find();
              update.file = `http://localhost:7001/uploads/${update.file}`;

             res.status(200).json(update);
         }
          catch (error) {
             res.status(500).json({ error: error.message });}
        
     };


module.exports = getlabUpdate;