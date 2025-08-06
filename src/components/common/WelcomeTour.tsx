import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  Lightbulb,
  ExternalLink,
  Plus,
  Search,
  BarChart3,
  Settings,
  Briefcase
} from 'lucide-react'

interface TourStep {
  id: string
  title: string
  description: string
  tip?: string
  tipLink?: string
  targetSelector: string
  position: 'top' | 'bottom' | 'left' | 'right'
}

interface WelcomeTourProps {
  isOpen: boolean
  onClose: () => void
  onComplete: () => void
}

const tourSteps: TourStep[] = [
  {
    id: 'kanban-board',
    title: 'Kanban Board Layout',
    description: 'Jobtracker lays out the jobs you apply in a Kanban style board, with columns like Applied, Interview, Offer, etc.',
    targetSelector: '.kanban-board',
    position: 'top'
  },
  {
    id: 'add-job',
    title: 'Add New Job',
    description: 'You can add a new job by clicking here.',
    tip: 'Tip: Get Chrome extension',
    tipLink: 'https://chrome.google.com',
    targetSelector: '[data-tour="add-job"]',
    position: 'bottom'
  },
  {
    id: 'search-jobs',
    title: 'Search & Filter',
    description: 'Quickly find specific jobs using the search bar. Filter by position, company, or status.',
    targetSelector: '[data-tour="search"]',
    position: 'bottom'
  },
  {
    id: 'analytics',
    title: 'Analytics Dashboard',
    description: 'Track your job search progress with detailed analytics and insights.',
    targetSelector: '[data-tour="analytics"]',
    position: 'left'
  },
  {
    id: 'settings',
    title: 'Customize Your Experience',
    description: 'Personalize your dashboard, notifications, and preferences to match your workflow.',
    targetSelector: '[data-tour="settings"]',
    position: 'right'
  }
]

export default function WelcomeTour({ isOpen, onClose, onComplete }: WelcomeTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && tourSteps[currentStep]) {
      const element = document.querySelector(tourSteps[currentStep].targetSelector) as HTMLElement
      setTargetElement(element)
      
      if (element) {
        const rect = element.getBoundingClientRect()
        const position = tourSteps[currentStep].position
        
        let top = 0
        let left = 0
        
        switch (position) {
          case 'top':
            top = rect.top - 20
            left = rect.left + rect.width / 2
            break
          case 'bottom':
            top = rect.bottom + 20
            left = rect.left + rect.width / 2
            break
          case 'left':
            top = rect.top + rect.height / 2
            left = rect.left - 20
            break
          case 'right':
            top = rect.top + rect.height / 2
            left = rect.right + 20
            break
        }
        
        setTooltipPosition({ top, left })
      }
    }
  }, [isOpen, currentStep])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    onClose()
  }

  const currentTourStep = tourSteps[currentStep]

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            onClick={handleSkip}
          />
          
          {/* Highlight overlay for target element */}
          {targetElement && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed z-50 pointer-events-none"
              style={{
                top: targetElement.offsetTop - 4,
                left: targetElement.offsetLeft - 4,
                width: targetElement.offsetWidth + 8,
                height: targetElement.offsetHeight + 8,
                borderRadius: '8px',
                boxShadow: '0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3)',
                background: 'rgba(59, 130, 246, 0.1)'
              }}
            />
          )}

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200"
            style={{
              top: tooltipPosition.top,
              left: tooltipPosition.left,
              transform: 'translate(-50%, -50%)'
            }}
          >
            {/* Arrow */}
            <div 
              className="absolute w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45"
              style={{
                top: currentTourStep.position === 'bottom' ? '-8px' : 'auto',
                bottom: currentTourStep.position === 'top' ? '-8px' : 'auto',
                left: currentTourStep.position === 'right' ? '-8px' : 'auto',
                right: currentTourStep.position === 'left' ? '-8px' : 'auto',
                transform: `rotate(45deg) ${currentTourStep.position === 'bottom' ? 'translateY(-4px)' : 
                  currentTourStep.position === 'top' ? 'translateY(4px)' : 
                  currentTourStep.position === 'right' ? 'translateX(-4px)' : 'translateX(4px)'}`
              }}
            />

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentTourStep.title}
                </h3>
                <button
                  onClick={handleSkip}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">
                {currentTourStep.description}
              </p>

              {currentTourStep.tip && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">
                      {currentTourStep.tip}
                    </span>
                    {currentTourStep.tipLink && (
                      <a 
                        href={currentTourStep.tipLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    One-click add jobs from LinkedIn, Indeed and more.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip
                </Button>

                <div className="flex items-center space-x-2">
                  {currentStep > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handlePrevious}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Back
                    </Button>
                  )}
                  
                  <Button
                    onClick={handleNext}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                    {currentStep < tourSteps.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
                  </Button>
                </div>
              </div>

              {/* Progress */}
              <div className="flex justify-center space-x-1 mt-4">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep
                        ? 'bg-purple-600'
                        : index < currentStep
                          ? 'bg-green-500'
                          : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
} 