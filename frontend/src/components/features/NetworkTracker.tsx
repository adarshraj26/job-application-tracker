import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, UserPlus, MessageCircle, Calendar, MapPin, Building, X, Send, Clock, Loader2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { apiService } from '@/services/api'

interface Connection {
  id: string
  name: string
  company: string
  position: string
  email: string
  linkedin: string
  dateAdded: Date
  lastContact: Date
  status: 'active' | 'pending' | 'inactive'
  notes: string
  tags: string[]
}

interface NetworkTrackerProps {
  connections: Connection[]
  onAddConnection: (connection: Omit<Connection, 'id'>) => void
  onUpdateConnection: (id: string, updates: Partial<Connection>) => void
}

export default function NetworkTracker({ connections, onAddConnection, onUpdateConnection }: NetworkTrackerProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedConnection, setSelectedConnection] = useState<Connection | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    email: '',
    linkedin: '',
    status: 'pending' as 'active' | 'pending' | 'inactive',
    notes: '',
    tags: ''
  })
  const [messageData, setMessageData] = useState({
    subject: '',
    message: '',
    type: 'follow-up' as 'follow-up' | 'thank-you' | 'coffee-chat' | 'general'
  })
  const [scheduleData, setScheduleData] = useState({
    title: '',
    date: '',
    time: '',
    type: 'follow-up' as 'follow-up' | 'coffee-chat' | 'interview-prep' | 'general',
    notes: ''
  })
  const [sendingMessage, setSendingMessage] = useState(false)

  const statusCounts = {
    active: connections.filter(c => c.status === 'active').length,
    pending: connections.filter(c => c.status === 'pending').length,
    inactive: connections.filter(c => c.status === 'inactive').length
  }

  const filteredConnections = connections.filter(connection => 
    filterStatus === 'all' || connection.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200'
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'inactive': return 'bg-gray-100 text-gray-800 border-gray-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMessageInputChange = (field: string, value: string) => {
    setMessageData(prev => {
      const updated = {
        ...prev,
        [field]: value
      }
      
      // Auto-update subject and message based on message type
      if (field === 'type' && selectedConnection) {
        const messageTemplates = {
          'follow-up': {
            subject: `Follow-up with ${selectedConnection.name}`,
            message: `Hi ${selectedConnection.name},\n\nI hope this message finds you well. I wanted to follow up on our recent conversation about ${selectedConnection.position} at ${selectedConnection.company}.\n\nBest regards,\n[Your Name]`
          },
          'thank-you': {
            subject: `Thank You - ${selectedConnection.name}`,
            message: `Hi ${selectedConnection.name},\n\nThank you so much for taking the time to meet with me and share your insights about ${selectedConnection.position} at ${selectedConnection.company}. I really appreciate your guidance and advice.\n\nBest regards,\n[Your Name]`
          },
          'coffee-chat': {
            subject: `Coffee Chat Request - ${selectedConnection.name}`,
            message: `Hi ${selectedConnection.name},\n\nI hope you're doing well! I would love to grab coffee and learn more about your experience as ${selectedConnection.position} at ${selectedConnection.company}. Would you be available for a brief chat sometime this week?\n\nBest regards,\n[Your Name]`
          },
          'general': {
            subject: `Message from [Your Name]`,
            message: `Hi ${selectedConnection.name},\n\nI hope this message finds you well. I wanted to reach out and connect with you regarding your work at ${selectedConnection.company}.\n\nBest regards,\n[Your Name]`
          }
        }
        
        const template = messageTemplates[value as keyof typeof messageTemplates]
        if (template) {
          updated.subject = template.subject
          updated.message = template.message
        }
      }
      
      return updated
    })
  }

  const handleScheduleInputChange = (field: string, value: string) => {
    setScheduleData(prev => {
      const updated = {
        ...prev,
        [field]: value
      }
      
      // Auto-update title and notes based on event type
      if (field === 'type' && selectedConnection) {
        const eventTemplates = {
          'follow-up': {
            title: `Follow-up with ${selectedConnection.name}`,
            notes: `Schedule follow-up call/meeting with ${selectedConnection.name} from ${selectedConnection.company}`
          },
          'coffee-chat': {
            title: `Coffee Chat with ${selectedConnection.name}`,
            notes: `Schedule coffee chat or informal meeting with ${selectedConnection.name} to discuss career opportunities and industry insights`
          },
          'interview-prep': {
            title: `Interview Prep with ${selectedConnection.name}`,
            notes: `Schedule interview preparation session with ${selectedConnection.name} to get insights about the company and role`
          },
          'general': {
            title: `Meeting with ${selectedConnection.name}`,
            notes: `Schedule general meeting with ${selectedConnection.name} from ${selectedConnection.company}`
          }
        }
        
        const template = eventTemplates[value as keyof typeof eventTemplates]
        if (template) {
          updated.title = template.title
          updated.notes = template.notes
        }
      }
      
      return updated
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newConnection: Omit<Connection, 'id'> = {
      name: formData.name,
      company: formData.company,
      position: formData.position,
      email: formData.email,
      linkedin: formData.linkedin,
      dateAdded: new Date(),
      lastContact: new Date(),
      status: formData.status,
      notes: formData.notes,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
    }

    onAddConnection(newConnection)
    
    // Reset form
    setFormData({
      name: '',
      company: '',
      position: '',
      email: '',
      linkedin: '',
      status: 'pending',
      notes: '',
      tags: ''
    })
    
    setShowAddForm(false)
  }

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedConnection) {
      console.log('🟡 NetworkTracker: selectedConnection in handleMessageSubmit:', selectedConnection)
      console.log('🟡 NetworkTracker: selectedConnection.id:', selectedConnection.id)
      
      setSendingMessage(true)
      
      try {
        // Send the message via API
        const response = await apiService.sendMessage({
          to: selectedConnection.name,
          email: selectedConnection.email,
          subject: messageData.subject,
          message: messageData.message,
          type: messageData.type
        })
        
        if (response.status === 'success') {
          // Update last contact date
          console.log('🟡 NetworkTracker: About to call onUpdateConnection with id:', selectedConnection.id)
          await onUpdateConnection(selectedConnection.id, {
            lastContact: new Date()
          })
          
          console.log('Message sent successfully:', response.data)
          
          // Reset form
          setMessageData({
            subject: '',
            message: '',
            type: 'follow-up'
          })
          
          setShowMessageModal(false)
          setSelectedConnection(null)
        } else {
          console.error('Failed to send message:', response.message)
          alert('Failed to send message. Please try again.')
        }
      } catch (error) {
        console.error('Error sending message:', error)
        alert('Error sending message. Please try again.')
      } finally {
        setSendingMessage(false)
      }
    }
  }

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedConnection) {
      console.log('Scheduling event:', {
        with: selectedConnection.name,
        ...scheduleData
      })
      
      // Reset form
      setScheduleData({
        title: '',
        date: '',
        time: '',
        type: 'follow-up',
        notes: ''
      })
      
      setShowScheduleModal(false)
      setSelectedConnection(null)
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setFormData({
      name: '',
      company: '',
      position: '',
      email: '',
      linkedin: '',
      status: 'pending',
      notes: '',
      tags: ''
    })
  }

  const handleMessageCancel = () => {
    setShowMessageModal(false)
    setSelectedConnection(null)
    setMessageData({
      subject: '',
      message: '',
      type: 'follow-up'
    })
  }

  const handleScheduleCancel = () => {
    setShowScheduleModal(false)
    setSelectedConnection(null)
    setScheduleData({
      title: '',
      date: '',
      time: '',
      type: 'follow-up',
      notes: ''
    })
  }

  const openMessageModal = (connection: Connection) => {
    console.log('🟡 NetworkTracker: openMessageModal called with connection:', connection)
    console.log('🟡 NetworkTracker: connection.id:', connection.id)
    setSelectedConnection(connection)
    setShowMessageModal(true)
    
    // Use the same template system for initial data
    const messageTemplates = {
      'follow-up': {
        subject: `Follow-up with ${connection.name}`,
        message: `Hi ${connection.name},\n\nI hope this message finds you well. I wanted to follow up on our recent conversation about ${connection.position} at ${connection.company}.\n\nBest regards,\n[Your Name]`
      },
      'thank-you': {
        subject: `Thank You - ${connection.name}`,
        message: `Hi ${connection.name},\n\nThank you so much for taking the time to meet with me and share your insights about ${connection.position} at ${connection.company}. I really appreciate your guidance and advice.\n\nBest regards,\n[Your Name]`
      },
      'coffee-chat': {
        subject: `Coffee Chat Request - ${connection.name}`,
        message: `Hi ${connection.name},\n\nI hope you're doing well! I would love to grab coffee and learn more about your experience as ${connection.position} at ${connection.company}. Would you be available for a brief chat sometime this week?\n\nBest regards,\n[Your Name]`
      },
      'general': {
        subject: `Message from [Your Name]`,
        message: `Hi ${connection.name},\n\nI hope this message finds you well. I wanted to reach out and connect with you regarding your work at ${connection.company}.\n\nBest regards,\n[Your Name]`
      }
    }
    
    const defaultTemplate = messageTemplates['follow-up']
    
    setMessageData({
      subject: defaultTemplate.subject,
      message: defaultTemplate.message,
      type: 'follow-up'
    })
  }

  const openScheduleModal = (connection: Connection) => {
    setSelectedConnection(connection)
    setShowScheduleModal(true)
    
    // Use the same template system for initial data
    const eventTemplates = {
      'follow-up': {
        title: `Follow-up with ${connection.name}`,
        notes: `Schedule follow-up call/meeting with ${connection.name} from ${connection.company}`
      },
      'coffee-chat': {
        title: `Coffee Chat with ${connection.name}`,
        notes: `Schedule coffee chat or informal meeting with ${connection.name} to discuss career opportunities and industry insights`
      },
      'interview-prep': {
        title: `Interview Prep with ${connection.name}`,
        notes: `Schedule interview preparation session with ${connection.name} to get insights about the company and role`
      },
      'general': {
        title: `Meeting with ${connection.name}`,
        notes: `Schedule general meeting with ${connection.name} from ${connection.company}`
      }
    }
    
    const defaultTemplate = eventTemplates['follow-up']
    
    setScheduleData({
      title: defaultTemplate.title,
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      type: 'follow-up',
      notes: defaultTemplate.notes
    })
  }

  return (
    <>
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Users className="h-5 w-5" />
            Professional Network
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600">{connections.length}</div>
              <div className="text-xs text-blue-700">Total Connections</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
              <div className="text-xs text-green-700">Active</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
              <div className="text-xs text-yellow-700">Pending</div>
            </div>
          </div>

          {/* Filter */}
          <div>
            <label className="text-sm font-medium text-blue-700 mb-2 block">Filter by Status</label>
            <div className="flex flex-wrap gap-2">
              {['all', 'active', 'pending', 'inactive'].map(status => (
                <Button
                  key={status}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterStatus(status)}
                  className="text-xs"
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Add Connection Button */}
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Connection
          </Button>

          {/* Connections List */}
          <div className="space-y-3">
            {filteredConnections.map((connection, index) => (
              <motion.div
                key={connection.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white rounded-lg border border-blue-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{connection.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <Building className="h-4 w-4" />
                      <span>{connection.position} at {connection.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>Added: {connection.dateAdded.toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getStatusColor(connection.status)}`}>
                    {connection.status}
                  </Badge>
                </div>

                {connection.notes && (
                  <p className="text-sm text-gray-600 mb-3">{connection.notes}</p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {connection.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openMessageModal(connection)}
                      className="hover:bg-blue-50 hover:border-blue-300"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => openScheduleModal(connection)}
                      className="hover:bg-green-50 hover:border-green-300"
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredConnections.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p>No connections found.</p>
              <p className="text-sm">Start building your professional network!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Connection Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-t-lg relative">
              <h3 className="text-lg font-semibold">Add New Connection</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCancel}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company *
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    placeholder="Company name"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="position" className="text-sm font-medium text-gray-700">
                  Position *
                </Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  placeholder="Job title"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="email@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700">
                    LinkedIn
                  </Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    placeholder="linkedin.com/in/username"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags" className="text-sm font-medium text-gray-700">
                  Tags
                </Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="React, Frontend, Networking (comma separated)"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                  Notes
                </Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any additional notes about this connection..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Add Connection
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-lg relative">
              <h3 className="text-lg font-semibold">Send Message</h3>
              <p className="text-sm opacity-90">To: {selectedConnection.name}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMessageCancel}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleMessageSubmit} className="p-6 space-y-4">
              <div>
                <Label htmlFor="messageType" className="text-sm font-medium text-gray-700">
                  Message Type
                </Label>
                <Select
                  value={messageData.type}
                  onValueChange={(value) => handleMessageInputChange('type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="thank-you">Thank You</SelectItem>
                    <SelectItem value="coffee-chat">Coffee Chat Request</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  value={messageData.subject}
                  onChange={(e) => handleMessageInputChange('subject', e.target.value)}
                  placeholder="Message subject"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message *
                </Label>
                <Textarea
                  id="message"
                  value={messageData.message}
                  onChange={(e) => handleMessageInputChange('message', e.target.value)}
                  placeholder="Your message..."
                  className="mt-1"
                  rows={6}
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={sendingMessage}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
                >
                  {sendingMessage ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleMessageCancel}
                  disabled={sendingMessage}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Schedule Modal */}
      {showScheduleModal && selectedConnection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-lg relative">
              <h3 className="text-lg font-semibold">Schedule Event</h3>
              <p className="text-sm opacity-90">With: {selectedConnection.name}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleScheduleCancel}
                className="absolute top-4 right-4 text-white hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <Label htmlFor="scheduleType" className="text-sm font-medium text-gray-700">
                  Event Type
                </Label>
                <Select
                  value={scheduleData.type}
                  onValueChange={(value) => handleScheduleInputChange('type', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="follow-up">Follow-up Call</SelectItem>
                    <SelectItem value="coffee-chat">Coffee Chat</SelectItem>
                    <SelectItem value="interview-prep">Interview Prep</SelectItem>
                    <SelectItem value="general">General Meeting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Event Title *
                </Label>
                <Input
                  id="title"
                  value={scheduleData.title}
                  onChange={(e) => handleScheduleInputChange('title', e.target.value)}
                  placeholder="Event title"
                  required
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-700">
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleData.date}
                    onChange={(e) => handleScheduleInputChange('date', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm font-medium text-gray-700">
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) => handleScheduleInputChange('time', e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="scheduleNotes" className="text-sm font-medium text-gray-700">
                  Notes
                </Label>
                <Textarea
                  id="scheduleNotes"
                  value={scheduleData.notes}
                  onChange={(e) => handleScheduleInputChange('notes', e.target.value)}
                  placeholder="Additional notes for this event..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleScheduleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </>
  )
} 