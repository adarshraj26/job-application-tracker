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
    // Show welcome tour for new authenticated users who haven't seen it
    if (isAuthenticated && user && !hasSeenTour) {
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
  }

  const handleTourClose = () => {
    setShowWelcomeTour(false)
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