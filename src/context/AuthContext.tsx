import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import apiService from '@/services/api'

interface User {
  id: string
  email: string
  fullName: string
  isProUser: boolean
  isPro: boolean
  preferences?: {
    theme: 'light' | 'dark' | 'auto'
    notifications: {
      email: boolean
      browser: boolean
    }
  }
  lastLogin?: Date
  createdAt?: Date
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (fullName: string, email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await apiService.getCurrentUser()
          if (response.status === 'success' && response.data) {
            setUser(response.data as User)
          } else {
            localStorage.removeItem('token')
          }
        } catch (error) {
          console.error('Failed to get current user:', error)
          localStorage.removeItem('token')
        }
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.login({ email, password })
      if (response.status === 'success' && response.data) {
        const data = response.data as any
        localStorage.setItem('token', data.token)
        setUser(data.user)
      } else {
        throw new Error(response.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (fullName: string, email: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await apiService.register({ fullName, email, password })
      if (response.status === 'success' && response.data) {
        const data = response.data as any
        localStorage.setItem('token', data.token)
        setUser(data.user)
      } else {
        throw new Error(response.message || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    isLoading,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 