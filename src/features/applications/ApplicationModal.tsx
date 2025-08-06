import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FileUpload } from '@/components/common'
import InterviewRounds from '@/components/common/InterviewRounds'
import { useApplications } from '@/context/ApplicationContext'
import { JobApplication, ApplicationFormData } from '@/types'
import { applicationFormSchema, ApplicationFormSchema } from '@/utils/validators'
import { WORK_MODE_OPTIONS, STATUS_OPTIONS, OUTCOME_OPTIONS, SOURCE_OPTIONS } from '@/utils/constants'
import { X } from 'lucide-react'

interface ApplicationModalProps {
  application: JobApplication | null
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ application, isOpen, onClose }: ApplicationModalProps) {
  const { updateApplication } = useApplications()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | undefined>()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ApplicationFormSchema>({
    resolver: zodResolver(applicationFormSchema)
  })

  const sourceValue = watch('source')

  useEffect(() => {
    if (application && isOpen) {
      reset({
        companyName: application.companyName,
        position: application.position,
        location: application.location,
        workMode: application.workMode,
        salary: application.salary,
        appliedDate: application.appliedDate.toISOString().split('T')[0],
        nextInterviewDate: application.nextInterviewDate?.toISOString().split('T')[0] || undefined,
        status: application.status,
        outcome: application.outcome,
        mailReceived: application.mailReceived,
        source: application.source,
        sourceOther: application.sourceOther,
        notes: application.notes
      })
      setResumeFile(application.resumeFile)
    }
  }, [application, isOpen, reset])

  const onSubmit = async (data: ApplicationFormSchema) => {
    if (!application) {
      console.error('❌ ApplicationModal: No application provided for update')
      return
    }

    if (!application.id) {
      console.error('❌ ApplicationModal: No application ID provided for update')
      alert('Error: Application ID not found. Please refresh the page and try again.')
      return
    }

    console.log('✏️ ApplicationModal: Submitting update for application ID:', application.id)
    console.log('✏️ ApplicationModal: Form data:', data)

    try {
      setIsSubmitting(true)

      const formData: ApplicationFormData = {
        ...data,
        resumeFile,
        mailReceived: data.mailReceived || false
      }

      console.log('✏️ ApplicationModal: Calling updateApplication with ID:', application.id)
      await updateApplication(application.id, formData)
      console.log('✅ ApplicationModal: Update successful for ID:', application.id)
      onClose()
    } catch (error) {
      console.error('❌ ApplicationModal: Error updating application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterviewRoundsUpdate = async (updatedApplication: JobApplication) => {
    if (!application) return

    console.log('🔄 InterviewRounds: handleInterviewRoundsUpdate called')
    console.log('🔄 InterviewRounds: Updated application:', updatedApplication)
    console.log('🔄 InterviewRounds: Interview rounds:', updatedApplication.interviewRounds)

    try {
      const updateData = {
        companyName: updatedApplication.companyName,
        position: updatedApplication.position,
        location: updatedApplication.location,
        workMode: updatedApplication.workMode,
        salary: updatedApplication.salary,
        appliedDate: updatedApplication.appliedDate.toISOString().split('T')[0],
        nextInterviewDate: updatedApplication.nextInterviewDate?.toISOString().split('T')[0],
        status: updatedApplication.status,
        outcome: updatedApplication.outcome,
        mailReceived: updatedApplication.mailReceived,
        source: updatedApplication.source,
        sourceOther: updatedApplication.sourceOther,
        notes: updatedApplication.notes,
        interviewRounds: updatedApplication.interviewRounds
      }

      console.log('🔄 InterviewRounds: Sending update data:', updateData)
      await updateApplication(application.id, updateData)
      console.log('✅ InterviewRounds: Update successful')
    } catch (error) {
      console.error('❌ InterviewRounds: Error updating interview rounds:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-700 shadow-2xl text-gray-900 dark:text-gray-100 [&>button]:hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg -m-6 mb-6 p-6 relative">
          <DialogTitle className="text-2xl font-bold text-white">Edit Application</DialogTitle>
          <DialogDescription className="text-blue-100">
            Update the details of your job application.
          </DialogDescription>
          
          {/* Circular Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/20 transition-colors duration-200 cursor-pointer"
            type="button"
          >
            <X className="h-5 w-5 text-white hover:text-blue-100" />
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white/80 dark:bg-gray-800/80 rounded-lg p-6 border border-gray-200 dark:border-gray-600">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                {...register('companyName')}
              />
              {errors.companyName && (
                <p className="text-sm text-red-500">{errors.companyName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Position *</Label>
              <Input
                id="position"
                placeholder="Enter position/role"
                className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                {...register('position')}
              />
              {errors.position && (
                <p className="text-sm text-red-500">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Location *</Label>
              <Input
                id="location"
                placeholder="Enter job location"
                className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                {...register('location')}
              />
              {errors.location && (
                <p className="text-sm text-red-500">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="workMode" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Work Mode</Label>
              <Select onValueChange={(value) => setValue('workMode', value as any)} value={watch('workMode')}>
                <SelectTrigger className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                  <SelectValue placeholder="Select work mode" />
                </SelectTrigger>
                <SelectContent>
                  {WORK_MODE_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="salary" className="text-sm font-semibold text-gray-700 dark:text-gray-200">Salary *</Label>
            <Input
              id="salary"
              placeholder="Enter salary range"
              className="border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              {...register('salary')}
            />
            {errors.salary && (
              <p className="text-sm text-red-500">{errors.salary.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appliedDate">Applied Date *</Label>
              <Input
                id="appliedDate"
                type="date"
                {...register('appliedDate')}
              />
              {errors.appliedDate && (
                <p className="text-sm text-destructive">{errors.appliedDate.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="nextInterviewDate">Next Interview Date</Label>
              <Input
                id="nextInterviewDate"
                type="date"
                {...register('nextInterviewDate')}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => setValue('status', value as any)} value={watch('status')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="outcome">Outcome</Label>
              <Select onValueChange={(value) => setValue('outcome', value as any)} value={watch('outcome')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  {OUTCOME_OPTIONS.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="source">Source of Application</Label>
            <Select onValueChange={(value) => setValue('source', value as any)} value={watch('source')}>
              <SelectTrigger>
                <SelectValue placeholder="Select source" />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_OPTIONS.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {sourceValue === 'Others' && (
            <div>
              <Label htmlFor="sourceOther">Other Source</Label>
              <Input
                id="sourceOther"
                placeholder="Specify other source"
                {...register('sourceOther')}
              />
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2">
              <input
                id="mailReceived"
                type="checkbox"
                {...register('mailReceived')}
                className="rounded"
              />
              <Label htmlFor="mailReceived">Mail received from company</Label>
            </div>
          </div>

          <FileUpload
            file={resumeFile}
            onFileChange={setResumeFile}
            label="Resume"
          />

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes..."
              {...register('notes')}
            />
          </div>

          {/* Interview Rounds Section */}
          {application && (
            <div className="border-t pt-6">
              <InterviewRounds 
                application={application} 
                onUpdate={handleInterviewRoundsUpdate} 
              />
            </div>
          )}

          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="px-6 py-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Updating...' : 'Update Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}