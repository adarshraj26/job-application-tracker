import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full bg-white/20 dark:bg-gray-800/50 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-200 border border-white/20 dark:border-gray-600/50"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun className="h-4 w-4 text-yellow-600 dark:text-yellow-400 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-4 w-4 text-blue-600 dark:text-blue-400 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 