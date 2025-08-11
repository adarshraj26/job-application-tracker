import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ApplicationProvider } from './context/ApplicationContext';
import { TourProvider } from './context/TourContext';
import { Toaster } from './components/ui/toaster';

// Pages
import HomePage from './pages/HomePage';
import ApplicationsPage from './pages/ApplicationsPage';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import FeaturesPage from './pages/FeaturesPage';
import HelpCenterPage from './pages/HelpCenterPage';
import BlogPage from './pages/BlogPage';
import ApiDocsPage from './pages/ApiDocsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AboutUsPage from './pages/AboutUsPage';

// Components
import Layout from './components/common/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import ErrorBoundary from './components/common/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <ApplicationProvider>
            <TourProvider>
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/api-docs" element={<ApiDocsPage />} />
                  <Route path="/privacy" element={<PrivacyPolicyPage />} />
                  <Route path="/about" element={<AboutUsPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/home" element={
                    <ProtectedRoute>
                      <Layout>
                        <HomePage />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/applications" element={
                    <ProtectedRoute>
                      <Layout>
                        <ApplicationsPage />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Layout>
                        <DashboardPage />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Layout>
                        <SettingsPage />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/features" element={
                    <ProtectedRoute>
                      <Layout>
                        <FeaturesPage />
                      </Layout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </Router>
              <Toaster />
            </TourProvider>
          </ApplicationProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
