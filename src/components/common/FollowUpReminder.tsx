import { useState, useEffect } from 'react'
import { Bell, Calendar, Mail, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobApplication } from '@/types'
import { formatDate } from '@/utils/formatters'

interface FollowUpReminderProps {
  applications: JobApplication[]
}

interface FollowUpItem {
  application: JobApplication
  daysUntilFollowUp: number
  isOverdue: boolean
}

export default function FollowUpReminder({ applications }: FollowUpReminderProps) {
  const [followUpItems, setFollowUpItems] = useState<FollowUpItem[]>([])
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const today = new Date()
    const items: FollowUpItem[] = []

    applications.forEach(application => {
      if (application.followUpDate) {
        const followUpDate = new Date(application.followUpDate)
        const daysDiff = Math.ceil((followUpDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        
        // Show applications that need follow-up (within 7 days or overdue)
        if (daysDiff <= 7) {
          items.push({
            application,
            daysUntilFollowUp: daysDiff,
            isOverdue: daysDiff < 0
          })
        }
      }
    })

    // Sort by urgency (overdue first, then by days until follow-up)
    items.sort((a, b) => {
      if (a.isOverdue && !b.isOverdue) return -1
      if (!a.isOverdue && b.isOverdue) return 1
      return a.daysUntilFollowUp - b.daysUntilFollowUp
    })

    setFollowUpItems(items)
  }, [applications])

  if (followUpItems.length === 0) {
    return null
  }

  const overdueCount = followUpItems.filter(item => item.isOverdue).length
  const upcomingCount = followUpItems.filter(item => !item.isOverdue).length

  return (
    <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg text-orange-800">Follow-up Reminders</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-orange-700 border-orange-300 hover:bg-orange-100"
          >
            {isExpanded ? 'Hide' : 'Show'} ({followUpItems.length})
          </Button>
        </div>
        <CardDescription className="text-orange-700">
          {overdueCount > 0 && `${overdueCount} overdue`}
          {overdueCount > 0 && upcomingCount > 0 && ', '}
          {upcomingCount > 0 && `${upcomingCount} upcoming`} follow-up{followUpItems.length !== 1 ? 's' : ''}
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-3">
          {followUpItems.map((item) => (
            <div
              key={item.application.id}
              className={`p-3 rounded-lg border ${
                item.isOverdue 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-orange-200 bg-orange-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {item.application.companyName}
                    </h4>
                    <Badge 
                      variant={item.isOverdue ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {item.isOverdue ? 'Overdue' : 'Due Soon'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    {item.application.position} • {item.application.location}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Follow-up: {formatDate(item.application.followUpDate!)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {item.isOverdue 
                        ? `${Math.abs(item.daysUntilFollowUp)} day${Math.abs(item.daysUntilFollowUp) !== 1 ? 's' : ''} overdue`
                        : `${item.daysUntilFollowUp} day${item.daysUntilFollowUp !== 1 ? 's' : ''} left`
                      }
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {item.application.contactEmail && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`mailto:${item.application.contactEmail}`)}
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      <Mail className="h-3 w-3 mr-1" />
                      Email
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  )
} 