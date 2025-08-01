import { useState, useMemo } from 'react'
import { TrendingUp, TrendingDown, Target, Clock, DollarSign, MapPin, Building, Users, Calendar, BarChart3, PieChart, Activity } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { JobApplication } from '@/types'
import { formatDate } from '@/utils/formatters'

interface AdvancedAnalyticsProps {
  applications: JobApplication[]
}

interface AnalyticsData {
  totalApplications: number
  activeApplications: number
  completedApplications: number
  averageResponseTime: number
  successRate: number
  averageSalary: string
  topCompanies: Array<{ name: string; count: number }>
  topPositions: Array<{ title: string; count: number }>
  topLocations: Array<{ location: string; count: number }>
  monthlyTrends: Array<{ month: string; applications: number; interviews: number }>
  sourceEffectiveness: Array<{ source: string; count: number; successRate: number }>
  interviewSuccessRate: number
  averageInterviewRounds: number
  timeToHire: number
}

export default function AdvancedAnalytics({ applications }: AdvancedAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<'30d' | '90d' | '6m' | '1y'>('90d')
  const [selectedMetric, setSelectedMetric] = useState<'overview' | 'trends' | 'performance' | 'insights'>('overview')

  const analyticsData = useMemo((): AnalyticsData => {
    const now = new Date()
    const timeRangeMs = {
      '30d': 30 * 24 * 60 * 60 * 1000,
      '90d': 90 * 24 * 60 * 60 * 1000,
      '6m': 6 * 30 * 24 * 60 * 60 * 1000,
      '1y': 365 * 24 * 60 * 60 * 1000
    }

    const filteredApplications = applications.filter(app => 
      now.getTime() - app.appliedDate.getTime() <= timeRangeMs[timeRange]
    )

    const totalApplications = filteredApplications.length
    const activeApplications = filteredApplications.filter(app => app.outcome === 'Active').length
    const completedApplications = filteredApplications.filter(app => app.outcome !== 'Active').length
    const selectedApplications = filteredApplications.filter(app => app.outcome === 'Selected').length

    // Calculate average response time
    const applicationsWithResponse = filteredApplications.filter(app => app.mailReceived)
    const averageResponseTime = applicationsWithResponse.length > 0 
      ? applicationsWithResponse.reduce((sum, app) => {
          const responseTime = app.updatedAt.getTime() - app.appliedDate.getTime()
          return sum + responseTime
        }, 0) / applicationsWithResponse.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0

    // Calculate success rate
    const successRate = totalApplications > 0 ? (selectedApplications / totalApplications) * 100 : 0

    // Calculate average salary (simplified)
    const salaryApplications = filteredApplications.filter(app => app.salary && app.salary !== 'Negotiable')
    const averageSalary = salaryApplications.length > 0 
      ? salaryApplications.reduce((sum, app) => {
          const salary = parseFloat(app.salary.replace(/[^0-9]/g, '')) || 0
          return sum + salary
        }, 0) / salaryApplications.length
      : 0

    // Top companies
    const companyCounts = filteredApplications.reduce((acc, app) => {
      acc[app.companyName] = (acc[app.companyName] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const topCompanies = Object.entries(companyCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top positions
    const positionCounts = filteredApplications.reduce((acc, app) => {
      acc[app.position] = (acc[app.position] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const topPositions = Object.entries(positionCounts)
      .map(([title, count]) => ({ title, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Top locations
    const locationCounts = filteredApplications.reduce((acc, app) => {
      acc[app.location] = (acc[app.location] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    const topLocations = Object.entries(locationCounts)
      .map(([location, count]) => ({ location, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Monthly trends
    const monthlyData = filteredApplications.reduce((acc, app) => {
      const month = app.appliedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      if (!acc[month]) acc[month] = { applications: 0, interviews: 0 }
      acc[month].applications++
      if (app.interviewRounds && app.interviewRounds.length > 0) {
        acc[month].interviews++
      }
      return acc
    }, {} as Record<string, { applications: number; interviews: number }>)
    const monthlyTrends = Object.entries(monthlyData)
      .map(([month, data]) => ({ month, ...data }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())

    // Source effectiveness
    const sourceData = filteredApplications.reduce((acc, app) => {
      if (!acc[app.source]) acc[app.source] = { count: 0, selected: 0 }
      acc[app.source].count++
      if (app.outcome === 'Selected') acc[app.source].selected++
      return acc
    }, {} as Record<string, { count: number; selected: number }>)
    const sourceEffectiveness = Object.entries(sourceData)
      .map(([source, data]) => ({
        source,
        count: data.count,
        successRate: (data.selected / data.count) * 100
      }))
      .sort((a, b) => b.successRate - a.successRate)

    // Interview metrics
    const applicationsWithInterviews = filteredApplications.filter(app => 
      app.interviewRounds && app.interviewRounds.length > 0
    )
    const totalInterviewRounds = applicationsWithInterviews.reduce((sum, app) => 
      sum + (app.interviewRounds?.length || 0), 0
    )
    const averageInterviewRounds = applicationsWithInterviews.length > 0 
      ? totalInterviewRounds / applicationsWithInterviews.length 
      : 0

    const successfulInterviews = applicationsWithInterviews.filter(app => 
      app.outcome === 'Selected'
    ).length
    const interviewSuccessRate = applicationsWithInterviews.length > 0 
      ? (successfulInterviews / applicationsWithInterviews.length) * 100 
      : 0

    // Time to hire (simplified)
    const hiredApplications = filteredApplications.filter(app => app.outcome === 'Selected')
    const timeToHire = hiredApplications.length > 0 
      ? hiredApplications.reduce((sum, app) => {
          const timeToHire = app.updatedAt.getTime() - app.appliedDate.getTime()
          return sum + timeToHire
        }, 0) / hiredApplications.length / (1000 * 60 * 60 * 24) // Convert to days
      : 0

    return {
      totalApplications,
      activeApplications,
      completedApplications,
      averageResponseTime,
      successRate,
      averageSalary: `$${Math.round(averageSalary).toLocaleString()}`,
      topCompanies,
      topPositions,
      topLocations,
      monthlyTrends,
      sourceEffectiveness,
      interviewSuccessRate,
      averageInterviewRounds,
      timeToHire
    }
  }, [applications, timeRange])

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />
    return <Target className="h-4 w-4 text-blue-600" />
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">Advanced Analytics</h2>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedMetric} onValueChange={(value: any) => setSelectedMetric(value)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="trends">Trends</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="insights">Insights</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Metrics */}
      {selectedMetric === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-900">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{analyticsData.totalApplications}</div>
              <p className="text-xs text-blue-700 mt-1">In selected time range</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-900">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{analyticsData.successRate.toFixed(1)}%</div>
              <p className="text-xs text-green-700 mt-1">Applications to offers</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-900">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">{analyticsData.averageResponseTime.toFixed(1)} days</div>
              <p className="text-xs text-purple-700 mt-1">Time to first response</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-900">Avg Salary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">{analyticsData.averageSalary}</div>
              <p className="text-xs text-orange-700 mt-1">Average offered salary</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Trends */}
      {selectedMetric === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Application Trends</CardTitle>
              <CardDescription>Applications and interviews over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.monthlyTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{trend.month}</div>
                      <div className="text-sm text-gray-600">
                        {trend.applications} applications, {trend.interviews} interviews
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{trend.applications}</Badge>
                      <Badge variant="secondary">{trend.interviews}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Companies</CardTitle>
              <CardDescription>Most applied companies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Building className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-600">{company.count} applications</div>
                      </div>
                    </div>
                    <Badge variant="outline">{company.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Performance */}
      {selectedMetric === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Performance</CardTitle>
              <CardDescription>Your interview success metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-900">{analyticsData.interviewSuccessRate.toFixed(1)}%</div>
                  <div className="text-sm text-green-700">Interview Success Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-900">{analyticsData.averageInterviewRounds.toFixed(1)}</div>
                  <div className="text-sm text-blue-700">Avg Interview Rounds</div>
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">{analyticsData.timeToHire.toFixed(1)} days</div>
                <div className="text-sm text-purple-700">Average Time to Hire</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source Effectiveness</CardTitle>
              <CardDescription>Success rates by application source</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.sourceEffectiveness.map((source, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{source.source}</div>
                      <div className="text-sm text-gray-600">{source.count} applications</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{source.successRate.toFixed(1)}%</div>
                      <div className="text-xs text-gray-600">Success Rate</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Insights */}
      {selectedMetric === 'insights' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Positions</CardTitle>
              <CardDescription>Most applied job titles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topPositions.map((position, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{position.title}</div>
                        <div className="text-sm text-gray-600">{position.count} applications</div>
                      </div>
                    </div>
                    <Badge variant="outline">{position.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Locations</CardTitle>
              <CardDescription>Most applied locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analyticsData.topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{location.location}</div>
                        <div className="text-sm text-gray-600">{location.count} applications</div>
                      </div>
                    </div>
                    <Badge variant="outline">{location.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 