const express = require("express");
const router = express.Router();
const multer=require('multer')
const path=require('path')
// Ensure token is verified
 // Import your Issue model
 const LabUpdate =require("../models/labUpdate")
 
 
// Create an issue - Auto-track the logged-in user
const createUpdate= async (req,res)=>{
   
   /* try {
        const { title, info,day,updatedBy,file } = req.body;
        console.log(`server side ${title,info,day,updatedBy,file}`)
     // Extract user ID from JW // Extract username from JWT

        const update = new LabUpdate({
            title,
            info,
            day,
            updatedBy,file  // Store User ID
           // postedByName: username,  // Store Username
        });

        await update.save();
        res.status(201).json({ message: "update created successfully",update });
    } catch (error) {
        res.status(502).json({ error: "Error creating update" });
    }*/
  
     const { title, info,day,updatedBy } = req.body;
     const file=req.file.filename;
    const update = new LabUpdate({
            title,
            info,
            day,
            updatedBy,
            file  // Store User ID
           // postedByName: username,  // Store Username
        });
        await update.save();
        res.status(201).json({ message: "update created successfully",update });
  
  
}


module.exports = createUpdate;
