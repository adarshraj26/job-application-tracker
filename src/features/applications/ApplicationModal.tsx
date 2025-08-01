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
    if (!application) return

    try {
      setIsSubmitting(true)

      const formData: ApplicationFormData = {
        ...data,
        resumeFile,
        mailReceived: data.mailReceived || false
      }

      await updateApplication(application.id, formData)
      onClose()
    } catch (error) {
      console.error('Error updating application:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInterviewRoundsUpdate = async (updatedApplication: JobApplication) => {
    if (!application) return

    try {
      await updateApplication(application.id, {
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
      })
    } catch (error) {
      console.error('Error updating interview rounds:', error)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Application</DialogTitle>
          <DialogDescription>
            Update the details of your job application.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                placeholder="Enter company name"
                {...register('companyName')}
              />
              {errors.companyName && (
                <p className="text-sm text-destructive">{errors.companyName.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="position">Position *</Label>
              <Input
                id="position"
                placeholder="Enter position/role"
                {...register('position')}
              />
              {errors.position && (
                <p className="text-sm text-destructive">{errors.position.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                placeholder="Enter job location"
                {...register('location')}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="workMode">Work Mode</Label>
              <Select onValueChange={(value) => setValue('workMode', value as any)} value={watch('workMode')}>
                <SelectTrigger>
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

          <div>
            <Label htmlFor="salary">Salary *</Label>
            <Input
              id="salary"
              placeholder="Enter salary range"
              {...register('salary')}
            />
            {errors.salary && (
              <p className="text-sm text-destructive">{errors.salary.message}</p>
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

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Updating...' : 'Update Application'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}