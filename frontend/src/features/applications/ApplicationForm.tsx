import { useState, useEffect } from 'react'
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
import { Calendar, Mail, User, FileText, Link, AlertCircle, Clock, Upload, X } from 'lucide-react'
import { useApplications } from '@/context/ApplicationContext'
import { ApplicationFormData } from '@/types'
import { applicationFormSchema } from '@/utils/validators'
import { 
  WORK_MODE_OPTIONS, 
  STATUS_OPTIONS, 
  OUTCOME_OPTIONS, 
  SOURCE_OPTIONS
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
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)


  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      workMode: 'Not Specified',
      status: 'Applied',
      outcome: 'Active',
      source: 'LinkedIn',
      mailReceived: false,
      salary: '',
      appliedDate: new Date().toISOString().split('T')[0] // Today's date
    }
  })

  // Set default values for Select components
  useEffect(() => {
    setValue('workMode', 'Not Specified')
    setValue('status', 'Applied')
    setValue('outcome', 'Active')
    setValue('source', 'LinkedIn')
    setValue('mailReceived', false)
    setValue('salary', '')
    setValue('appliedDate', new Date().toISOString().split('T')[0])
  }, [setValue])

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, DOC, or DOCX file for resume')
        return
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Resume file size should be less than 5MB')
        return
      }
      setResumeFile(file)
    }
  }



  const onSubmit = async (data: ApplicationFormData) => {
    console.log('🚀 ApplicationForm: onSubmit called with data:', data)
    console.log('📁 Resume file:', resumeFile)
    console.log('🔍 Form validation errors:', errors)
    
    try {
      console.log('⏳ Setting isSubmitting to true')
      setIsSubmitting(true)
      setUploadProgress(0)
      
      const formData: ApplicationFormData = {
        ...data,
        resumeFile: resumeFile || undefined,
        mailReceived: data.mailReceived || false
      }
      
      console.log('📋 Prepared formData:', formData)
      console.log('🔧 addApplication function:', addApplication)
      console.log('🔧 addApplication type:', typeof addApplication)
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)
      
      console.log('📞 Calling addApplication...')
      const result = await addApplication(formData)
      console.log('✅ addApplication result:', result)
      
      setUploadProgress(100)
      
      // Reset form
      console.log('🔄 Resetting form...')
      reset()
      setResumeFile(null)
      setUploadProgress(0)
      
      console.log('🎉 Application submitted successfully!')
      
      

    } catch (error) {
      console.error('❌ Error submitting application:', error)
      console.error('❌ Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
        error: error
      })
      alert('Failed to submit application. Please try again.')
    } finally {
      console.log('🏁 Setting isSubmitting to false')
      setIsSubmitting(false)
      setUploadProgress(0)
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
          <form onSubmit={handleSubmit(onSubmit, (errors) => {
            console.log('❌ Form validation errors:', errors)
            console.log('❌ Form is valid:', Object.keys(errors).length === 0)
          })} className="space-y-4">
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
                <Label htmlFor="workMode" className="text-gray-700 dark:text-gray-200 font-medium">Work Mode *</Label>
                <Select 
                  value={watch('workMode')} 
                  onValueChange={(value) => setValue('workMode', value as any)}
                >
                  <SelectTrigger className={`${errors.workMode ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}>
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
                {errors.workMode && (
                  <motion.p 
                    className="text-sm text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.workMode.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary" className="text-gray-700 dark:text-gray-200 font-medium">Salary (₹) *</Label>
                <Input
                  id="salary"
                  {...register('salary')}
                  placeholder="Enter salary"
                  className={`${errors.salary ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}
                />
                {errors.salary && (
                  <motion.p 
                    className="text-sm text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.salary.message}
                  </motion.p>
                )}
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
                <Select 
                  value={watch('status')} 
                  onValueChange={(value) => setValue('status', value as any)}
                >
                  <SelectTrigger className={`${errors.status ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}>
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
                {errors.status && (
                  <motion.p 
                    className="text-sm text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.status.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="outcome" className="text-gray-700 dark:text-gray-200 font-medium">Outcome *</Label>
                <Select 
                  value={watch('outcome')} 
                  onValueChange={(value) => setValue('outcome', value as any)}
                >
                  <SelectTrigger className={`${errors.outcome ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}>
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
                {errors.outcome && (
                  <motion.p 
                    className="text-sm text-red-500 flex items-center gap-1"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.outcome.message}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Rejection Reason - Only show when outcome is "Rejected" */}
            {watch('outcome') === 'Rejected' && (
              <motion.div 
                variants={fieldVariants} 
                className="space-y-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="rejectionReason" className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Rejection Reason
                </Label>
                <Select 
                  value={watch('rejectionReason')} 
                  onValueChange={(value) => setValue('rejectionReason', value as any)}
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
                    <SelectValue placeholder="Select rejection reason" className="text-gray-500 dark:text-gray-400" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem value="Not a good fit" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Not a good fit
                    </SelectItem>
                    <SelectItem value="Overqualified" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Overqualified
                    </SelectItem>
                    <SelectItem value="Underqualified" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Underqualified
                    </SelectItem>
                    <SelectItem value="Salary mismatch" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Salary mismatch
                    </SelectItem>
                    <SelectItem value="Location constraint" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Location constraint
                    </SelectItem>
                    <SelectItem value="Timing issues" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Timing issues
                    </SelectItem>
                    <SelectItem value="Company restructuring" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Company restructuring
                    </SelectItem>
                    <SelectItem value="Position filled" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Position filled
                    </SelectItem>
                    <SelectItem value="No response" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      No response
                    </SelectItem>
                    <SelectItem value="Other" className="text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Rejection Notes - Only show when rejection reason is selected */}
                {watch('rejectionReason') && (
                  <motion.div 
                    variants={fieldVariants} 
                    className="space-y-2"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Label htmlFor="rejectionNotes" className="text-gray-700 dark:text-gray-200 font-medium">Rejection Notes</Label>
                    <Textarea
                      id="rejectionNotes"
                      {...register('rejectionNotes')}
                      placeholder="Add any additional notes about the rejection..."
                      rows={3}
                      className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

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

            {/* Portfolio and Job Details */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="portfolioLink" className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                <Link className="h-4 w-4" />
                Portfolio Link
              </Label>
              <Input
                id="portfolioLink"
                type="url"
                {...register('portfolioLink')}
                placeholder="https://your-portfolio.com"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="jobDescriptionUrl" className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Job Description URL
              </Label>
              <Input
                id="jobDescriptionUrl"
                type="url"
                {...register('jobDescriptionUrl')}
                placeholder="https://company.com/careers/job-id"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </motion.div>

            {/* Additional Information */}
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label htmlFor="source" className="text-gray-700 dark:text-gray-200 font-medium">Source *</Label>
              <Select 
                value={watch('source')} 
                onValueChange={(value) => setValue('source', value as any)}
              >
                <SelectTrigger className={`${errors.source ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400`}>
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
              {errors.source && (
                <motion.p 
                  className="text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.source.message}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="mailReceived"
                  {...register('mailReceived')}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <Label htmlFor="mailReceived" className="text-gray-700 dark:text-gray-200 font-medium">
                  Mail Received
                </Label>
              </div>
              {errors.mailReceived && (
                <motion.p 
                  className="text-sm text-red-500 flex items-center gap-1"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="h-3 w-3" />
                  {errors.mailReceived.message}
                </motion.p>
              )}
            </motion.div>



            {/* File Upload Section */}
            <motion.div variants={fieldVariants} className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Resume Upload
                </Label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    id="resume"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="hidden"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <div className="text-center">
                      {resumeFile ? (
                        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <span className="text-sm text-green-700 dark:text-green-300">{resumeFile.name}</span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setResumeFile(null)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="h-8 w-8 mx-auto text-gray-400" />
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Click to upload resume (PDF, DOC, DOCX)
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            Max size: 5MB
                          </p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverLetter" className="text-gray-700 dark:text-gray-200 font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Cover Letter (Optional)
                </Label>
                <Textarea
                  id="coverLetter"
                  {...register('coverLetter')}
                  placeholder="Write your cover letter here..."
                  rows={6}
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 resize-none"
                />
              </div>
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

            {/* Upload Progress */}
            {uploadProgress > 0 && (
              <motion.div 
                variants={fieldVariants}
                className="space-y-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
                </p>
              </motion.div>
            )}

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
                  onClick={() => console.log('🔘 Add Application button clicked!')}
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