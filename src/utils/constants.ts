import { ApplicationStatus, ApplicationOutcome, RejectionReason, SelectOption } from '@/types'

export const WORK_MODE_OPTIONS: SelectOption[] = [
  { value: 'On-site', label: 'On-site' },
  { value: 'Hybrid', label: 'Hybrid' },
  { value: 'Remote', label: 'Remote' },
  { value: 'Not Specified', label: 'Not Specified' }
]

export const STATUS_OPTIONS: SelectOption[] = [
  { value: 'Applied', label: 'Applied' },
  { value: 'Group Discussion Round', label: 'Group Discussion Round' },
  { value: 'Aptitude Round', label: 'Aptitude Round' },
  { value: 'Technical Round 1', label: 'Technical Round 1' },
  { value: 'Technical Round 2', label: 'Technical Round 2' },
  { value: 'Managerial Round', label: 'Managerial Round' },
  { value: 'HR Round', label: 'HR Round' },
  { value: 'Ghosting', label: 'Ghosting' }
]

export const OUTCOME_OPTIONS: SelectOption[] = [
  { value: 'Active', label: 'Active' },
  { value: 'Selected', label: 'Selected' },
  { value: 'Rejected', label: 'Rejected' }
]

export const SOURCE_OPTIONS: SelectOption[] = [
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Naukri.com', label: 'Naukri.com' },
  { value: 'Company\'s Careers Page', label: 'Company\'s Careers Page' },
  { value: 'Indeed', label: 'Indeed' },
  { value: 'WorkIndia', label: 'WorkIndia' },
  { value: 'Others', label: 'Others' }
]

export const REJECTION_REASON_OPTIONS: SelectOption[] = [
  { value: 'Not a good fit', label: 'Not a good fit' },
  { value: 'Overqualified', label: 'Overqualified' },
  { value: 'Underqualified', label: 'Underqualified' },
  { value: 'Salary mismatch', label: 'Salary mismatch' },
  { value: 'Location constraint', label: 'Location constraint' },
  { value: 'Timing issues', label: 'Timing issues' },
  { value: 'Company restructuring', label: 'Company restructuring' },
  { value: 'Position filled', label: 'Position filled' },
  { value: 'No response', label: 'No response' },
  { value: 'Other', label: 'Other' }
]

export const PRIORITY_OPTIONS: SelectOption[] = [
  { value: 'High', label: 'High Priority' },
  { value: 'Medium', label: 'Medium Priority' },
  { value: 'Low', label: 'Low Priority' }
]

export const INTERVIEW_TYPE_OPTIONS: SelectOption[] = [
  { value: 'Phone', label: 'Phone Interview' },
  { value: 'Video', label: 'Video Interview' },
  { value: 'On-site', label: 'On-site Interview' },
  { value: 'Technical', label: 'Technical Interview' },
  { value: 'HR', label: 'HR Interview' },
  { value: 'Managerial', label: 'Managerial Interview' }
]

export const INTERVIEW_STATUS_OPTIONS: SelectOption[] = [
  { value: 'Scheduled', label: 'Scheduled' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' }
]

export const PERFORMANCE_OPTIONS: SelectOption[] = [
  { value: 'Excellent', label: 'Excellent' },
  { value: 'Good', label: 'Good' },
  { value: 'Average', label: 'Average' },
  { value: 'Poor', label: 'Poor' }
]

export const STATUS_COLORS: Record<ApplicationStatus, string> = {
  'Applied': 'bg-blue-100 text-blue-800 border-blue-200',
  'Group Discussion Round': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Aptitude Round': 'bg-purple-100 text-purple-800 border-purple-200',
  'Technical Round 1': 'bg-orange-100 text-orange-800 border-orange-200',
  'Technical Round 2': 'bg-red-100 text-red-800 border-red-200',
  'Managerial Round': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'HR Round': 'bg-green-100 text-green-800 border-green-200',
  'Ghosting': 'bg-gray-100 text-gray-800 border-gray-200'
}

export const OUTCOME_COLORS: Record<ApplicationOutcome, string> = {
  'Active': 'bg-blue-100 text-blue-800 border-blue-200',
  'Selected': 'bg-green-100 text-green-800 border-green-200',
  'Rejected': 'bg-red-100 text-red-800 border-red-200'
}

export const LOCAL_STORAGE_KEYS = {
  APPLICATIONS: 'job-applications',
  USER_PREFERENCES: 'user-preferences',
  THEME: 'theme'
} as const

export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  FULL: 'EEEE, MMMM dd, yyyy'
} as const

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  FILE_TOO_LARGE: 'File size must be less than 10MB',
  INVALID_FILE_TYPE: 'Only PDF and Word documents are allowed'
} as const