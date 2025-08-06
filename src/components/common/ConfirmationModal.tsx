import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  type?: 'delete' | 'warning' | 'info'
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "delete"
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  const getTypeStyles = () => {
    switch (type) {
      case 'delete':
        return {
          icon: Trash2,
          iconColor: 'text-red-500',
          bgColor: 'bg-red-50 dark:bg-red-900/20',
          borderColor: 'border-red-200 dark:border-red-800',
          buttonColor: 'bg-red-500 hover:bg-red-600 text-white',
          titleColor: 'text-red-900 dark:text-red-100'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-yellow-500',
          bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
          borderColor: 'border-yellow-200 dark:border-yellow-800',
          buttonColor: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          titleColor: 'text-yellow-900 dark:text-yellow-100'
        }
      default:
        return {
          icon: AlertTriangle,
          iconColor: 'text-blue-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-800',
          buttonColor: 'bg-blue-500 hover:bg-blue-600 text-white',
          titleColor: 'text-blue-900 dark:text-blue-100'
        }
    }
  }

  const styles = getTypeStyles()
  const IconComponent = styles.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
                               <Card className={`relative overflow-hidden border-2 shadow-2xl ${styles.borderColor} ${styles.bgColor}`}>
                     {/* Background Pattern */}
                     <div className="absolute inset-0 opacity-5">
                       <div className="absolute top-0 left-0 w-20 h-20 border-2 border-current rounded-full -translate-x-10 -translate-y-10"></div>
                       <div className="absolute bottom-0 right-0 w-16 h-16 border-2 border-current rounded-full translate-x-8 translate-y-8"></div>
                     </div>

              <CardHeader className="text-center pb-4 relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 15 }}
                  className="mx-auto mb-4 w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg"
                >
                  <IconComponent className={`h-8 w-8 ${styles.iconColor}`} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CardTitle className={`text-xl font-bold mb-2 ${styles.titleColor}`}>
                    {title}
                  </CardTitle>
                </motion.div>
              </CardHeader>

              <CardContent className="text-center pb-6 relative z-10">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 dark:text-gray-300 mb-6 text-lg"
                >
                  {message}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex gap-3 justify-center"
                >
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6 py-2 border-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                  >
                    {cancelText}
                  </Button>
                                           <Button
                           onClick={handleConfirm}
                           className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105`}
                         >
                           {confirmText}
                         </Button>
                </motion.div>
              </CardContent>

              {/* Close Button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer z-20"
                type="button"
              >
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              </motion.button>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 