import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, BarChart3, FileText, Target, TrendingUp, Clock, CheckCircle } from 'lucide-react'
import { useApplications } from '@/context/ApplicationContext'

export default function HomePage() {
  const { stats } = useApplications()

  const quickStats = [
    { title: 'Total Applications', value: stats?.totalApplications || 0, icon: FileText },
    { title: 'Applied', value: stats?.appliedCount || 0, icon: TrendingUp },
    { title: 'Interviewing', value: stats?.interviewingCount || 0, icon: Clock },
    { title: 'Selected', value: stats?.selectedCount || 0, icon: CheckCircle },
  ]

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6 lg:space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Job Application Tracker
          </h1>
          <p className="text-lg sm:text-xl text-gray-200 dark:text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Keep track of your job applications, monitor your progress, and never miss an opportunity.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Button asChild size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <Link to="/applications" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Get Started</span>
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild className="border-2 hover:bg-white/80 shadow-md hover:shadow-lg transition-all duration-300">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>View Dashboard</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {quickStats.map((stat, index) => {
          const IconComponent = stat.icon
          const cardColors = [
            'bg-white/90 dark:bg-gray-800/90',
            'bg-white/90 dark:bg-gray-800/90',
            'bg-white/90 dark:bg-gray-800/90',
            'bg-white/90 dark:bg-gray-800/90'
          ]
          const iconBgColors = [
            'bg-blue-100 dark:bg-blue-900', 'bg-emerald-100 dark:bg-emerald-900', 'bg-orange-100 dark:bg-orange-900', 'bg-purple-100 dark:bg-purple-900'
          ]
          const textColors = [
            'text-blue-700 dark:text-blue-300', 'text-emerald-700 dark:text-emerald-300', 'text-orange-700 dark:text-orange-300', 'text-purple-700 dark:text-purple-300'
          ]
          return (
            <Card key={stat.title} className={`group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg ${cardColors[index]}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className={`text-sm font-medium ${textColors[index]}`}>{stat.title}</CardTitle>
                <div className={`p-2 ${iconBgColors[index]} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`h-4 w-4 ${textColors[index]}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl lg:text-3xl font-bold ${textColors[index]}`}>{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="space-y-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <FileText className="h-6 w-6 text-indigo-700 dark:text-indigo-300" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Track Applications</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Keep all your job applications organized in one place with detailed information about each opportunity.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="space-y-4">
            <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <BarChart3 className="h-6 w-6 text-teal-700 dark:text-teal-300" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Monitor Progress</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Track your application status, interview progress, and get insights into your job search performance.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 dark:border-gray-600 shadow-lg bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="space-y-4">
            <div className="p-3 bg-rose-100 dark:bg-rose-900 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
              <Target className="h-6 w-6 text-rose-700 dark:text-rose-300" />
            </div>
            <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">Stay Organized</CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Never miss a deadline or follow-up with built-in reminders and status tracking for each application.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Get Started Section */}
      {stats?.totalApplications === 0 && (
        <Card className="text-center p-8 lg:p-12 border border-gray-200 dark:border-gray-600 shadow-xl bg-white/90 dark:bg-gray-800/90">
          <CardHeader className="space-y-4">
            <div className="p-4 bg-amber-100 dark:bg-amber-900 rounded-full w-fit mx-auto">
              <Plus className="h-8 w-8 text-amber-700 dark:text-amber-300" />
            </div>
            <CardTitle className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Ready to get started?
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Add your first job application to begin tracking your career journey.
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
