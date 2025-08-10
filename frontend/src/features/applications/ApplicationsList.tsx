import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useApplications } from '@/context/ApplicationContext'
import { JobApplication } from '@/types'
import ApplicationTable from './ApplicationTable'
import MobileApplicationCard from '@/components/common/MobileApplicationCard'
import ApplicationModal from './ApplicationModal'
import { Table, LayoutGrid } from 'lucide-react'
import { StatusBadge, ConfirmationModal } from '@/components/common'

interface ApplicationsListProps {
  applications?: JobApplication[]
}

export default function ApplicationsList({ applications: propApplications }: ApplicationsListProps) {
  const { applications: contextApplications, deleteApplication } = useApplications()
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('cards') // Default to cards for better mobile UX
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null)
  
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
    console.log('✏️ ApplicationsList: Edit button clicked for application:', application)
    console.log('✏️ ApplicationsList: Application ID:', application.id)
    if (!application.id) {
      console.error('❌ ApplicationsList: Edit failed: No application ID provided')
      alert('Error: Application ID not found. Please refresh the page and try again.')
      return
    }
    try {
      setSelectedApplication(application)
      setIsModalOpen(true)
    } catch (error) {
      console.error('❌ ApplicationsList: Error in handleEdit:', error)
    }
  }

  const handleDelete = async (id: string) => {
    console.log('🗑️ ApplicationsList: Delete button clicked for application ID:', id)
    if (!id) {
      console.error('❌ ApplicationsList: Delete failed: No application ID provided')
      alert('Error: Application ID not found. Please refresh the page and try again.')
      return
    }
    setApplicationToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!applicationToDelete) return
    
    try {
      console.log('🗑️ ApplicationsList: Confirmed delete, calling deleteApplication with ID:', applicationToDelete)
      await deleteApplication(applicationToDelete)
      console.log('✅ ApplicationsList: Delete successful for ID:', applicationToDelete)
    } catch (error) {
      console.error('❌ ApplicationsList: Delete failed for ID:', applicationToDelete, error)
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

        <ConfirmationModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          title="Delete Application"
          message="Are you sure you want to delete this application? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
          type="delete"
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