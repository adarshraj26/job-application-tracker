import { JobApplication, ApplicationFormData } from '@/types'
import { StorageService } from './storageService'
import { FileService } from './fileService'

export class ApplicationService {
  private static instance: ApplicationService
  private storageService: StorageService
  private fileService: FileService
  private readonly STORAGE_KEY = 'job-applications'

  private constructor() {
    this.storageService = new StorageService()
    this.fileService = new FileService()
  }

  public static getInstance(): ApplicationService {
    if (!ApplicationService.instance) {
      ApplicationService.instance = new ApplicationService()
    }
    return ApplicationService.instance
  }

  async getAllApplications(): Promise<JobApplication[]> {
    try {
      const applications = this.storageService.getItem<JobApplication[]>(this.STORAGE_KEY) || []
      return applications.map(app => ({
        ...app,
        appliedDate: new Date(app.appliedDate),
        nextInterviewDate: app.nextInterviewDate ? new Date(app.nextInterviewDate) : undefined,
        createdAt: new Date(app.createdAt),
        updatedAt: new Date(app.updatedAt)
      }))
    } catch (error) {
      console.error('Error fetching applications:', error)
      return []
    }
  }

  async saveApplication(applicationData: ApplicationFormData): Promise<JobApplication> {
    try {
      const applications = await this.getAllApplications()

      let resumeUrl: string | undefined
      if (applicationData.resumeFile) {
        resumeUrl = await this.fileService.saveFile(applicationData.resumeFile)
      }

      const newApplication: JobApplication = {
        id: this.generateId(),
        companyName: applicationData.companyName,
        position: applicationData.position,
        location: applicationData.location,
        workMode: applicationData.workMode,
        salary: applicationData.salary,
        appliedDate: new Date(applicationData.appliedDate),
        nextInterviewDate: applicationData.nextInterviewDate ? new Date(applicationData.nextInterviewDate) : undefined,
        status: applicationData.status,
        outcome: applicationData.outcome,
        mailReceived: applicationData.mailReceived,
        resumeFile: applicationData.resumeFile,
        resumeUrl,
        source: applicationData.source,
        sourceOther: applicationData.sourceOther,
        notes: applicationData.notes,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      applications.push(newApplication)
      this.storageService.setItem(this.STORAGE_KEY, applications)

      return newApplication
    } catch (error) {
      console.error('Error saving application:', error)
      throw new Error('Failed to save application')
    }
  }

  async updateApplication(id: string, applicationData: ApplicationFormData): Promise<JobApplication> {
    try {
      const applications = await this.getAllApplications()
      const index = applications.findIndex(app => app.id === id)

      if (index === -1) {
        throw new Error('Application not found')
      }

      const existingApp = applications[index]
      let resumeUrl = existingApp.resumeUrl

      if (applicationData.resumeFile) {
        resumeUrl = await this.fileService.saveFile(applicationData.resumeFile)
      }

      const updatedApplication: JobApplication = {
        ...existingApp,
        companyName: applicationData.companyName,
        position: applicationData.position,
        location: applicationData.location,
        workMode: applicationData.workMode,
        salary: applicationData.salary,
        appliedDate: new Date(applicationData.appliedDate),
        nextInterviewDate: applicationData.nextInterviewDate ? new Date(applicationData.nextInterviewDate) : undefined,
        status: applicationData.status,
        outcome: applicationData.outcome,
        mailReceived: applicationData.mailReceived,
        resumeFile: applicationData.resumeFile,
        resumeUrl,
        source: applicationData.source,
        sourceOther: applicationData.sourceOther,
        notes: applicationData.notes,
        updatedAt: new Date()
      }

      applications[index] = updatedApplication
      this.storageService.setItem(this.STORAGE_KEY, applications)

      return updatedApplication
    } catch (error) {
      console.error('Error updating application:', error)
      throw new Error('Failed to update application')
    }
  }

  async deleteApplication(id: string): Promise<void> {
    try {
      const applications = await this.getAllApplications()
      const filteredApplications = applications.filter(app => app.id !== id)

      this.storageService.setItem(this.STORAGE_KEY, filteredApplications)
    } catch (error) {
      console.error('Error deleting application:', error)
      throw new Error('Failed to delete application')
    }
  }

  async getApplicationById(id: string): Promise<JobApplication | undefined> {
    try {
      const applications = await this.getAllApplications()
      return applications.find(app => app.id === id)
    } catch (error) {
      console.error('Error fetching application:', error)
      return undefined
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }
}

export const applicationService = ApplicationService.getInstance()