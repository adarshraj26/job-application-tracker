import { JobApplication } from '@/types'

export class BackupService {
  private static instance: BackupService

  private constructor() {}

  public static getInstance(): BackupService {
    if (!BackupService.instance) {
      BackupService.instance = new BackupService()
    }
    return BackupService.instance
  }

  // Export all user data
  exportData(): string {
    try {
      const data = {
        applications: JSON.parse(localStorage.getItem('job-applications') || '[]'),
        user: JSON.parse(localStorage.getItem('jobtracker_user') || 'null'),
        proStatus: localStorage.getItem('jobtracker_pro') || 'false',
        preferences: JSON.parse(localStorage.getItem('user-preferences') || '{}'),
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      }
      
      return JSON.stringify(data, null, 2)
    } catch (error) {
      console.error('Error exporting data:', error)
      throw new Error('Failed to export data')
    }
  }

  // Import user data
  importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData)
      
      // Validate data structure
      if (!data.version || !data.exportDate) {
        throw new Error('Invalid backup file format')
      }

      // Import applications
      if (data.applications) {
        localStorage.setItem('job-applications', JSON.stringify(data.applications))
      }

      // Import user data
      if (data.user) {
        localStorage.setItem('jobtracker_user', JSON.stringify(data.user))
      }

      // Import pro status
      if (data.proStatus) {
        localStorage.setItem('jobtracker_pro', data.proStatus)
      }

      // Import preferences
      if (data.preferences) {
        localStorage.setItem('user-preferences', JSON.stringify(data.preferences))
      }

      return true
    } catch (error) {
      console.error('Error importing data:', error)
      throw new Error('Failed to import data')
    }
  }

  // Download backup file
  downloadBackup(): void {
    try {
      const data = this.exportData()
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `jobtracker-backup-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading backup:', error)
      throw new Error('Failed to download backup')
    }
  }

  // Upload and restore backup
  async uploadBackup(file: File): Promise<boolean> {
    try {
      const text = await file.text()
      return this.importData(text)
    } catch (error) {
      console.error('Error uploading backup:', error)
      throw new Error('Failed to upload backup')
    }
  }

  // Clear all data
  clearAllData(): void {
    try {
      localStorage.removeItem('job-applications')
      localStorage.removeItem('jobtracker_user')
      localStorage.removeItem('jobtracker_pro')
      localStorage.removeItem('user-preferences')
    } catch (error) {
      console.error('Error clearing data:', error)
      throw new Error('Failed to clear data')
    }
  }

  // Get storage usage info
  getStorageInfo(): { used: number; available: number; percentage: number } {
    try {
      let totalSize = 0
      const keys = Object.keys(localStorage)
      
      keys.forEach(key => {
        const value = localStorage.getItem(key)
        if (value) {
          totalSize += key.length + value.length
        }
      })

      // Estimate available storage (varies by browser)
      const estimatedAvailable = 5 * 1024 * 1024 // 5MB estimate
      const percentage = (totalSize / estimatedAvailable) * 100

      return {
        used: totalSize,
        available: estimatedAvailable,
        percentage: Math.min(percentage, 100)
      }
    } catch (error) {
      console.error('Error getting storage info:', error)
      return { used: 0, available: 0, percentage: 0 }
    }
  }
} 