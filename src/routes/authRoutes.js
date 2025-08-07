/*const express=require("express")
const multer = require("multer");
const verifyToken=require('../middlewares/authMiddleware')
const {register,login,ResetPassword,googleLogin,logout}=require("../controllers/authController")
const {uploadIssue1,viewIssue,acceptIssue,pending,getAcceptedIssuesByTechnician}=require("../controllers/issueDetails")
const path=require("path")
const createUpdate=require("../controllers/labUpdate")
const getlabUpdate=require("../controllers/getlabUpdate")
const authenticateSession = require('../middlewares/sessionAuth')
const { getNotifications, markAsRead,createIssueUpdate } = require("../controllers/issueDetails");




//const upload = multer({ storage: multer.memoryStorage() });
const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/ResetPassword",ResetPassword);
router.post("/acceptissue/:id",verifyToken,authenticateSession,acceptIssue)
router.get("/acceptbytech",getAcceptedIssuesByTechnician)
router.get("/pending",pending)
//router.post("/acceptissue/:id",acceptIssue)
router.post("/inupload-issue",uploadIssue1)
router.get("/inviewhistory",viewIssue)
router.get("/google", googleLogin);
router.post("/logout", logout);
router.get("/getlabupdate", getlabUpdate);
// Get unread notifications for the logged-in user
router.get("/notifications", getNotifications);
// Mark a notification as read
router.put("/notifications/:notificationId/read", markAsRead);
// Add this to your existing routes
router.post("/issues/:issueId/updates",verifyToken, authenticateSession, createIssueUpdate);
//router.get("/session",authenticateSession);
const fs = require('fs');

const absoluteUploadPath = path.join('C:/Users/KRISHNA PRASAD/OneDrive/Desktop/nodeyoutube/src/file','labupload');
if (!fs.existsSync(absoluteUploadPath)) {
  fs.mkdirSync(absoluteUploadPath, { recursive: true });
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
     
        cb(null,absoluteUploadPath)
       
    },
    filename:(req,file,cb)=>{
     cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))}
   })
   const upload=multer({
    storage:storage
   })
  

   
router.post("/upload",upload.single("file"),createUpdate);
module.exports=router
*/
const express=require("express")
const multer = require("multer");
const verifyToken=require('../middlewares/authMiddleware')
const {register,login,ResetPassword,googleLogin,logout,getCurrentUser,getSession,getUserByEmail}=require("../controllers/authController")
const {uploadIssue1,viewIssue,acceptIssue,pending,getAcceptedIssuesByTechnician}=require("../controllers/issueDetails")
const path=require("path")
const createUpdate=require("../controllers/labUpdate")
const getlabUpdate=require("../controllers/getlabUpdate")
const authenticateSession = require('../middlewares/sessionAuth')
const { getNotifications, markAsRead, createIssueUpdate,getAllIssueUpdates } = require("../controllers/issueDetails");

const router=express.Router();
router.post("/register",register);
router.post("/login",login);
router.post("/ResetPassword",ResetPassword);
router.post("/acceptissue/:id",verifyToken,authenticateSession,acceptIssue)
router.get("/acceptbytech",verifyToken, authenticateSession, getAcceptedIssuesByTechnician)
router.get("/pending",pending)
router.post("/inupload-issue",uploadIssue1)
router.get("/inviewhistory",viewIssue)
router.get("/google", googleLogin);
router.post("/logout", logout);
//router.get("/current-user", authenticateSession, getCurrentUser);
// Add these routes to authRoutes.js
router.get("/session", getSession);
router.get("/user",authenticateSession, getUserByEmail);
router.get("/getlabupdate", getlabUpdate);
router.get("/notifications", verifyToken, authenticateSession, getNotifications);
router.put("/notifications/:notificationId/read", verifyToken, authenticateSession, markAsRead);
router.post("/issues/:issueId/updates",verifyToken, authenticateSession, createIssueUpdate);
router.get("/issueupdates", verifyToken, authenticateSession, getAllIssueUpdates);

const fs = require('fs');
const absoluteUploadPath = path.join('C:/Users/KRISHNA PRASAD/OneDrive/Desktop/nodeyoutube/src/file','labupload');
if (!fs.existsSync(absoluteUploadPath)) {
  fs.mkdirSync(absoluteUploadPath, { recursive: true });
}
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,absoluteUploadPath)
    },
    filename:(req,file,cb)=>{
     cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname))}
   })
const upload=multer({ storage:storage })
router.post("/upload",upload.single("file"),createUpdate);

module.exports=router