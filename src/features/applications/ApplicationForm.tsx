import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Calendar, Mail, User, FileText, Link, AlertCircle, Clock } from 'lucide-react'
import { useApplications } from '@/context/ApplicationContext'
import { ApplicationFormData } from '@/types'
import { applicationFormSchema } from '@/utils/validators'
import { 
  WORK_MODE_OPTIONS, 
  STATUS_OPTIONS, 
  OUTCOME_OPTIONS, 
  SOURCE_OPTIONS,
  PRIORITY_OPTIONS
} from '@/utils/constants'

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

const buttonVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 }
}

export default function ApplicationForm() {
  const { addApplication } = useApplications()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File>()
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema)
  })

  const onSubmit = async (data: ApplicationFormData) => {
    try {
      setIsSubmitting(true)
      const formData: ApplicationFormData = {
        ...data,
        resumeFile,
        additionalDocuments: additionalFiles,
        mailReceived: data.mailReceived || false
      }
      console.log('Submitting application data:', formData) // Debug log
      await addApplication(formData)
      // Success - reset form
      reset()
      setResumeFile(undefined)
      setAdditionalFiles([])
      // Show success message (you can add a toast notification here)
      console.log('Application submitted successfully!')
    } catch (error) {
      console.error('Error submitting application:', error)
      // Show error message to user (you can add a toast notification here)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="shadow-lg border-0 bg-white/95 dark:bg-gray-800/95 border border-gray-200 dark:border-gray-600">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
            <FileText className="h-5 w-5" />
            Add New Application
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Track your job application details and progress
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white dark:bg-gray-800 p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Company Information */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="companyName" className="text-gray-700 dark:text-gray-200 font-medium">Company Name *</Label>
              <Input
                id="companyName"
                {...register('companyName')}
                placeholder="Enter company name"
                className={`${errors.companyName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              />
              {errors.companyName && (
                <motion.p 
                  className="text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.companyName.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="position" className="text-gray-700 dark:text-gray-200 font-medium">Position *</Label>
              <Input
                id="position"
                {...register('position')}
                placeholder="Enter job position"
                className={`${errors.position ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
              />
              {errors.position && (
                <motion.p 
                  className="text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.position.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="location" className="text-gray-700 dark:text-gray-200 font-medium">Location</Label>
              <Input
                id="location"
                {...register('location')}
                placeholder="Enter job location"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </motion.div>

            {/* Application Details */}
            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="workMode" className="text-gray-700 dark:text-gray-200 font-medium">Work Mode</Label>
                <Select {...register('workMode')}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                    <SelectValue placeholder="Select work mode" className="text-gray-500 dark:text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    {WORK_MODE_OPTIONS.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-gray-700 dark:text-gray-200 font-medium">Salary (₹)</Label>
                <Input
                  id="salary"
                  {...register('salary')}
                  placeholder="Enter salary"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appliedDate" className="text-gray-700 dark:text-gray-200 font-medium">Applied Date *</Label>
                <Input
                  id="appliedDate"
                  type="date"
                  {...register('appliedDate')}
                  className={`${errors.appliedDate ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                />
                {errors.appliedDate && (
                  <motion.p 
                    className="text-sm text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.appliedDate.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="nextInterviewDate" className="text-gray-700 dark:text-gray-200 font-medium">Next Interview Date</Label>
                <Input
                  id="nextInterviewDate"
                  type="date"
                  {...register('nextInterviewDate')}
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                />
              </div>
            </motion.div>

            <motion.div variants={fieldVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-700 dark:text-gray-200 font-medium">Status *</Label>
                <Select {...register('status')}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                    <SelectValue placeholder="Select status" className="text-gray-500 dark:text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome" className="text-gray-700 dark:text-gray-200 font-medium">Outcome</Label>
                <Select {...register('outcome')}>
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                    <SelectValue placeholder="Select outcome" className="text-gray-500 dark:text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    {OUTCOME_OPTIONS.map((outcome) => (
                      <SelectItem key={outcome.value} value={outcome.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                        {outcome.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="contactPerson" className="text-gray-700 dark:text-gray-200 font-medium">Contact Person</Label>
              <Input
                id="contactPerson"
                {...register('contactPerson')}
                placeholder="Enter contact person name"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="contactEmail" className="text-gray-700 dark:text-gray-200 font-medium">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                {...register('contactEmail')}
                placeholder="Enter contact email"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </motion.div>

            {/* Additional Information */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="source" className="text-gray-700 dark:text-gray-200 font-medium">Source</Label>
              <Select {...register('source')}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="Select source" className="text-gray-500 dark:text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  {SOURCE_OPTIONS.map((source) => (
                    <SelectItem key={source.value} value={source.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="priority" className="text-gray-700 dark:text-gray-200 font-medium">Priority</Label>
              <Select {...register('priority')}>
                <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                  <SelectValue placeholder="Select priority" className="text-gray-500 dark:text-gray-400" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value} className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="notes" className="text-gray-700 dark:text-gray-200 font-medium">Notes</Label>
              <Textarea
                id="notes"
                {...register('notes')}
                placeholder="Add any additional notes..."
                rows={3}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={fieldVariants}
              className="pt-4"
            >
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Clock className="h-4 w-4" />
                    </motion.div>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Add Application
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}