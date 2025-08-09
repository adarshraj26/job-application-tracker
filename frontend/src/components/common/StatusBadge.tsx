
import { Badge } from '@/components/ui/badge'
import { ApplicationStatus, ApplicationOutcome } from '@/types'
import { STATUS_COLORS, OUTCOME_COLORS } from '@/utils/constants'

interface StatusBadgeProps {
  status?: ApplicationStatus
  outcome?: ApplicationOutcome
  className?: string
}

export default function StatusBadge({ status, outcome, className }: StatusBadgeProps) {
  if (status) {
    return (
      <Badge 
        variant="outline" 
        className={`${STATUS_COLORS[status]} ${className}`}
      >
        {status}
      </Badge>
    )
  }

  if (outcome) {
    return (
      <Badge 
        variant="outline" 
        className={`${OUTCOME_COLORS[outcome]} ${className}`}
      >
        {outcome}
      </Badge>
    )
  }

  return null
}