const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    required: true,
    enum: ['Low', 'Medium', 'High'], 
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'], 
    default: 'Open'
  },
  assignedDeveloper: { type: String, required: true },
  tags: { type: [String], required: true },
  dueDate: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Issue', issueSchema);