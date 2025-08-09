import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, RotateCcw, Timer, Coffee, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface FocusTimerProps {
  onSessionComplete: (duration: number, type: string) => void
}

export default function FocusTimer({ onSessionComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [sessionType, setSessionType] = useState<'focus' | 'break' | 'longBreak'>('focus')
  const [completedSessions, setCompletedSessions] = useState(0)
  const [totalFocusTime, setTotalFocusTime] = useState(0)

  const sessionDurations = {
    focus: 25 * 60,
    break: 5 * 60,
    longBreak: 15 * 60
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const startTimer = useCallback(() => {
    setIsRunning(true)
  }, [])

  const pauseTimer = useCallback(() => {
    setIsRunning(false)
  }, [])

  const resetTimer = useCallback(() => {
    setIsRunning(false)
    setTimeLeft(sessionDurations[sessionType])
  }, [sessionType])

  const switchSession = useCallback((type: 'focus' | 'break' | 'longBreak') => {
    setSessionType(type)
    setTimeLeft(sessionDurations[type])
    setIsRunning(false)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Session completed
            if (sessionType === 'focus') {
              setCompletedSessions(prev => prev + 1)
              setTotalFocusTime(prev => prev + sessionDurations.focus)
              onSessionComplete(sessionDurations.focus, 'focus')
            }
            
            // Auto-switch to next session type
            if (sessionType === 'focus') {
              const nextBreak = completedSessions % 4 === 3 ? 'longBreak' : 'break'
              switchSession(nextBreak)
            } else {
              switchSession('focus')
            }
            return sessionDurations[sessionType === 'focus' ? (completedSessions % 4 === 3 ? 'longBreak' : 'break') : 'focus']
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isRunning, timeLeft, sessionType, completedSessions, switchSession, onSessionComplete])

  const getSessionColor = (type: string) => {
    switch (type) {
      case 'focus': return 'text-red-600'
      case 'break': return 'text-green-600'
      case 'longBreak': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  const getSessionBgColor = (type: string) => {
    switch (type) {
      case 'focus': return 'bg-red-50 border-red-200'
      case 'break': return 'bg-green-50 border-green-200'
      case 'longBreak': return 'bg-blue-50 border-blue-200'
      default: return 'bg-gray-50 border-gray-200'
    }
  }

  const progress = ((sessionDurations[sessionType] - timeLeft) / sessionDurations[sessionType]) * 100

  return (
    <Card className={`${getSessionBgColor(sessionType)}`}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-gray-800">
          <Timer className="h-5 w-5" />
          Focus Timer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Session Type Selector */}
        <div className="flex gap-2">
          <Button
            variant={sessionType === 'focus' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchSession('focus')}
            className="flex-1"
          >
            <Target className="h-4 w-4 mr-1" />
            Focus
          </Button>
          <Button
            variant={sessionType === 'break' ? 'default' : 'outline'}
            size="sm"
            onClick={() => switchSession('break')}
            className="flex-1"
          >
            <Coffee className="h-4 w-4 mr-1" />
            Break
          </Button>
        </div>

        {/* Timer Display */}
        <motion.div
          className="text-center"
          animate={{ scale: isRunning ? 1.05 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`text-6xl font-bold ${getSessionColor(sessionType)} mb-4`}>
            {formatTime(timeLeft)}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div
              className={`h-2 rounded-full ${
                sessionType === 'focus' ? 'bg-red-500' : 
                sessionType === 'break' ? 'bg-green-500' : 'bg-blue-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={isRunning ? pauseTimer : startTimer}
            className={`${
              sessionType === 'focus' ? 'bg-red-600 hover:bg-red-700' :
              sessionType === 'break' ? 'bg-green-600 hover:bg-green-700' :
              'bg-blue-600 hover:bg-blue-700'
            } text-white`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            onClick={resetTimer}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-gray-800">{completedSessions}</div>
            <div className="text-xs text-gray-600">Sessions Completed</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border">
            <div className="text-2xl font-bold text-gray-800">
              {Math.round(totalFocusTime / 60)}
            </div>
            <div className="text-xs text-gray-600">Total Focus Minutes</div>
          </div>
        </div>

        {/* Session Info */}
        <div className="text-center text-sm text-gray-600">
          <p>
            {sessionType === 'focus' ? 'Focus Session' : 
             sessionType === 'break' ? 'Short Break' : 'Long Break'}
          </p>
          <p className="text-xs">
            {sessionType === 'focus' ? 'Stay focused on your job search tasks' :
             sessionType === 'break' ? 'Take a short break to refresh' :
             'Take a longer break to recharge'}
          </p>
        </div>
      </CardContent>
    </Card>
  )
} 