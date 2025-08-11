import { Link } from 'react-router-dom'
import { Briefcase, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ThemeToggle from './ThemeToggle'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-white/20 dark:border-gray-700/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
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
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
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
              className="md:hidden overflow-hidden border-t border-white/20 dark:border-gray-700/20"
            >
              <div className="py-4 space-y-3">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ 
                    delay: 0.1, 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                >
                  <Button variant="ghost" asChild className="w-full justify-start text-lg transition-all duration-300 hover:bg-white/10 dark:hover:bg-gray-800/10">
                    <Link to="/login" onClick={closeMenu}>Login</Link>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ 
                    delay: 0.2, 
                    duration: 0.3, 
                    ease: [0.4, 0, 0.2, 1] 
                  }}
                >
                  <Button asChild className="w-full justify-start text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transition-all duration-300">
                    <Link to="/signup" onClick={closeMenu}>Get Started</Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
} 