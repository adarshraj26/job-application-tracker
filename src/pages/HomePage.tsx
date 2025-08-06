import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, FileText, Target, TrendingUp, Clock, CheckCircle, Search, Bell, Calendar, Star, Zap, Users, Award, BookOpen } from 'lucide-react'
import { useApplications } from '@/context/ApplicationContext'

export default function HomePage() {
  const { applications, stats } = useApplications()

  // Get recent applications (last 3)
  const recentApplications = applications.slice(0, 3)

  // Quick action items
  const quickActions = [
    {
      title: 'Add New Application',
      description: 'Start tracking a new job opportunity',
      icon: Plus,
      color: 'blue',
      link: '/applications'
    },
    {
      title: 'View Analytics',
      description: 'Check your job search progress',
      icon: BarChart3,
      color: 'green',
      link: '/dashboard'
    },
    {
      title: 'Search Jobs',
      description: 'Find new opportunities',
      icon: Search,
      color: 'purple',
      link: '/applications'
    },
    {
      title: 'Set Reminders',
      description: 'Never miss a follow-up',
      icon: Bell,
      color: 'orange',
      link: '/applications'
    }
  ]

  // Tips for job seekers
  const jobSeekerTips = [
    {
      title: 'Follow Up Promptly',
      description: 'Send thank-you emails within 24 hours of interviews',
      icon: Clock,
      color: 'blue'
    },
    {
      title: 'Customize Your Resume',
      description: 'Tailor your resume for each specific job application',
      icon: FileText,
      color: 'green'
    },
    {
      title: 'Network Actively',
      description: 'Connect with professionals in your target industry',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Track Your Progress',
      description: 'Monitor application-to-interview conversion rates',
      icon: TrendingUp,
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
      green: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300',
      purple: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300',
      orange: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Welcome Section */}
      <div className="text-center space-y-6 lg:space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Welcome back!
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Ready to take your job search to the next level? Let's track your progress and land your dream job.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/applications" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Application</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-2 hover:bg-white/80 shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>View Analytics</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Applications</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-4 w-4 text-blue-700 dark:text-blue-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-blue-700 dark:text-blue-300">{stats?.totalApplications || 0}</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">In Progress</CardTitle>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="h-4 w-4 text-green-700 dark:text-green-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-green-700 dark:text-green-300">{stats?.appliedCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Interviews</CardTitle>
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Clock className="h-4 w-4 text-orange-700 dark:text-orange-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-orange-700 dark:text-orange-300">{stats?.interviewingCount || 0}</div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Offers</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <Award className="h-4 w-4 text-purple-700 dark:text-purple-300" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl lg:text-3xl font-bold text-purple-700 dark:text-purple-300">{stats?.selectedCount || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Card key={action.title} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
                <CardHeader className="space-y-4">
                  <div className={`p-3 ${getColorClasses(action.color)} rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{action.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {action.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={action.link} className="flex items-center justify-center space-x-2">
                      <span>Get Started</span>
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentApplications.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {recentApplications.map((application) => (
              <Card key={application.id} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {application.position}
                    </CardTitle>
                                         <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                       application.status === 'Applied' ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' :
                       application.status.includes('Round') ? 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' :
                       application.outcome === 'Selected' ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' :
                       'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                     }`}>
                       {application.status}
                     </div>
                   </div>
                   <CardDescription className="text-gray-600 dark:text-gray-300">
                     {application.companyName}
                   </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Applied: {new Date(application.appliedDate).toLocaleDateString()}</span>
                    <Calendar className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Job Seeker Tips */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Pro Tips for Job Seekers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {jobSeekerTips.map((tip, index) => {
            const IconComponent = tip.icon
            return (
              <Card key={tip.title} className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
                <CardHeader className="space-y-4">
                  <div className={`p-3 ${getColorClasses(tip.color)} rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{tip.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {tip.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Get Started Section for New Users */}
      {stats?.totalApplications === 0 && (
        <Card className="text-center p-8 lg:p-12 border border-gray-200 dark:border-gray-600 shadow-xl bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-fit mx-auto">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Ready to accelerate your job search?
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Start tracking your applications and get insights that will help you land your dream job faster.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 font-semibold">
              <Link to="/applications" className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Add Your First Application</span>
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
