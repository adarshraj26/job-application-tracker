import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface TourContextType {
  showWelcomeTour: boolean
  setShowWelcomeTour: (show: boolean) => void
  hasSeenTour: boolean
  markTourAsSeen: () => void
  resetTour: () => void
}

const TourContext = createContext<TourContextType | undefined>(undefined)

export function TourProvider({ children }: { children: ReactNode }) {
  const [showWelcomeTour, setShowWelcomeTour] = useState(false)
  const [hasSeenTour, setHasSeenTour] = useState(false)

  useEffect(() => {
    // Check if user has seen the tour before
    const tourSeen = localStorage.getItem('hasSeenWelcomeTour')
    if (tourSeen === 'true') {
      setHasSeenTour(true)
    }
  }, [])

  const markTourAsSeen = () => {
    setHasSeenTour(true)
    setShowWelcomeTour(false)
    localStorage.setItem('hasSeenWelcomeTour', 'true')
  }

  const resetTour = () => {
    setHasSeenTour(false)
    localStorage.removeItem('hasSeenWelcomeTour')
  }

  const value: TourContextType = {
    showWelcomeTour,
    setShowWelcomeTour,
    hasSeenTour,
    markTourAsSeen,
    resetTour,
  }

  return (
    <TourContext.Provider value={value}>
      {children}
    </TourContext.Provider>
  )
}

export function useTour() {
  const context = useContext(TourContext)
  if (context === undefined) {
    throw new Error('useTour must be used within a TourProvider')
  }
  return context
} 