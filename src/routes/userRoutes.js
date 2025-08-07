const express=require("express")
const verifyToken=require("../middlewares/authMiddleware")
const authorizeRoles=require("../middlewares/roleMiddleware")
const router=express.Router()
//only admin acan acess this router
router.get("/admin",verifyToken,authorizeRoles("admin"),(req,res)=>{
  res.json({message:"Welcome Admin"})
})
//both admin and technician can access
router.get("/technician",verifyToken,authorizeRoles("admin","technician"),(req,res)=>{
  res.json({message:"Welcome Technician"})
})

// all can access
router.get("/incharge",verifyToken,authorizeRoles("admin","technician","incharge"),(req,res)=>{
  res.json({message:"Welcome Incharge"})
})
module.exports=router;