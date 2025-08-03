import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from './ThemeToggle'

export default function LandingHeader() {
  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/20 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                JobTracker
              </span>
              <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1">Career Management</p>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
} 