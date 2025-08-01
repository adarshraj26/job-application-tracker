import Layout from '@/components/common/Layout'
import { ApplicationProvider } from '@/context/ApplicationContext'
import { AuthProvider } from '@/context/AuthContext'
import { ThemeProvider } from '@/context/ThemeContext'
import ApplicationsPage from '@/pages/ApplicationsPage'
import DashboardPage from '@/pages/DashboardPage'
import HomePage from '@/pages/HomePage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import SettingsPage from '@/pages/SettingsPage'
import ProtectedRoute from '@/components/common/ProtectedRoute'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Job Application Tracker</h1>
        <p className="text-gray-600">Loading...</p>
        <p className="text-sm text-gray-500 mt-2">If you see this, React is working!</p>
      </div>
    </div>
  )
}

export default App
