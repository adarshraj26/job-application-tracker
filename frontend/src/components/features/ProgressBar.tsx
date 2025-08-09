import { motion } from 'framer-motion'
import { CheckCircle, Circle, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Milestone {
  id: string
  title: string
  description: string
  completed: boolean
  target: number
  current: number
}

interface ProgressBarProps {
  milestones: Milestone[]
}

export default function ProgressBar({ milestones }: ProgressBarProps) {
  const completedCount = milestones.filter(m => m.completed).length
  const totalProgress = (completedCount / milestones.length) * 100

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-green-800">
          <Target className="h-5 w-5" />
          Job Search Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-green-700">Overall Progress</span>
            <span className="font-semibold text-green-800">{Math.round(totalProgress)}%</span>
          </div>
          <div className="w-full bg-green-200 rounded-full h-3">
            <motion.div
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Milestones */}
        <div className="space-y-3">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-green-200"
            >
              <div className="flex-shrink-0">
                {milestone.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="h-5 w-5 text-green-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className={`font-medium ${milestone.completed ? 'text-green-800' : 'text-gray-700'}`}>
                  {milestone.title}
                </h4>
                <p className="text-sm text-gray-600">{milestone.description}</p>
                {!milestone.completed && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>{milestone.current}/{milestone.target}</span>
                      <span>{Math.round((milestone.current / milestone.target) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(milestone.current / milestone.target) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 