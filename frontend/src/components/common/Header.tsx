import { Link, useLocation } from 'react-router-dom'
import { Briefcase, BarChart3, FileText, Home, Crown, User, LogOut, Settings, Sparkles, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProUpgrade from './ProUpgrade'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '@/context/AuthContext'

export default function Header() {
  const location = useLocation()
  const [showProUpgrade, setShowProUpgrade] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isProUser = localStorage.getItem('jobtracker_pro') === 'true'
  const { user, logout } = useAuth()

  const navigation = [
    { name: 'Home', href: '/home', icon: Home },
    { name: 'Applications', href: '/applications', icon: FileText },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Features', href: '/features', icon: Sparkles },
  ]

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    closeMenu()
    logout()
  }

  return (
    <>
      <header className="bg-white/10 dark:bg-gray-900/10 backdrop-blur-md border border-white/20 dark:border-gray-700/20 shadow-xl rounded-3xl mx-2 sm:mx-4 sticky top-4 z-50">
        <div className="max-w-6xl mx-auto px-2 sm:px-4 lg:px-8">
            <div className="px-2 sm:px-4 lg:px-8">
              <div className="flex h-14 sm:h-16 items-center justify-between">
                <Link to="/home" className="flex items-center space-x-2 sm:space-x-3 group" onClick={closeMenu}>
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                      JobTracker
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400 -mt-1 hidden sm:block">Career Management</p>
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

                {/* Mobile Hamburger Menu Button */}
                <div className="md:hidden flex items-center space-x-2">
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/10 hover:bg-white/20 dark:hover:bg-gray-800/20 transition-all duration-300 ease-out"
                    aria-label="Toggle menu"
                  >
                    <motion.div
                      animate={isMenuOpen ? "open" : "closed"}
                      className="relative w-6 h-6"
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <motion.span
                        className="absolute block w-6 h-0.5 bg-gray-800 dark:bg-white transform transition-colors duration-300"
                        style={{ top: "4px" }}
                        variants={{
                          closed: { 
                            rotate: 0, 
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                          },
                          open: { 
                            rotate: 45, 
                            y: 6,
                            opacity: 1,
                            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                          }
                        }}
                      />
                      <motion.span
                        className="absolute block w-6 h-0.5 bg-gray-800 dark:bg-white transform transition-colors duration-300"
                        style={{ top: "10px" }}
                        variants={{
                          closed: { 
                            opacity: 1,
                            scale: 1,
                            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                          },
                          open: { 
                            opacity: 0,
                            scale: 0,
                            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
                          }
                        }}
                      />
                      <motion.span
                        className="absolute block w-6 h-0.5 bg-gray-800 dark:bg-white transform transition-colors duration-300"
                        style={{ top: "16px" }}
                        variants={{
                          closed: { 
                            rotate: 0, 
                            y: 0,
                            opacity: 1,
                            transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                          },
                          open: { 
                            rotate: -45, 
                            y: -6,
                            opacity: 1,
                            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
                          }
                        }}
                      />
                    </motion.div>
                  </button>
                </div>
              </div>

              {/* Mobile Navigation Menu */}
              <AnimatePresence mode="wait">
                {isMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ 
                      duration: 0.4, 
                      ease: [0.4, 0, 0.2, 1],
                      opacity: { duration: 0.3 },
                      height: { duration: 0.4 }
                    }}
                    className="md:hidden overflow-hidden border-t border-white/20 dark:border-gray-700/20 mt-2"
                  >
                    <div className="py-4 space-y-3">
                      {/* Navigation Items */}
                      {navigation.map((item, index) => {
                        const Icon = item.icon
                        const isActive = location.pathname === item.href
                        return (
                          <motion.div
                            key={item.name}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ 
                              delay: index * 0.1, 
                              duration: 0.3, 
                              ease: [0.4, 0, 0.2, 1] 
                            }}
                          >
                            <Button 
                              variant={isActive ? "default" : "ghost"} 
                              asChild 
                              className={`w-full justify-start text-lg transition-all duration-300 ${
                                isActive 
                                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700' 
                                  : 'text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800/10'
                              }`}
                            >
                              <Link to={item.href} onClick={closeMenu} className="flex items-center space-x-3">
                                <Icon className="h-5 w-5" />
                                <span>{item.name}</span>
                              </Link>
                            </Button>
                          </motion.div>
                        )
                      })}

                      {/* Pro Upgrade Button */}
                      {!isProUser && (
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: -20, opacity: 0 }}
                          transition={{ 
                            delay: navigation.length * 0.1, 
                            duration: 0.3, 
                            ease: [0.4, 0, 0.2, 1] 
                          }}
                        >
                          <Button
                            variant="outline"
                            onClick={() => {
                              setShowProUpgrade(true)
                              closeMenu()
                            }}
                            className="w-full justify-start text-lg border-yellow-300 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-900/20 transition-all duration-300"
                          >
                            <Crown className="h-5 w-5 mr-3" />
                            Upgrade to Pro
                          </Button>
                        </motion.div>
                      )}

                      {/* User Section */}
                      {user && (
                        <>
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ 
                              delay: (navigation.length + (isProUser ? 0 : 1)) * 0.1, 
                              duration: 0.3, 
                              ease: [0.4, 0, 0.2, 1] 
                            }}
                            className="pt-2 border-t border-white/20 dark:border-gray-700/20"
                          >
                            <div className="flex items-center space-x-3 px-3 py-2 text-gray-800 dark:text-gray-300">
                              <User className="h-5 w-5" />
                              <span className="text-lg">{user.fullName}</span>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ 
                              delay: (navigation.length + (isProUser ? 1 : 2)) * 0.1, 
                              duration: 0.3, 
                              ease: [0.4, 0, 0.2, 1] 
                            }}
                          >
                            <Button 
                              variant="ghost" 
                              asChild 
                              className="w-full justify-start text-lg text-gray-800 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300"
                            >
                              <Link to="/settings" onClick={closeMenu} className="flex items-center space-x-3">
                                <Settings className="h-5 w-5" />
                                <span>Settings</span>
                              </Link>
                            </Button>
                          </motion.div>

                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ 
                              delay: (navigation.length + (isProUser ? 2 : 3)) * 0.1, 
                              duration: 0.3, 
                              ease: [0.4, 0, 0.2, 1] 
                            }}
                          >
                            <Button 
                              variant="ghost" 
                              onClick={handleLogout}
                              className="w-full justify-start text-lg text-gray-800 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                            >
                              <LogOut className="h-5 w-5 mr-3" />
                              <span>Logout</span>
                            </Button>
                          </motion.div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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