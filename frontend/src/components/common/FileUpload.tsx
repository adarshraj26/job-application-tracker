import React, { useRef, useState } from 'react'
import { Upload, File, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FileUploadProps {
  file?: File
  onFileChange: (file: File | undefined) => void
  accept?: string
  maxSize?: number
  label?: string
  error?: string
}

export default function FileUpload({
  file,
  onFileChange,
  accept = ".pdf,.doc,.docx",
  maxSize = 10 * 1024 * 1024, // 10MB
  label = "Resume",
  error
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = (selectedFile: File | null) => {
    if (!selectedFile) {
      onFileChange(undefined)
      return
    }

    // Validate file size
    if (selectedFile.size > maxSize) {
      // Handle error - you might want to show a toast or set an error state
      return
    }

    // Validate file type
    if (accept && !accept.split(',').some(type => selectedFile.name.toLowerCase().endsWith(type.replace('.', '')))) {
      // Handle error
      return
    }

    onFileChange(selectedFile)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const removeFile = () => {
    onFileChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      {file ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
          <div className="flex items-center space-x-2">
            <File className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{file.name}</span>
            <span className="text-xs text-muted-foreground">
              ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </span>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={removeFile}
            className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
            dragOver
              ? 'border-primary bg-primary/5'
              : error
              ? 'border-destructive'
              : 'border-muted-foreground/25 hover:border-muted-foreground/50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your resume here, or{' '}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-1 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              browse files
            </button>
          </p>
          <p className="text-xs text-muted-foreground">
            PDF, DOC, DOCX up to {Math.round(maxSize / 1024 / 1024)}MB
          </p>
        </div>
      )}

      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
        className="hidden"
      />

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}