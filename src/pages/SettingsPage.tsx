import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Upload, Trash2, Database, Shield, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BackupService } from '@/services/backupService'
import { useAuth } from '@/context/AuthContext'
import { useApplications } from '@/context/ApplicationContext'

export default function SettingsPage() {
  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const { user, logout } = useAuth()
  const { applications } = useApplications()
  const backupService = BackupService.getInstance()

  const storageInfo = backupService.getStorageInfo()

  const handleExport = async () => {
    setIsExporting(true)
    try {
      backupService.downloadBackup()
      setMessage({ type: 'success', text: 'Backup downloaded successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to export backup' })
    } finally {
      setIsExporting(false)
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsImporting(true)
    try {
      await backupService.uploadBackup(file)
      setMessage({ type: 'success', text: 'Backup imported successfully! Please refresh the page.' })
      // Reload the page to update the UI
      setTimeout(() => window.location.reload(), 2000)
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to import backup. Please check the file format.' })
    } finally {
      setIsImporting(false)
    }
  }

  const handleClearData = async () => {
    if (!confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      return
    }

    setIsClearing(true)
    try {
      backupService.clearAllData()
      logout()
      setMessage({ type: 'success', text: 'All data cleared successfully!' })
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to clear data' })
    } finally {
      setIsClearing(false)
    }
  }

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Manage your data, backup your applications, and customize your experience.
        </p>
      </motion.div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
        {/* User Info */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Database className="h-5 w-5" />
              Account Information
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your account details and preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <p className="text-white">{user?.fullName || 'Not set'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300">Email</label>
                <p className="text-white">{user?.email || 'Not set'}</p>
              </div>
            </div>
            <Button variant="outline" onClick={logout} className="w-full">
              Sign Out
            </Button>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Data Management
            </CardTitle>
            <CardDescription className="text-gray-300">
              Backup, restore, and manage your application data
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Storage Usage */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Storage Usage</span>
                <span className="text-white">{formatBytes(storageInfo.used)} / {formatBytes(storageInfo.available)}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${
                    storageInfo.percentage > 80 ? 'bg-red-500' : 
                    storageInfo.percentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${storageInfo.percentage}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {applications.length} applications stored
              </p>
            </div>

            {/* Backup Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isExporting ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Exporting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Export Backup
                  </div>
                )}
              </Button>

              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isImporting}
                />
                <Button
                  disabled={isImporting}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {isImporting ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Importing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      Import Backup
                    </div>
                  )}
                </Button>
              </div>
            </div>

            {/* Clear Data */}
            <Button
              onClick={handleClearData}
              disabled={isClearing}
              variant="destructive"
              className="w-full"
            >
              {isClearing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Clearing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Clear All Data
                </div>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Information */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Important Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Local Storage:</strong> Your data is stored locally in your browser. 
                  It will be lost if you clear browser data or switch devices.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Backup:</strong> Regularly export your data to keep a safe copy 
                  of your job applications and settings.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <Shield className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <p>
                  <strong>Privacy:</strong> Your data never leaves your device. 
                  We don't have access to your personal information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Message Display */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg flex items-center gap-2 ${
              message.type === 'success' 
                ? 'bg-green-500/20 border border-green-500/30 text-green-300' 
                : 'bg-red-500/20 border border-red-500/30 text-red-300'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
            {message.text}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
} 