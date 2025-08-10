import { useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import { useTour } from '@/context/TourContext'
import WelcomeTour from './WelcomeTour'

interface TourWrapperProps {
  children: React.ReactNode
}

export default function TourWrapper({ children }: TourWrapperProps) {
  const { user, isAuthenticated } = useAuth()
  const { showWelcomeTour, setShowWelcomeTour, hasSeenTour, markTourAsSeen } = useTour()

  useEffect(() => {
    // Only show welcome tour for new users who haven't seen it
    // Check if this is a new user (recently registered) by checking if hasSeenWelcomeTour was reset
    const isNewUser = localStorage.getItem('isNewUser') === 'true'
    
    if (isAuthenticated && user && !hasSeenTour && isNewUser) {
      // Small delay to ensure the app is fully loaded
      const timer = setTimeout(() => {
        setShowWelcomeTour(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isAuthenticated, user, hasSeenTour, setShowWelcomeTour])

  // Keyboard shortcut to replay tour (Ctrl/Cmd + Shift + T)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'T') {
        event.preventDefault()
        setShowWelcomeTour(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [setShowWelcomeTour])

  const handleTourComplete = () => {
    markTourAsSeen()
    // Remove the new user flag after tour completion
    localStorage.removeItem('isNewUser')
  }

  const handleTourClose = () => {
    setShowWelcomeTour(false)
    // Remove the new user flag if tour is closed
    localStorage.removeItem('isNewUser')
  }

  return (
    <>
      {children}
      <WelcomeTour
        isOpen={showWelcomeTour}
        onClose={handleTourClose}
        onComplete={handleTourComplete}
      />
    </>
  )
} 