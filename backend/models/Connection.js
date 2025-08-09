const mongoose = require('mongoose');

const connectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please provide connection name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true,
    maxlength: [100, 'Company name cannot be more than 100 characters']
  },
  position: {
    type: String,
    required: [true, 'Please provide position title'],
    trim: true,
    maxlength: [100, 'Position title cannot be more than 100 characters']
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  linkedin: {
    type: String,
    trim: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  lastContact: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'pending', 'inactive'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Index for better query performance
connectionSchema.index({ user: 1, status: 1 });
connectionSchema.index({ user: 1, company: 1 });

module.exports = mongoose.model('Connection', connectionSchema); 