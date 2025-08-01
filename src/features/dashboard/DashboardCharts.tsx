import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useApplications } from '@/context/ApplicationContext'

export default function DashboardCharts() {
  const { stats } = useApplications()

  const StatusChart = () => {
    const statusEntries = Object.entries(stats.statusBreakdown).filter(([_, count]) => (count as number) > 0)

    if (statusEntries.length === 0) {
      return <div className="text-center text-gray-500 py-8">No data available</div>
    }

    return (
      <div className="space-y-2">
        {statusEntries.map(([status, count]) => (
          <div key={status} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{status}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-600 h-2 rounded-full" 
                  style={{ width: `${((count as number) / stats.totalApplications) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-8 text-right text-gray-900">{count as number}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const OutcomeChart = () => {
    const outcomeEntries = Object.entries(stats.outcomeBreakdown).filter(([_, count]) => (count as number) > 0)

    if (outcomeEntries.length === 0) {
      return <div className="text-center text-gray-500 py-8">No data available</div>
    }

    return (
      <div className="space-y-2">
        {outcomeEntries.map(([outcome, count]) => (
          <div key={outcome} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{outcome}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-600 h-2 rounded-full" 
                  style={{ width: `${((count as number) / stats.totalApplications) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-8 text-right text-gray-900">{count as number}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  const SourceChart = () => {
    const sourceEntries = Object.entries(stats.sourceBreakdown).filter(([_, count]) => (count as number) > 0)

    if (sourceEntries.length === 0) {
      return <div className="text-center text-gray-500 py-8">No data available</div>
    }

    return (
      <div className="space-y-2">
        {sourceEntries.map(([source, count]) => (
          <div key={source} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{source}</span>
            <div className="flex items-center gap-2">
              <div className="w-24 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gray-600 h-2 rounded-full" 
                  style={{ width: `${((count as number) / stats.totalApplications) * 100}%` }}
                />
              </div>
              <span className="text-sm font-medium w-8 text-right text-gray-900">{count as number}</span>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 shadow-lg bg-gradient-to-br from-indigo-50 to-indigo-100">
        <CardHeader>
          <CardTitle className="text-indigo-900">Application Status</CardTitle>
          <CardDescription className="text-indigo-700">
            Breakdown by current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <StatusChart />
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 shadow-lg bg-gradient-to-br from-emerald-50 to-emerald-100">
        <CardHeader>
          <CardTitle className="text-emerald-900">Application Outcomes</CardTitle>
          <CardDescription className="text-emerald-700">
            Results of your applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OutcomeChart />
        </CardContent>
      </Card>

      <Card className="group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 shadow-lg bg-gradient-to-br from-rose-50 to-rose-100">
        <CardHeader>
          <CardTitle className="text-rose-900">Application Sources</CardTitle>
          <CardDescription className="text-rose-700">
            Where you found these jobs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SourceChart />
        </CardContent>
      </Card>
    </div>
  )
}