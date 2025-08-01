import { useState } from 'react'
import { Plus, Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobApplication, InterviewRound } from '@/types'
import { INTERVIEW_TYPE_OPTIONS, INTERVIEW_STATUS_OPTIONS, PERFORMANCE_OPTIONS } from '@/utils/constants'
import { formatDate } from '@/utils/formatters'

interface InterviewRoundsProps {
  application: JobApplication
  onUpdate: (application: JobApplication) => void
}

export default function InterviewRounds({ application, onUpdate }: InterviewRoundsProps) {
  const [isAddingRound, setIsAddingRound] = useState(false)
  const [newRound, setNewRound] = useState({
    roundName: '',
    date: '',
    type: '',
    status: 'Scheduled',
    notes: '',
    questions: '',
    performance: '',
    nextSteps: ''
  })

  const addInterviewRound = () => {
    if (!newRound.roundName || !newRound.date) return

    const round: InterviewRound = {
      id: Date.now().toString(),
      roundName: newRound.roundName,
      date: new Date(newRound.date),
      type: newRound.type as any,
      status: newRound.status as any,
      notes: newRound.notes || undefined,
      questions: newRound.questions ? newRound.questions.split('\n').filter(q => q.trim()) : undefined,
      performance: newRound.performance as any,
      nextSteps: newRound.nextSteps || undefined
    }

    const updatedApplication = {
      ...application,
      interviewRounds: [...(application.interviewRounds || []), round]
    }

    onUpdate(updatedApplication)
    
    // Reset form
    setNewRound({
      roundName: '',
      date: '',
      type: '',
      status: 'Scheduled',
      notes: '',
      questions: '',
      performance: '',
      nextSteps: ''
    })
    setIsAddingRound(false)
  }

  const updateRoundStatus = (roundId: string, status: string) => {
    const updatedRounds = application.interviewRounds?.map(round => 
      round.id === roundId ? { ...round, status: status as any } : round
    ) || []

    onUpdate({
      ...application,
      interviewRounds: updatedRounds
    })
  }

  const deleteRound = (roundId: string) => {
    const updatedRounds = application.interviewRounds?.filter(round => round.id !== roundId) || []
    onUpdate({
      ...application,
      interviewRounds: updatedRounds
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'Scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent': return 'bg-green-100 text-green-800'
      case 'Good': return 'bg-blue-100 text-blue-800'
      case 'Average': return 'bg-yellow-100 text-yellow-800'
      case 'Poor': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg text-blue-900">Interview Rounds</CardTitle>
            <CardDescription className="text-blue-700">
              Track your interview progress for {application.companyName}
            </CardDescription>
          </div>
          <Button
            onClick={() => setIsAddingRound(!isAddingRound)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Round
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Add New Round Form */}
        {isAddingRound && (
          <Card className="border-blue-300 bg-white">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Round Name *</label>
                  <Input
                    placeholder="e.g., Technical Round 1, HR Interview"
                    value={newRound.roundName}
                    onChange={(e) => setNewRound(prev => ({ ...prev, roundName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Interview Date *</label>
                  <Input
                    type="date"
                    value={newRound.date}
                    onChange={(e) => setNewRound(prev => ({ ...prev, date: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Interview Type</label>
                  <Select value={newRound.type} onValueChange={(value) => setNewRound(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {INTERVIEW_TYPE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
                  <Select value={newRound.status} onValueChange={(value) => setNewRound(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {INTERVIEW_STATUS_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Notes</label>
                  <Textarea
                    placeholder="Any notes about this interview round..."
                    value={newRound.notes}
                    onChange={(e) => setNewRound(prev => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Questions Asked</label>
                  <Textarea
                    placeholder="List the questions you were asked (one per line)..."
                    value={newRound.questions}
                    onChange={(e) => setNewRound(prev => ({ ...prev, questions: e.target.value }))}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Your Performance</label>
                  <Select value={newRound.performance} onValueChange={(value) => setNewRound(prev => ({ ...prev, performance: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select performance" />
                    </SelectTrigger>
                    <SelectContent>
                      {PERFORMANCE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1 block">Next Steps</label>
                  <Input
                    placeholder="What happens next?"
                    value={newRound.nextSteps}
                    onChange={(e) => setNewRound(prev => ({ ...prev, nextSteps: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button onClick={addInterviewRound} className="bg-blue-600 hover:bg-blue-700">
                  Add Round
                </Button>
                <Button variant="outline" onClick={() => setIsAddingRound(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Interview Rounds List */}
        {application.interviewRounds && application.interviewRounds.length > 0 ? (
          <div className="space-y-3">
            {application.interviewRounds.map((round) => (
              <div key={round.id} className="p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-gray-900">{round.roundName}</h4>
                      <Badge className={`text-xs ${getStatusColor(round.status)}`}>
                        {round.status}
                      </Badge>
                      {round.performance && (
                        <Badge className={`text-xs ${getPerformanceColor(round.performance)}`}>
                          {round.performance}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(round.date)}
                      </div>
                      {round.type && (
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {round.type}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Select 
                      value={round.status} 
                      onValueChange={(value) => updateRoundStatus(round.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {INTERVIEW_STATUS_OPTIONS.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteRound(round.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {(round.notes || round.questions || round.nextSteps) && (
                  <div className="space-y-2 text-sm">
                    {round.notes && (
                      <div>
                        <span className="font-medium text-gray-700">Notes:</span> {round.notes}
                      </div>
                    )}
                    {round.questions && round.questions.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-700">Questions:</span>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {round.questions.map((question, index) => (
                            <li key={index} className="text-gray-600">{question}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {round.nextSteps && (
                      <div>
                        <span className="font-medium text-gray-700">Next Steps:</span> {round.nextSteps}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Clock className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No interview rounds added yet.</p>
            <p className="text-sm">Click "Add Round" to start tracking your interviews.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 