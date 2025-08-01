const mongoose = require('mongoose');

const interviewRoundSchema = new mongoose.Schema({
  roundName: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    enum: ['Technical', 'HR', 'Aptitude', 'Group Discussion', 'Managerial', 'Other'],
    default: 'Technical'
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  notes: {
    type: String,
    trim: true
  },
  questions: [{
    type: String,
    trim: true
  }],
  performance: {
    type: String,
    enum: ['Excellent', 'Good', 'Average', 'Poor', 'Not Applicable'],
    default: 'Not Applicable'
  },
  nextSteps: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
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
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  workMode: {
    type: String,
    enum: ['Remote', 'On-site', 'Hybrid'],
    required: [true, 'Please select work mode']
  },
  salary: {
    type: String,
    trim: true
  },
  appliedDate: {
    type: Date,
    required: [true, 'Please provide application date'],
    default: Date.now
  },
  nextInterviewDate: {
    type: Date
  },
  status: {
    type: String,
    enum: [
      'Applied',
      'Group Discussion Round',
      'Aptitude Round',
      'Technical Round 1',
      'Technical Round 2',
      'Managerial Round',
      'HR Round',
      'Ghosting'
    ],
    default: 'Applied'
  },
  outcome: {
    type: String,
    enum: ['Active', 'Selected', 'Rejected'],
    default: 'Active'
  },
  mailReceived: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    enum: [
      'LinkedIn',
      'Naukri.com',
      "Company's Careers Page",
      'Indeed',
      'WorkIndia',
      'Others'
    ],
    required: [true, 'Please select application source']
  },
  sourceOther: {
    type: String,
    trim: true
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [1000, 'Notes cannot be more than 1000 characters']
  },
  // New fields for enhanced tracking
  contactPerson: {
    type: String,
    trim: true
  },
  contactEmail: {
    type: String,
    trim: true,
    lowercase: true
  },
  resumeVersion: {
    type: String,
    trim: true
  },
  coverLetter: {
    type: String,
    trim: true
  },
  portfolioLink: {
    type: String,
    trim: true
  },
  additionalDocuments: [{
    name: String,
    url: String,
    type: String
  }],
  rejectionReason: {
    type: String,
    enum: [
      'Not a good fit',
      'Overqualified',
      'Underqualified',
      'Salary mismatch',
      'Location constraint',
      'Timing issue',
      'Other'
    ]
  },
  rejectionNotes: {
    type: String,
    trim: true
  },
  followUpDate: {
    type: Date
  },
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium'
  },
  // File uploads
  resumeUrl: {
    type: String
  },
  resumeFile: {
    originalName: String,
    fileName: String,
    fileSize: Number,
    mimeType: String
  },
  // Interview rounds
  interviewRounds: [interviewRoundSchema],
  // Tags for organization
  tags: [{
    type: String,
    trim: true
  }],
  // Analytics fields
  responseTime: {
    type: Number, // in days
    default: null
  },
  applicationScore: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  }
}, {
  timestamps: true
});

// Indexes for better query performance
applicationSchema.index({ user: 1, appliedDate: -1 });
applicationSchema.index({ user: 1, status: 1 });
applicationSchema.index({ user: 1, outcome: 1 });
applicationSchema.index({ user: 1, companyName: 1 });

// Virtual for calculating response time
applicationSchema.virtual('calculatedResponseTime').get(function() {
  if (this.mailReceived && this.updatedAt && this.appliedDate) {
    return Math.ceil((this.updatedAt - this.appliedDate) / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Pre-save middleware to update response time
applicationSchema.pre('save', function(next) {
  if (this.mailReceived && this.isModified('mailReceived')) {
    this.responseTime = this.calculatedResponseTime;
  }
  next();
});

// Instance method to get application statistics
applicationSchema.methods.getStats = function() {
  return {
    daysSinceApplied: Math.ceil((new Date() - this.appliedDate) / (1000 * 60 * 60 * 24)),
    hasInterviewRounds: this.interviewRounds && this.interviewRounds.length > 0,
    totalInterviewRounds: this.interviewRounds ? this.interviewRounds.length : 0,
    completedInterviews: this.interviewRounds ? 
      this.interviewRounds.filter(round => round.status === 'Completed').length : 0
  };
};

module.exports = mongoose.model('Application', applicationSchema); 