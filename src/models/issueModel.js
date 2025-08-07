
/*const { truncates } = require("bcryptjs");
const mongoose = require("mongoose");
const issueSchema = new mongoose.Schema({
    issue: {type:String,required:true},
    description: {type:String,required:true},
    labNo:{type:Number,required:true},
    issuetime:{type:String},
    postedBy: { type: String,required:true },
     status: { type: String, default: 'pending' },
     
    technician:{type:String,default:"x"},
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

module.exports = mongoose.model("Issue", issueSchema);
*/
const mongoose = require("mongoose");
const issueSchema = new mongoose.Schema({
    issue: {type:String,required:true},
    description: {type:String,required:true},
    labNo:{type:Number,required:true},
    issuetime:{type:String},
    postedBy: { type: String,required:true },
    status: { type: String, enum: ['pending', 'accepted', 'completed'], default: 'pending' },
    technician:{type:String,default:""},
    solvedBy: {type:String,default:""},
    media: {
      image: { data: Buffer, contentType: String },
      video: { data: Buffer, contentType: String }
    },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Issue", issueSchema);