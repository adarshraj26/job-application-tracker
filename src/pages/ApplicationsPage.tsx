import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApplicationForm from '@/features/applications/ApplicationForm'
import ApplicationsList from '@/features/applications/ApplicationsList'
import AdvancedSearch from '@/components/common/AdvancedSearch'
import FollowUpReminder from '@/components/common/FollowUpReminder'
import CalendarIntegration from '@/components/common/CalendarIntegration'
import ProFeatureWrapper from '@/components/common/ProFeatureWrapper'
import { useApplications } from '@/context/ApplicationContext'
import { useAuth } from '@/context/AuthContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function ApplicationsPage() {
  console.log('ApplicationsPage: Component rendering') // Debug log
  
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const { applications, loading, error } = useApplications()
  const [filteredApplications, setFilteredApplications] = useState(applications || [])
  const [pageError, setPageError] = useState<string | null>(null)

  // Check authentication
  useEffect(() => {
    if (!isAuthenticated) {
      console.log('ApplicationsPage: Not authenticated, redirecting to login')
      navigate('/login')
      return
    }
    console.log('ApplicationsPage: User authenticated:', user)
  }, [isAuthenticated, navigate, user])

  // Debug logging
  useEffect(() => {
    console.log('ApplicationsPage - applications:', applications)
    console.log('ApplicationsPage - loading:', loading)
    console.log('ApplicationsPage - error:', error)
  }, [applications, loading, error])

  // Update filtered applications when applications change
  useEffect(() => {
    if (applications) {
      setFilteredApplications(applications)
    }
  }, [applications])

  // If not authenticated, show loading while redirecting
  if (!isAuthenticated) {
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-200 dark:text-gray-100 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Redirecting to login...
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  // Error boundary for the page
  if (pageError) {
    console.log('ApplicationsPage: Showing page error:', pageError)
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-red-400 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Page Error: {pageError}
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  // Show loading state
  if (loading) {
    console.log('ApplicationsPage: Showing loading state')
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-200 dark:text-gray-100 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Loading your applications...
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  // Show error state
  if (error) {
    console.log('ApplicationsPage: Showing error state:', error)
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-red-400 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Error: {error}
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  try {
    console.log('ApplicationsPage: Rendering main content')
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-gray-200 dark:text-gray-100 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Manage your job applications and track your progress with detailed insights.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-12"
          variants={containerVariants}
        >
          <motion.div 
            className="xl:col-span-1 order-2 xl:order-1"
            variants={itemVariants}
          >
            <motion.div 
              className="sticky top-4 sm:top-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <ApplicationForm />
            </motion.div>
          </motion.div>
          <motion.div 
            className="xl:col-span-2 order-1 xl:order-2 space-y-4 sm:space-y-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <FollowUpReminder applications={applications || []} />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ProFeatureWrapper 
                featureName="Calendar Integration"
                description="Sync your interviews and follow-ups with Google Calendar and Outlook"
              >
                <CalendarIntegration applications={applications || []} />
              </ProFeatureWrapper>
            </motion.div>
            <motion.div variants={itemVariants}>
              <AdvancedSearch 
                applications={applications || []} 
                onFilterChange={setFilteredApplications} 
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <ApplicationsList applications={filteredApplications} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    )
  } catch (err) {
    console.error('ApplicationsPage error:', err)
    setPageError(err instanceof Error ? err.message : 'Unknown error occurred')
    return (
      <motion.div 
        className="space-y-8 lg:space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center lg:text-left"
          variants={itemVariants}
        >
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Applications
          </motion.h1>
          <motion.p 
            className="text-lg text-red-400 mt-2 max-w-2xl lg:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Something went wrong. Please refresh the page.
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }
}
