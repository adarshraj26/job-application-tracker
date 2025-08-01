export type WorkMode = 'On-site' | 'Hybrid' | 'Remote' | 'Not Specified'

export type ApplicationStatus = 
  | 'Applied'
  | 'Group Discussion Round'
  | 'Aptitude Round'
  | 'Technical Round 1'
  | 'Technical Round 2'
  | 'Managerial Round'
  | 'HR Round'
  | 'Ghosting'

export type ApplicationOutcome = 'Active' | 'Selected' | 'Rejected'

export type RejectionReason = 
  | 'Not a good fit'
  | 'Overqualified'
  | 'Underqualified'
  | 'Salary mismatch'
  | 'Location constraint'
  | 'Timing issues'
  | 'Company restructuring'
  | 'Position filled'
  | 'No response'
  | 'Other'

export interface InterviewRound {
  id: string
  roundName: string
  date: Date
  type: 'Phone' | 'Video' | 'On-site' | 'Technical' | 'HR' | 'Managerial'
  status: 'Scheduled' | 'Completed' | 'Cancelled'
  notes?: string
  questions?: string[]
  performance?: 'Excellent' | 'Good' | 'Average' | 'Poor'
  nextSteps?: string
}

export type ApplicationSource = 
  | 'LinkedIn'
  | 'Naukri.com'
  | "Company's Careers Page"
  | 'Indeed'
  | 'WorkIndia'
  | 'Others'

export interface JobApplication {
  id: string
  companyName: string
  position: string
  location: string
  workMode: WorkMode
  salary: string
  appliedDate: Date
  nextInterviewDate?: Date
  status: ApplicationStatus
  outcome: ApplicationOutcome
  mailReceived: boolean
  resumeFile?: File
  resumeUrl?: string
  source: ApplicationSource
  sourceOther?: string
  notes?: string
  // New fields
  contactPerson?: string
  contactEmail?: string
  resumeVersion?: string
  coverLetter?: string
  portfolioLink?: string
  additionalDocuments?: File[]
  rejectionReason?: RejectionReason
  rejectionNotes?: string
  interviewRounds?: InterviewRound[]
  followUpDate?: Date
  priority?: 'High' | 'Medium' | 'Low'
  createdAt: Date
  updatedAt: Date
}

export interface ApplicationFormData {
  companyName: string
  position: string
  location: string
  workMode: WorkMode
  salary: string
  appliedDate: string
  nextInterviewDate?: string
  status: ApplicationStatus
  outcome: ApplicationOutcome
  mailReceived: boolean
  resumeFile?: File
  source: ApplicationSource
  sourceOther?: string
  notes?: string
  // New fields
  contactPerson?: string
  contactEmail?: string
  resumeVersion?: string
  coverLetter?: string
  portfolioLink?: string
  additionalDocuments?: File[]
  rejectionReason?: RejectionReason
  rejectionNotes?: string
  followUpDate?: string
  priority?: 'High' | 'Medium' | 'Low'
  interviewRounds?: InterviewRound[]
}

export interface ApplicationStats {
  totalApplications: number
  appliedCount: number
  mailReceivedCount: number
  interviewingCount: number
  selectedCount: number
  rejectedCount: number
  ghostingCount: number
  activeCount: number
  statusBreakdown: Record<ApplicationStatus, number>
  outcomeBreakdown: Record<ApplicationOutcome, number>
  sourceBreakdown: Record<ApplicationSource | 'Others', number>
}