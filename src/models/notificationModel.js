const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  relatedIssue: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue' },
  updateDetails: {
    issueDescription: String,
    solvedBy: String,
    daysTaken: Number,
    progress: String,
    status: String
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', notificationSchema);