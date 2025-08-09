import { 
  ApplicationStatus, 
  ApplicationOutcome, 
  ApplicationSource, 
  WorkMode, 
  JobApplication, 
  ApplicationStats, 
  ApplicationFormData 
} from './application'

export interface SelectOption {
  value: string
  label: string
}

export interface FileUpload {
  file: File
  url: string
  name: string
}

export interface SearchFilters {
  query: string
  status?: ApplicationStatus
  outcome?: ApplicationOutcome
  source?: ApplicationSource
  workMode?: WorkMode
}

export interface SortConfig {
  key: keyof JobApplication
  direction: 'asc' | 'desc'
}

export type ApplicationAction = 
  | { type: 'ADD_APPLICATION'; payload: JobApplication }
  | { type: 'UPDATE_APPLICATION'; payload: JobApplication }
  | { type: 'DELETE_APPLICATION'; payload: string }
  | { type: 'SET_APPLICATIONS'; payload: JobApplication[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_APPLICATIONS' }

export interface ApplicationContextType {
  applications: JobApplication[]
  stats: ApplicationStats
  addApplication: (application: ApplicationFormData) => Promise<void>
  updateApplication: (id: string, application: ApplicationFormData) => Promise<void>
  deleteApplication: (id: string) => Promise<void>
  getApplication: (id: string) => JobApplication | undefined
  searchApplications: (filters: SearchFilters) => JobApplication[]
  loading: boolean
  error: string | null
}