import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApplications } from '@/context/ApplicationContext'
import { JobApplication } from '@/types'
import ApplicationTable from './ApplicationTable'
import MobileApplicationCard from '@/components/common/MobileApplicationCard'
import ApplicationModal from './ApplicationModal'
import { Table, LayoutGrid } from 'lucide-react'

interface ApplicationsListProps {
  applications?: JobApplication[]
}

export default function ApplicationsList({ applications: propApplications }: ApplicationsListProps) {
  const { applications: contextApplications } = useApplications()
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Use prop applications if provided, otherwise use context applications
  const displayApplications = propApplications || contextApplications || []

  // Safety check
  if (!Array.isArray(displayApplications)) {
    console.error('ApplicationsList: displayApplications is not an array:', displayApplications)
    return (
      <Card>
        <CardContent>
          <p className="text-center text-gray-500">No applications available</p>
        </CardContent>
      </Card>
    )
  }

  const handleEdit = (application: JobApplication) => {
    try {
      setSelectedApplication(application)
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error in handleEdit:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      if (confirm('Are you sure you want to delete this application?')) {
        // This would need to be implemented with the context
        console.log('Delete application:', id)
      }
    } catch (error) {
      console.error('Error in handleDelete:', error)
    }
  }

  const handleViewResume = (url: string) => {
    try {
      window.open(url, '_blank')
    } catch (error) {
      console.error('Error in handleViewResume:', error)
    }
  }

  try {
    return (
      <>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  {displayApplications.length} application{displayApplications.length !== 1 ? 's' : ''} total
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'table' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="flex items-center gap-1"
                >
                  <Table className="h-4 w-4" />
                  <span className="hidden sm:inline">Table</span>
                </Button>
                <Button
                  variant={viewMode === 'cards' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('cards')}
                  className="flex items-center gap-1"
                >
                  <LayoutGrid className="h-4 w-4" />
                  <span className="hidden sm:inline">Cards</span>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'table' ? (
              <ApplicationTable applications={displayApplications} />
            ) : (
              <div className="space-y-4">
                {displayApplications.map((application, index) => (
                  <MobileApplicationCard
                    key={application.id || `app-${index}`}
                    application={application}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onViewResume={handleViewResume}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <ApplicationModal
          application={selectedApplication}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedApplication(null)
          }}
        />
      </>
    )
  } catch (error) {
    console.error('ApplicationsList error:', error)
    return (
      <Card>
        <CardContent>
          <p className="text-center text-red-500">Error loading applications. Please refresh the page.</p>
        </CardContent>
      </Card>
    )
  }
}