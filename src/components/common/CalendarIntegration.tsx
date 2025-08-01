import { useState } from 'react'
import { Calendar, ExternalLink, Download, Upload, Clock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobApplication } from '@/types'
import { formatDate } from '@/utils/formatters'

interface CalendarIntegrationProps {
  applications: JobApplication[]
}

interface CalendarEvent {
  title: string
  description: string
  startDate: Date
  endDate: Date
  location?: string
  attendees?: string[]
}

export default function CalendarIntegration({ applications }: CalendarIntegrationProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedCalendar, setSelectedCalendar] = useState<'google' | 'outlook'>('google')

  // Extract calendar events from applications
  const getCalendarEvents = (): CalendarEvent[] => {
    const events: CalendarEvent[] = []

    applications.forEach(application => {
      // Interview dates
      if (application.nextInterviewDate) {
        const interviewDate = new Date(application.nextInterviewDate)
        events.push({
          title: `Interview: ${application.position} at ${application.companyName}`,
          description: `Interview for ${application.position} position at ${application.companyName}. Location: ${application.location}`,
          startDate: interviewDate,
          endDate: new Date(interviewDate.getTime() + 60 * 60 * 1000), // 1 hour duration
          location: application.location,
          attendees: application.contactEmail ? [application.contactEmail] : undefined
        })
      }

      // Follow-up dates
      if (application.followUpDate) {
        const followUpDate = new Date(application.followUpDate)
        events.push({
          title: `Follow-up: ${application.companyName}`,
          description: `Follow-up reminder for ${application.position} application at ${application.companyName}`,
          startDate: followUpDate,
          endDate: new Date(followUpDate.getTime() + 30 * 60 * 1000), // 30 minutes duration
          attendees: application.contactEmail ? [application.contactEmail] : undefined
        })
      }

      // Interview rounds
      application.interviewRounds?.forEach(round => {
        if (round.status === 'Scheduled') {
          events.push({
            title: `${round.roundName}: ${application.position} at ${application.companyName}`,
            description: `${round.type} interview for ${round.roundName}. ${round.notes || ''}`,
            startDate: round.date,
            endDate: new Date(round.date.getTime() + 60 * 60 * 1000), // 1 hour duration
            location: application.location
          })
        }
      })
    })

    return events.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }

  const generateGoogleCalendarUrl = (event: CalendarEvent): string => {
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: event.title,
      details: event.description,
      dates: `${event.startDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z/${event.endDate.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}Z`,
      location: event.location || '',
      add: event.attendees?.join(',') || ''
    })
    return `https://calendar.google.com/calendar/render?${params.toString()}`
  }

  const generateOutlookCalendarUrl = (event: CalendarEvent): string => {
    const params = new URLSearchParams({
      path: '/calendar/action/compose',
      rru: 'addevent',
      subject: event.title,
      startdt: event.startDate.toISOString(),
      enddt: event.endDate.toISOString(),
      body: event.description,
      location: event.location || '',
      to: event.attendees?.join(';') || ''
    })
    return `https://outlook.live.com/calendar/0/${params.toString()}`
  }

  const exportToCalendar = (event: CalendarEvent) => {
    const url = selectedCalendar === 'google' 
      ? generateGoogleCalendarUrl(event)
      : generateOutlookCalendarUrl(event)
    
    window.open(url, '_blank')
  }

  const exportAllEvents = () => {
    const events = getCalendarEvents()
    events.forEach(event => {
      setTimeout(() => {
        exportToCalendar(event)
      }, 1000) // Delay to prevent browser blocking multiple popups
    })
  }

  const generateICSFile = (event: CalendarEvent): string => {
    const formatDateForICS = (date: Date): string => {
      return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
    }

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//JobTracker//Calendar Integration//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@jobtracker.com`,
      `DTSTAMP:${formatDateForICS(new Date())}`,
      `DTSTART:${formatDateForICS(event.startDate)}`,
      `DTEND:${formatDateForICS(event.endDate)}`,
      `SUMMARY:${event.title}`,
      `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${event.location || ''}`,
      event.attendees?.length ? `ATTENDEE:${event.attendees.join(',')}` : '',
      'END:VEVENT',
      'END:VCALENDAR'
    ].filter(line => line).join('\r\n')

    return `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`
  }

  const downloadICSFile = (event: CalendarEvent) => {
    const icsData = generateICSFile(event)
    const link = document.createElement('a')
    link.href = icsData
    link.download = `${event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
    link.click()
  }

  const events = getCalendarEvents()
  const upcomingEvents = events.filter(event => event.startDate > new Date())
  const pastEvents = events.filter(event => event.startDate <= new Date())

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg text-purple-900">Calendar Integration</CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-700 border-purple-300 hover:bg-purple-100"
          >
            {isExpanded ? 'Hide' : 'Show'} ({events.length} events)
          </Button>
        </div>
        <CardDescription className="text-purple-700">
          Sync your interview dates and follow-ups with your calendar
        </CardDescription>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4">
          {/* Calendar Selection */}
          <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-purple-200">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Export to:</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={selectedCalendar === 'google' ? 'default' : 'outline'}
                  onClick={() => setSelectedCalendar('google')}
                  className="text-xs"
                >
                  Google Calendar
                </Button>
                <Button
                  size="sm"
                  variant={selectedCalendar === 'outlook' ? 'default' : 'outline'}
                  onClick={() => setSelectedCalendar('outlook')}
                  className="text-xs"
                >
                  Outlook
                </Button>
              </div>
            </div>
            <Button
              size="sm"
              onClick={exportAllEvents}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Upload className="h-4 w-4 mr-1" />
              Export All Events
            </Button>
          </div>

          {/* Upcoming Events */}
          {upcomingEvents.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Upcoming Events ({upcomingEvents.length})
              </h4>
              <div className="space-y-2">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{event.title}</h5>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{formatDate(event.startDate)}</span>
                          {event.location && <span>📍 {event.location}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => exportToCalendar(event)}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          Add to {selectedCalendar === 'google' ? 'Google' : 'Outlook'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadICSFile(event)}
                          className="text-green-600 border-green-300 hover:bg-green-50"
                        >
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Events */}
          {pastEvents.length > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-gray-600" />
                Past Events ({pastEvents.length})
              </h4>
              <div className="space-y-2">
                {pastEvents.slice(0, 5).map((event, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-700">{event.title}</h5>
                        <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                          <span>{formatDate(event.startDate)}</span>
                          {event.location && <span>📍 {event.location}</span>}
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        Completed
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-6 text-gray-500">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No calendar events found.</p>
              <p className="text-sm">Add interview dates or follow-up dates to see them here.</p>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
} 