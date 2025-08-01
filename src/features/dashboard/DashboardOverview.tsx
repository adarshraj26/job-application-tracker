
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useApplications } from '@/context/ApplicationContext'
import { FileText, Target, Users, TrendingUp, Mail, XCircle, CheckCircle, Clock } from 'lucide-react'

export default function DashboardOverview() {
  const { stats } = useApplications()

  const overviewCards = [
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      description: 'Applications submitted',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'Active Applications',
      value: stats.activeCount,
      description: 'Currently active',
      icon: Target,
      color: 'text-green-600'
    },
    {
      title: 'Interviews Scheduled',
      value: stats.interviewingCount,
      description: 'In interview process',
      icon: Users,
      color: 'text-orange-600'
    },
    {
      title: 'Selected',
      value: stats.selectedCount,
      description: 'Successful applications',
      icon: CheckCircle,
      color: 'text-green-700'
    },
    {
      title: 'Mail Received',
      value: stats.mailReceivedCount,
      description: 'Companies responded',
      icon: Mail,
      color: 'text-purple-600'
    },
    {
      title: 'Rejected',
      value: stats.rejectedCount,
      description: 'Applications rejected',
      icon: XCircle,
      color: 'text-red-600'
    },
    {
      title: 'Ghosting',
      value: stats.ghostingCount,
      description: 'No response received',
      icon: Clock,
      color: 'text-gray-600'
    },
    {
      title: 'Success Rate',
      value: stats.totalApplications > 0 ? Math.round((stats.selectedCount / stats.totalApplications) * 100) + '%' : '0%',
      description: 'Applications to offers ratio',
      icon: TrendingUp,
      color: 'text-emerald-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {overviewCards.map((card, index) => {
        const IconComponent = card.icon
        const cardColors = [
          'bg-gradient-to-br from-blue-50 to-blue-100',
          'bg-gradient-to-br from-emerald-50 to-emerald-100',
          'bg-gradient-to-br from-orange-50 to-orange-100',
          'bg-gradient-to-br from-green-50 to-green-100',
          'bg-gradient-to-br from-purple-50 to-purple-100',
          'bg-gradient-to-br from-red-50 to-red-100',
          'bg-gradient-to-br from-gray-50 to-gray-100',
          'bg-gradient-to-br from-teal-50 to-teal-100'
        ]
        const iconBgColors = [
          'bg-blue-200/50', 'bg-emerald-200/50', 'bg-orange-200/50', 'bg-green-200/50',
          'bg-purple-200/50', 'bg-red-200/50', 'bg-gray-200/50', 'bg-teal-200/50'
        ]
        const textColors = [
          'text-blue-700', 'text-emerald-700', 'text-orange-700', 'text-green-700',
          'text-purple-700', 'text-red-700', 'text-gray-700', 'text-teal-700'
        ]
        return (
          <Card key={card.title} className={`group hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200 shadow-lg ${cardColors[index]}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${textColors[index]}`}>
                {card.title}
              </CardTitle>
              <div className={`p-2 ${iconBgColors[index]} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                <IconComponent className={`h-4 w-4 ${textColors[index]}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${textColors[index]}`}>{card.value}</div>
              <p className={`text-xs ${textColors[index]}`}>
                {card.description}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}