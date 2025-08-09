export class FileService {
  async saveFile(file: File): Promise<string> {
    try {
      // In a real application, you would upload to a file storage service
      // For now, we'll create a blob URL for local storage
      const url = URL.createObjectURL(file)
      return url
    } catch (error) {
      console.error('Error saving file:', error)
      throw new Error('Failed to save file')
    }
  }

  async deleteFile(url: string): Promise<void> {
    try {
      // Revoke the blob URL to free up memory
      if (url.startsWith('blob:')) {
        URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  async getFileFromUrl(url: string): Promise<File | null> {
    try {
      if (!url.startsWith('blob:')) {
        return null
      }

      const response = await fetch(url)
      const blob = await response.blob()

      // Try to get the original filename from the blob
      const filename = 'resume.pdf' // Default filename
      return new File([blob], filename, { type: blob.type })
    } catch (error) {
      console.error('Error getting file from URL:', error)
      return null
    }
  }

  validateFile(file: File): { isValid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

    if (file.size > maxSize) {
      return { isValid: false, error: 'File size must be less than 10MB' }
    }

    if (!allowedTypes.includes(file.type)) {
      return { isValid: false, error: 'Only PDF and Word documents are allowed' }
    }

    return { isValid: true }
  }

  getFileIcon(file: File): string {
    if (file.type === 'application/pdf') {
      return '📄'
    } else if (file.type.includes('word')) {
      return '📝'
    }
    return '📎'
  }
}