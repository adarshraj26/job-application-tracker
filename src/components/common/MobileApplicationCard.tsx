import { Edit, Trash2, ExternalLink, Calendar, MapPin, Building, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatusBadge } from '@/components/common'
import { JobApplication } from '@/types'
import { formatDate, formatCurrency } from '@/utils/formatters'

interface MobileApplicationCardProps {
  application: JobApplication
  onEdit: (application: JobApplication) => void
  onDelete: (id: string) => void
  onViewResume: (url: string) => void
}

export default function MobileApplicationCard({ 
  application, 
  onEdit, 
  onDelete, 
  onViewResume 
}: MobileApplicationCardProps) {
  return (
    <Card className="mb-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
              {application.companyName}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 mb-2">
              {application.position}
            </CardDescription>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>{application.location}</span>
              <span>•</span>
              <span>{application.workMode}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <StatusBadge status={application.status} />
            <StatusBadge outcome={application.outcome} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Key Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">Applied</div>
              <div className="text-gray-600">{formatDate(application.appliedDate)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <div>
              <div className="font-medium text-gray-900">Salary</div>
              <div className="text-gray-600">{formatCurrency(application.salary)}</div>
            </div>
          </div>
        </div>

        {/* Priority and Contact */}
        <div className="flex items-center justify-between">
          <Badge 
            variant={application.priority === 'High' ? 'destructive' : 
                   application.priority === 'Medium' ? 'default' : 'secondary'}
            className="text-xs"
          >
            {application.priority || 'Medium'} Priority
          </Badge>
          {application.contactPerson && (
            <div className="text-xs text-gray-600">
              <div className="font-medium">{application.contactPerson}</div>
              {application.contactEmail && (
                <div className="text-gray-500">{application.contactEmail}</div>
              )}
            </div>
          )}
        </div>

        {/* Interview Rounds Summary */}
        {application.interviewRounds && application.interviewRounds.length > 0 && (
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs font-medium text-gray-700 mb-2">Interview Rounds</div>
            <div className="flex flex-wrap gap-1">
              {application.interviewRounds.map((round, index) => (
                <Badge 
                  key={round.id || `round-${index}`} 
                  variant="outline" 
                  className="text-xs"
                >
                  {round.roundName}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onEdit(application)}
              className="text-emerald-600 border-emerald-300 hover:bg-emerald-50"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onDelete(application.id)}
              className="text-red-600 border-red-300 hover:bg-red-50"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </Button>
          </div>
          {application.resumeUrl && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => onViewResume(application.resumeUrl!)}
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Resume
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 