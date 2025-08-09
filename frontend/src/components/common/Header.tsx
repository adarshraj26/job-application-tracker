import { Link, useLocation } from 'react-router-dom'
import { Briefcase, BarChart3, FileText, Home, Crown, User, LogOut, Settings, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ProUpgrade from './ProUpgrade'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const location = useLocation()
  const [showProUpgrade, setShowProUpgrade] = useState(false)
  const isProUser = localStorage.getItem('jobtracker_pro') === 'true'
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Features', href: '/features', icon: Sparkles },
  ]

  return (
    <>
      <header className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-xl rounded-3xl mx-4 sticky top-4 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <Link to="/home" className="flex items-center space-x-3 group">
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

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-1">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Button
                        key={item.name}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        asChild
                        className={`transition-all duration-200 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:text-blue-700 dark:hover:text-blue-400'
                        }`}
                      >
                        <Link to={item.href} className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </Link>
                      </Button>
                    )
                  })}
                  
                  {/* Pro Upgrade Button */}
                  {!isProUser && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowProUpgrade(true)}
                      className="ml-2 border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20"
                    >
                      <Crown className="h-4 w-4 mr-1" />
                      Pro
                    </Button>
                  )}

                  {/* User Menu */}
                  {user ? (
                    <div className="flex items-center space-x-2 ml-4">
                      <ThemeToggle />
                      <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                        <User className="h-4 w-4" />
                        <span className="hidden sm:inline">{user.fullName}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      >
                        <Link to="/settings">
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={logout}
                        className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <LogOut className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 ml-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link to="/login">Sign In</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link to="/signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </nav>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center space-x-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.href
                    return (
                      <Button
                        key={item.name}
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        asChild
                        className={`p-2 ${
                          isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:from-blue-600 hover:to-purple-700' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-blue-700'
                        }`}
                      >
                        <Link to={item.href}>
                          <Icon className="h-4 w-4" />
                        </Link>
                      </Button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>
      
      <ProUpgrade 
        isOpen={showProUpgrade} 
        onClose={() => setShowProUpgrade(false)} 
      />
    </>
  )
}