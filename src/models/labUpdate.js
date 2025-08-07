
const { truncates } = require("bcryptjs");
const mongoose = require("mongoose");
const labSchema = new mongoose.Schema({
    title:{type:String,required:true},
    info:{type:String,required:true},
    day:{type:String,required:true},
    file:{type:String},
   /*updatedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},*/
    updatedBy:{type:String,required:true},
    
   media: {
      image: { data: Buffer, contentType: String }, // Image storage
      video: { data: Buffer, contentType: String }  // Video storage
  },
    createdAt: { type: Date, default: Date.now }
   
},
{
  timestamps: true,
}
);

module.exports = mongoose.model("LabUpdate", labSchema);