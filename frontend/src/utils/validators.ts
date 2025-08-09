import { z } from 'zod'

export const applicationFormSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  location: z.string().min(1, 'Location is required'),
  workMode: z.enum(['On-site', 'Hybrid', 'Remote', 'Not Specified'] as const),
  salary: z.string().min(1, 'Salary is required'),
  appliedDate: z.string().min(1, 'Applied date is required'),
  nextInterviewDate: z.string().optional(),
  status: z.enum([
    'Applied',
    'Group Discussion Round',
    'Aptitude Round',
    'Technical Round 1',
    'Technical Round 2',
    'Managerial Round',
    'HR Round',
    'Ghosting'
  ] as const),
  outcome: z.enum(['Active', 'Selected', 'Rejected'] as const),
  mailReceived: z.boolean(),
  source: z.enum([
    'LinkedIn',
    'Naukri.com',
    'Company\'s Careers Page',
    'Indeed',
    'WorkIndia',
    'Others'
  ] as const),
  sourceOther: z.string().optional(),
  notes: z.string().optional(),
  // New fields
  contactPerson: z.string().optional(),
  contactEmail: z.string().email('Invalid email format').optional().or(z.literal('')),
  resumeVersion: z.string().optional(),
  coverLetter: z.string().optional(),
  portfolioLink: z.string().url('Invalid URL format').optional().or(z.literal('')),
  additionalDocuments: z.any().optional(),
  rejectionReason: z.enum(['Not a good fit', 'Overqualified', 'Underqualified', 'Salary mismatch', 'Location constraint', 'Timing issues', 'Company restructuring', 'Position filled', 'No response', 'Other'] as const).optional(),
  rejectionNotes: z.string().optional(),
  followUpDate: z.string().optional(),
  priority: z.enum(['High', 'Medium', 'Low'] as const).optional(),
})

export type ApplicationFormSchema = z.infer<typeof applicationFormSchema>

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[+]?[0-9]{10,15}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}