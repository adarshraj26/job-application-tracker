import { motion } from 'framer-motion'
import { Flame, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StreakCounterProps {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
}

export default function StreakCounter({ currentStreak, longestStreak, lastActivityDate }: StreakCounterProps) {
  const getStreakColor = (streak: number) => {
    if (streak >= 30) return 'text-orange-600'
    if (streak >= 14) return 'text-yellow-600'
    if (streak >= 7) return 'text-green-600'
    return 'text-blue-600'
  }

  const getStreakMessage = (streak: number) => {
    if (streak >= 30) return "🔥 You're on fire! Keep it up!"
    if (streak >= 14) return "🌟 Great consistency! You're building momentum!"
    if (streak >= 7) return "💪 Good start! Keep the momentum going!"
    return "🚀 Every day counts! Keep pushing forward!"
  }

  return (
    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Flame className="h-5 w-5" />
          Activity Streak
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Streak */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-orange-600 mb-2">
            {currentStreak}
          </div>
          <div className="text-sm text-orange-700 mb-3">
            {currentStreak === 1 ? 'day' : 'days'} active
          </div>
          <div className="text-xs text-orange-600">
            {getStreakMessage(currentStreak)}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">{longestStreak}</div>
            <div className="text-xs text-orange-700">Longest Streak</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">
              {Math.round((currentStreak / Math.max(longestStreak, 1)) * 100)}%
            </div>
            <div className="text-xs text-orange-700">Of Best</div>
          </div>
        </div>

        {/* Last Activity */}
        <div className="flex items-center gap-2 text-sm text-orange-700">
          <Calendar className="h-4 w-4" />
          <span>Last active: {lastActivityDate.toLocaleDateString()}</span>
        </div>

        {/* Streak Visualization */}
        <div className="space-y-2">
          <div className="text-xs text-orange-700">Recent Activity</div>
          <div className="flex gap-1">
            {Array.from({ length: 7 }, (_, i) => {
              const daysAgo = 6 - i
              const isActive = daysAgo <= currentStreak
              return (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`w-3 h-3 rounded-full ${
                    isActive ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  title={`${daysAgo} days ago`}
                />
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 