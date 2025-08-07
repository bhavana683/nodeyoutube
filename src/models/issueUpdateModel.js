/*
const mongoose = require('mongoose');

const issueUpdateSchema = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
  technicianEmail: { type: String, required: true },
  issueDescription: { type: String, required: true },
  solvedBy: { type: String, required: true },
  daysTaken: { type: Number, required: true },
  progress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IssueUpdate', issueUpdateSchema);*/
const mongoose = require('mongoose');

const issueUpdateSchema = new mongoose.Schema({
  issueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Issue', required: true },
  technicianEmail: { type: String, required: true },
  issueDescription: { type: String, required: true },
  solvedBy: { type: String, required: true },
  daysTaken: { type: Number, required: true },
  progress: { type: String, required: true },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('IssueUpdate', issueUpdateSchema);