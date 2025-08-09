import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ProgressBar from '@/components/features/ProgressBar'
import StreakCounter from '@/components/features/StreakCounter'
import ResumeOptimizer from '@/components/features/ResumeOptimizer'
import NetworkTracker from '@/components/features/NetworkTracker'
import SalaryInsights from '@/components/features/SalaryInsights'
import FocusTimer from '@/components/features/FocusTimer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { apiService } from '@/services/api'
import { 
  Target, 
  Flame, 
  Sparkles, 
  Users, 
  DollarSign, 
  Timer,
  TrendingUp,
  Award,
  Calendar,
  BookOpen
} from 'lucide-react'

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState('progress')
  const [connections, setConnections] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load connections from backend
  useEffect(() => {
    const loadConnections = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiService.getConnections()
        if (response.status === 'success' && response.data?.connections) {
          console.log('🟡 FeaturesPage: Loaded connections:', response.data.connections)
          console.log('🟡 FeaturesPage: First connection id:', response.data.connections[0]?.id)
          setConnections(response.data.connections)
        }
      } catch (err) {
        console.error('Error loading connections:', err)
        setError('Failed to load connections')
      } finally {
        setLoading(false)
      }
    }

    loadConnections()
  }, [])

  // Mock data for demonstration
  const mockMilestones = [
    {
      id: '1',
      title: 'Resume Optimization',
      description: 'Create a compelling resume',
      completed: true,
      target: 1,
      current: 1
    },
    {
      id: '2',
      title: 'Network Building',
      description: 'Connect with 10 professionals',
      completed: false,
      target: 10,
      current: 3
    },
    {
      id: '3',
      title: 'Applications Submitted',
      description: 'Submit 20 job applications',
      completed: false,
      target: 20,
      current: 8
    },
    {
      id: '4',
      title: 'Interviews Scheduled',
      description: 'Schedule 5 interviews',
      completed: false,
      target: 5,
      current: 1
    }
  ]

  const mockResumeSuggestions = [
    {
      id: '1',
      type: 'improvement' as const,
      category: 'content',
      title: 'Add Quantifiable Achievements',
      description: 'Include specific metrics and results in your experience section',
      impact: 'high' as const,
      implemented: false
    },
    {
      id: '2',
      type: 'addition' as const,
      category: 'keywords',
      title: 'Add Industry Keywords',
      description: 'Include relevant technical skills and industry terms',
      impact: 'medium' as const,
      implemented: true
    },
    {
      id: '3',
      type: 'formatting' as const,
      category: 'formatting',
      title: 'Improve Layout',
      description: 'Use consistent formatting and spacing',
      impact: 'low' as const,
      implemented: false
    }
  ]

  const mockSalaryData = [
    {
      role: 'Software Engineer',
      industry: 'Technology',
      averageSalary: 95000,
      minSalary: 75000,
      maxSalary: 120000,
      trend: 'up' as const,
      experienceLevel: 'Mid-level',
      location: 'San Francisco',
      lastUpdated: new Date('2024-01-01')
    },
    {
      role: 'Data Scientist',
      industry: 'Technology',
      averageSalary: 110000,
      minSalary: 85000,
      maxSalary: 140000,
      trend: 'up' as const,
      experienceLevel: 'Mid-level',
      location: 'San Francisco',
      lastUpdated: new Date('2024-01-01')
    }
  ]

  const tabs = [
    { id: 'progress', label: 'Progress', icon: Target },
    { id: 'streak', label: 'Streak', icon: Flame },
    { id: 'resume', label: 'Resume', icon: Sparkles },
    { id: 'network', label: 'Network', icon: Users },
    { id: 'salary', label: 'Salary', icon: DollarSign },
    { id: 'timer', label: 'Focus Timer', icon: Timer }
  ]

  const handleSessionComplete = (duration: number, type: string) => {
    console.log(`Session completed: ${duration}s, type: ${type}`)
  }

  const handleImplementSuggestion = (id: string) => {
    console.log(`Implementing suggestion: ${id}`)
  }

  const handleAddConnection = async (connection: any) => {
    try {
      setLoading(true)
      const response = await apiService.createConnection(connection)
      if (response.status === 'success' && response.data?.connection) {
        setConnections(prev => [...prev, response.data!.connection])
      }
    } catch (err) {
      console.error('Error adding connection:', err)
      setError('Failed to add connection')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateConnection = async (id: string, updates: any) => {
    console.log('🟡 FeaturesPage: handleUpdateConnection called with id:', id)
    console.log('🟡 FeaturesPage: handleUpdateConnection called with updates:', updates)
    try {
      setLoading(true)
      const response = await apiService.updateConnection(id, updates)
      if (response.status === 'success' && response.data?.connection) {
        setConnections(prev => prev.map(conn => 
          conn.id === id ? response.data!.connection : conn
        ))
      }
    } catch (err) {
      console.error('Error updating connection:', err)
      setError('Failed to update connection')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Job Search Features
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools to accelerate your job search and land your dream role
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => {
            const IconComponent = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <IconComponent className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>

        {/* Feature Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl mx-auto"
        >
          {activeTab === 'progress' && (
            <div className="space-y-6">
              <ProgressBar milestones={mockMilestones} />
              
              {/* Additional Progress Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 dark:from-yellow-900/20 dark:to-orange-900/20 dark:border-yellow-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                      <Award className="h-5 w-5" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">First Application</span>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">Network Milestone</span>
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200">3/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">Interview Prep</span>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200">In Progress</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 dark:from-indigo-900/20 dark:to-purple-900/20 dark:border-indigo-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200">
                      <TrendingUp className="h-5 w-5" />
                      Weekly Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">Applications</span>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">5/10</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">Networking</span>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">2/5</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                      <span className="text-sm font-medium dark:text-gray-200">Skill Building</span>
                      <Badge className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-200">3/7</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === 'streak' && (
            <div className="space-y-6">
              <StreakCounter 
                currentStreak={12}
                longestStreak={15}
                lastActivityDate={new Date()}
              />
              
              {/* Streak Rewards */}
              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 dark:from-orange-900/20 dark:to-red-900/20 dark:border-orange-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                    <Award className="h-5 w-5" />
                    Streak Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-orange-200 dark:border-orange-700/50">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">🔥</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">7 Days</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-orange-200 dark:border-orange-700/50">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">⚡</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">14 Days</div>
                    </div>
                    <div className="text-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-orange-200 dark:border-orange-700/50">
                      <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">🏆</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">30 Days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-6">
              <ResumeOptimizer 
                suggestions={mockResumeSuggestions}
                onImplementSuggestion={handleImplementSuggestion}
              />
              
              {/* Resume Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 dark:from-purple-900/20 dark:to-pink-900/20 dark:border-purple-700/50 dark:bg-gray-800/50">
                  <CardContent className="text-center p-6">
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">85%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Resume Score</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700/50 dark:bg-gray-800/50">
                  <CardContent className="text-center p-6">
                    <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">12</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Keywords Matched</div>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 dark:from-blue-900/20 dark:to-cyan-900/20 dark:border-blue-700/50 dark:bg-gray-800/50">
                  <CardContent className="text-center p-6">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Improvements Made</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

                      {activeTab === 'network' && (
              <div className="space-y-6">
                {loading && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Loading connections...</p>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-700/50">
                    <p className="text-red-800 dark:text-red-200">{error}</p>
                  </div>
                )}
                
                <NetworkTracker 
                  connections={connections}
                  onAddConnection={handleAddConnection}
                  onUpdateConnection={handleUpdateConnection}
                />
              
              {/* Networking Tips */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 dark:from-blue-900/20 dark:to-indigo-900/20 dark:border-blue-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                    <BookOpen className="h-5 w-5" />
                    Networking Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Follow Up</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Send a thank you message within 24 hours of meeting someone</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Be Specific</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Ask specific questions about their role and company</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-blue-200 dark:border-blue-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Offer Value</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Think about how you can help them, not just what they can do for you</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'salary' && (
            <div className="space-y-6">
              <SalaryInsights 
                salaryData={mockSalaryData}
                userRole="Software Engineer"
                userExperience="Mid-level"
              />
              
              {/* Salary Negotiation Tips */}
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 dark:from-emerald-900/20 dark:to-teal-900/20 dark:border-emerald-700/50 dark:bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-800 dark:text-emerald-200">
                    <DollarSign className="h-5 w-5" />
                    Negotiation Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Research First</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Know the market rate for your role and experience level</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Highlight Value</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Focus on your unique contributions and achievements</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-700 rounded-lg border border-emerald-200 dark:border-emerald-700/50">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-1">Consider Total Package</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Look beyond salary to benefits, equity, and growth opportunities</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'timer' && (
            <div className="space-y-6">
              <FocusTimer onSessionComplete={handleSessionComplete} />
              
              {/* Productivity Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-red-50 to-pink-50 border-red-200 dark:from-red-900/20 dark:to-pink-900/20 dark:border-red-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-800 dark:text-red-200">
                      <Calendar className="h-5 w-5" />
                      Today's Sessions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Focus Sessions</span>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">4</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Total Time</span>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">100 min</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Break Time</span>
                        <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">20 min</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 dark:from-green-900/20 dark:to-emerald-900/20 dark:border-green-700/50 dark:bg-gray-800/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
                      <TrendingUp className="h-5 w-5" />
                      Weekly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Sessions</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">28</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Focus Hours</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">11.7</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                        <span className="text-sm font-medium dark:text-gray-200">Consistency</span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">85%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
} 