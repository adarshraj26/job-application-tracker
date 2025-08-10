import { useState } from 'react'
import { Edit, Trash2, ExternalLink, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { StatusBadge, ConfirmationModal } from '@/components/common'
import { useApplications } from '@/context/ApplicationContext'
import { JobApplication } from '@/types'
import { formatDate, formatCurrency } from '@/utils/formatters'
import ApplicationModal from './ApplicationModal'

interface ApplicationTableProps {
  applications: JobApplication[]
}

export default function ApplicationTable({ applications }: ApplicationTableProps) {
  const { deleteApplication } = useApplications()
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [applicationToDelete, setApplicationToDelete] = useState<string | null>(null)

  const handleEdit = (application: JobApplication) => {
    console.log('✏️ Edit button clicked for application:', application)
    console.log('✏️ Application ID:', application.id)
    if (!application.id) {
      console.error('❌ Edit failed: No application ID provided')
      alert('Error: Application ID not found. Please refresh the page and try again.')
      return
    }
    setSelectedApplication(application)
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    console.log('🗑️ Delete button clicked for application ID:', id)
    if (!id) {
      console.error('❌ Delete failed: No application ID provided')
      alert('Error: Application ID not found. Please refresh the page and try again.')
      return
    }
    setApplicationToDelete(id)
    setDeleteModalOpen(true)
  }

  const confirmDelete = async () => {
    if (!applicationToDelete) return
    
    try {
      console.log('🗑️ Confirmed delete, calling deleteApplication with ID:', applicationToDelete)
      await deleteApplication(applicationToDelete)
      console.log('✅ Delete successful for ID:', applicationToDelete)
    } catch (error) {
      console.error('❌ Delete failed for ID:', applicationToDelete, error)
    }
  }

  const openResume = (url: string) => {
    window.open(url, '_blank')
  }

  if (applications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No applications found. Add your first application to get started.
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.No.</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden sm:table-cell">Position</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden xl:table-cell">Contact</TableHead>
              <TableHead className="hidden lg:table-cell">Work Mode</TableHead>
              <TableHead className="hidden xl:table-cell">Salary</TableHead>
              <TableHead className="hidden md:table-cell">Applied Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Outcome</TableHead>
              <TableHead className="hidden lg:table-cell">Resume</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applications.map((application, index) => (
              <TableRow key={application.id || `app-${index}`}>
                <TableCell className="font-medium text-center">
                  {index + 1}
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm">{application.companyName}</span>
                    <span className="text-xs text-muted-foreground hidden sm:inline">{application.position}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{application.position}</TableCell>
                <TableCell className="hidden md:table-cell">{application.location}</TableCell>
                <TableCell className="hidden xl:table-cell">
                  {application.contactPerson ? (
                    <div className="text-sm">
                      <div className="font-medium">{application.contactPerson}</div>
                      {application.contactEmail && (
                        <div className="text-xs text-muted-foreground">{application.contactEmail}</div>
                      )}
                    </div>
                  ) : (
                    <span className="text-muted-foreground text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <Badge variant="outline">{application.workMode}</Badge>
                </TableCell>
                <TableCell className="hidden xl:table-cell">{formatCurrency(application.salary)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-muted-foreground" />
                    {formatDate(application.appliedDate)}
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={application.status} />
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <StatusBadge outcome={application.outcome} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {application.resumeUrl && (
                    <div className="relative group">
                      <Button
                        size="sm"
                        onClick={() => openResume(application.resumeUrl!)}
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        View
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="relative group">
                      <Button
                        size="sm"
                        onClick={() => handleEdit(application)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        Edit
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                    <div className="relative group">
                      <Button
                        size="sm"
                        onClick={() => handleDelete(application.id)}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                        Delete
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-l-gray-800 border-r-4 border-r-gray-800 border-t-4 border-t-gray-800 border-transparent"></div>
                      </div>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
}