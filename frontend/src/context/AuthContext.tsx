import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiService } from '@/services/api'

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
  loginWithGoogle: () => Promise<void>
  loginWithGitHub: () => Promise<void>
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
      console.log('Auth initialization - Token exists:', !!token)
      
      if (token) {
        try {
          console.log('Attempting to get current user...')
          const response = await apiService.getCurrentUser()
          console.log('Get current user response:', response)
          
          if (response.status === 'success' && response.data && (response.data as any).user) {
            const userData = (response.data as any).user
            setUser({
              id: userData.id || userData._id || 'mock-user-id',
              email: userData.email || 'mock@example.com',
              fullName: userData.fullName || 'Mock User',
              isProUser: userData.isProUser || false,
              isPro: userData.isPro || false,
              preferences: userData.preferences || {
                theme: 'light',
                notifications: { email: true, browser: true }
              },
              lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : undefined,
              createdAt: userData.createdAt ? new Date(userData.createdAt) : undefined
            })
            console.log('User authenticated successfully')
          } else {
            console.log('Failed to authenticate user, removing token')
            localStorage.removeItem('token')
            setUser(null)
          }
        } catch (error) {
          console.error('Failed to get current user:', error)
          // Only remove token if it's a 401 (unauthorized) error
          if (error instanceof Error && error.message.includes('401')) {
            localStorage.removeItem('token')
          }
          setUser(null)
        }
      } else {
        console.log('No token found, user not authenticated')
        setUser(null)
      }
      setIsLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      console.log('Attempting login with:', email)
      const response = await apiService.login({ email, password })
      console.log('Login response:', response)
      
      if (response.status === 'success' && response.data) {
        const data = response.data as any
        localStorage.setItem('token', data.token)
        const userData = data.user || data
        setUser({
          id: userData.id || userData._id || 'mock-user-id',
          email: userData.email || 'mock@example.com',
          fullName: userData.fullName || 'Mock User',
          isProUser: userData.isProUser || false,
          isPro: userData.isPro || false,
          preferences: userData.preferences || {
            theme: 'light',
            notifications: { email: true, browser: true }
          },
          lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : undefined,
          createdAt: userData.createdAt ? new Date(userData.createdAt) : undefined
        })
        console.log('Login successful, user set:', userData)
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
        const userData = data.user || data
        setUser({
          id: userData.id || userData._id || 'mock-user-id',
          email: userData.email || 'mock@example.com',
          fullName: userData.fullName || 'Mock User',
          isProUser: userData.isProUser || false,
          isPro: userData.isPro || false,
          preferences: userData.preferences || {
            theme: 'light',
            notifications: { email: true, browser: true }
          },
          lastLogin: userData.lastLogin ? new Date(userData.lastLogin) : undefined,
          createdAt: userData.createdAt ? new Date(userData.createdAt) : undefined
        })
        
        // Reset tour for new users
        localStorage.removeItem('hasSeenWelcomeTour')
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
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would redirect to Google OAuth
      // For now, we'll simulate the OAuth flow
      console.log('Initiating Google OAuth...')
      
      // Simulate OAuth redirect
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${window.location.origin}/auth/google/callback&response_type=code&scope=email profile`
      
      // For demo purposes, we'll show a message instead of redirecting
      throw new Error('Google OAuth integration is coming soon! Please use email login for now.')
    } catch (error) {
      console.error('Google OAuth error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithGitHub = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, this would redirect to GitHub OAuth
      // For now, we'll simulate the OAuth flow
      console.log('Initiating GitHub OAuth...')
      
      // Simulate OAuth redirect
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}/auth/github/callback&scope=user:email`
      
      // For demo purposes, we'll show a message instead of redirecting
      throw new Error('GitHub OAuth integration is coming soon! Please use email login for now.')
    } catch (error) {
      console.error('GitHub OAuth error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    loginWithGoogle,
    loginWithGitHub,
    logout,
    isLoading,
    updateUser,
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