import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Chrome, Github } from 'lucide-react'

interface OAuthButtonsProps {
  onGoogleClick: () => Promise<void>
  onGitHubClick: () => Promise<void>
  isLoading?: boolean
  variant?: 'login' | 'signup'
}

export default function OAuthButtons({ 
  onGoogleClick, 
  onGitHubClick, 
  isLoading = false,
  variant = 'login'
}: OAuthButtonsProps) {
  const buttonVariants = {
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  }

  return (
    <motion.div 
      className="grid grid-cols-2 gap-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-3 hover:bg-gray-50 transition-all duration-200 hover:shadow-md border-gray-300 group"
          onClick={onGoogleClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <Chrome className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform duration-200" />
          )}
          <span className="font-medium">
            {isLoading ? 'Loading...' : 'Google'}
          </span>
        </Button>
      </motion.div>

      <motion.div
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-3 hover:bg-gray-50 transition-all duration-200 hover:shadow-md border-gray-300 group"
          onClick={onGitHubClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
          ) : (
            <Github className="h-5 w-5 text-gray-800 group-hover:scale-110 transition-transform duration-200" />
          )}
          <span className="font-medium">
            {isLoading ? 'Loading...' : 'GitHub'}
          </span>
        </Button>
      </motion.div>
    </motion.div>
  )
} 