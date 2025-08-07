const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Issue=require("../models/issueModel")
const IssueUpdate = require("../models/issueUpdateModel");
const Notification = require("../models/notificationModel");
const multer = require("multer");
const app = express();
app.use(express.json());
app.use(cors());
 

const uploadIssue1=async (req,res)=>{

    // Endpoint for in-charge to post an issue
    
        try {
            const {issue, description,labNo,issuetime, postedBy, } = req.body;
           /* if (postedBy !== "incharge") {
                return res.status(403).json({ message: "Only in-charge can post issues." });
            }*/
            const newissue = new Issue({ issue, description,labNo,issuetime, postedBy,media:{} });
            //handle image
            if (req.files?.image) {
                newissue.media.image = {
                    data: req.files.image[0].buffer,
                    contentType: req.files.image[0].mimetype
                };
            }
    
            // Handle video upload
            if (req.files?.video) {
                newissue.media.video = {
                    data: req.files.video[0].buffer,
                    contentType: req.files.video[0].mimetype
                };
            } 
            // Create a new issue object
           
    
    

            console.log("saving issue to db")
            await newissue.save();
            res.status(201).json({ message: "Issue posted successfully", newissue });
    
            
    
            
        } catch (error) { 
            res.status(500).json({ error: error.message });
        }
    
      }
      const viewIssue = async (req, res) => {
        try {
            const issues = await Issue.find();
            res.status(200).json(issues);
        } catch (error) {
            res.status(500).json({ error: error.message });
        
    };
    }
const acceptIssue=async (req,res)=>{
    const issueId = req.params.id;
        const technicianEmail=req.session.userEmail;
 console.log(`${req.session.userEmail}`)

  try {
    await Issue.findByIdAndUpdate(issueId, {
      status: 'accepted',
      technician: technicianEmail

    },{new:true});

    res.json({ message: 'Issue accepted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  console.log('accpeted issue');
    }

const pending=async (req,res)=>{
 try {
            const pissues = await Issue.find({ status: "pending" });
            res.status(200).json(pissues);
        } catch (error) {
            res.status(500).json({ error: error.message });
        
    };
}
const getAcceptedIssuesByTechnician = async (req, res) => {
  console.log("getting detials");
  try {
   
    const technincianEmail=req.session.userEmail;
console.log(technincianEmail)

    const issues = await Issue.find({ technician:technincianEmail,
      status:'accepted'
     })
     
console.log(issues)
    res.status(200).json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get updates for a specific issue
const getIssueUpdates = async (req, res) => {
  try {
    const { issueId } = req.params;
    const updates = await IssueUpdate.find({ issueId }).sort({ createdAt: -1 });
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/*
const createIssueUpdate = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { issueDescription, solvedBy, daysTaken, progress } = req.body;
    const technicianEmail = req.session.userEmail;

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    const newUpdate = new IssueUpdate({
      issueId,
      technicianEmail,
      issueDescription,
      solvedBy,
      daysTaken,
      progress
    });

    await newUpdate.save();

    // Send notification to admin
    await Notification.create({
      recipient: "admin",
      message: `New update for issue: ${issue.issue}`,
      relatedIssue: issueId
    });

    // Send notification to incharge who posted the issue
    await Notification.create({
      recipient: issue.postedBy,
      message: `Technician ${technicianEmail} updated issue: ${issue.issue}`,
      relatedIssue: issueId
    });

    res.status(201).json({ message: "Update submitted successfully", update: newUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};*/const createIssueUpdate = async (req, res) => {
  try {
    const { issueId } = req.params;
    const { issueDescription, solvedBy, daysTaken, progress, status } = req.body;
    const technicianEmail = req.session.userEmail;

    const issue = await Issue.findById(issueId);
    if (!issue) {
      return res.status(404).json({ error: "Issue not found" });
    }

    const newUpdate = new IssueUpdate({
      issueId,
      technicianEmail,
      issueDescription,
      solvedBy,
      daysTaken,
      progress,
      status
    });

    await newUpdate.save();

    // Update issue status if marked as completed
    if (status === 'completed') {
      await Issue.findByIdAndUpdate(issueId, { 
        status: 'completed',
        solvedBy: technicianEmail 
      });
    }

    // Send notification to admin
    await Notification.create({
      recipient: "admin",
      message: `New update for issue: ${issue.issue}`,
      relatedIssue: issueId,
      updateDetails: {
        issueDescription,
        solvedBy,
        daysTaken,
        progress,
        status
      }
    });

    // Send notification to incharge who posted the issue
     await Notification.create({
      recipient: issue.postedBy,
      message: `Technician ${technicianEmail} updated issue: ${issue.issue}`,
      relatedIssue: issueId,
      updateDetails: {
        issueDescription,
        solvedBy,
        daysTaken,
        progress,
        status
      }
    });

    res.status(201).json({ message: "Update submitted successfully", update: newUpdate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const userRole = req.user.role; // From JWT

    const notifications = await Notification.find({
      $or: [
        { recipient: userEmail },
        { recipient: userRole }
      ],
      read: false
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;
    await Notification.findByIdAndUpdate(notificationId, { read: true });
    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all issue updates for admin/incharge
const getAllIssueUpdates = async (req, res) => {
  try {
    const userEmail = req.session.userEmail;
    const userRole = req.user.role;
    
    let updates;
    if (userRole === 'admin') {
      // Admin can see all updates
      updates = await IssueUpdate.find().populate('issueId');
    } else {
      // Incharge sees updates for issues they posted
      const issues = await Issue.find({ postedBy: userEmail });
      const issueIds = issues.map(issue => issue._id);
      updates = await IssueUpdate.find({ issueId: { $in: issueIds } }).populate('issueId');
    }
    
    res.status(200).json(updates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
 



    module.exports = { uploadIssue1, viewIssue,acceptIssue,pending ,getAcceptedIssuesByTechnician,
       getIssueUpdates,
  createIssueUpdate,
  getNotifications,
  markAsRead,getAllIssueUpdates
  
    };
    
    