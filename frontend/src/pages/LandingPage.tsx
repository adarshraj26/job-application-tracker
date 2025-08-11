import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

import LandingHeader from '@/components/common/LandingHeader'
import ThemeToggle from '@/components/common/ThemeToggle'
import { 
  FileText, 
  TrendingUp, 
  Target, 
  BarChart3, 
  Users, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Play,
  Star,
  Calendar,
  MessageSquare,
  Upload,
  Eye,
  Brain,
  Shield,
  Globe,
  Smartphone,
  X,
  Search,
  Bell,
  Settings,
  Download,
  Share2,
  Lock,
  Clock,
  Award,
  Heart,
  BarChart,
  PieChart,
  LineChart,
  Activity
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const features = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Smart Application Tracking",
    description: "Track your job applications with detailed insights and progress monitoring"
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Analytics & Insights",
    description: "Get powerful statistics and insights to optimize your job hunt strategy"
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Goal Setting",
    description: "Set targets and track your progress towards landing your dream job"
  },
  {
    icon: <BarChart3 className="h-8 w-8" />,
    title: "Performance Metrics",
    description: "Monitor your application success rates and interview performance"
  }
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "TechCorp",
    content: "This job tracker has completely transformed my job search. I can now focus on preparing for interviews instead of managing spreadsheets.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Product Manager",
    company: "InnovateLab",
    content: "The analytics helped me understand which applications were most successful. Landed my dream job within 2 months!",
    rating: 5
  },
  {
    name: "Emily Watson",
    role: "UX Designer",
    company: "DesignStudio",
    content: "Clean interface, powerful features. This is exactly what I needed to stay organized during my job hunt.",
    rating: 5
  }
]

const stats = [
  { number: "10,000+", label: "Applications Tracked" },
  { number: "95%", label: "Success Rate" },
  { number: "50+", label: "Companies Using" },
  { number: "24/7", label: "Support Available" }
]

export default function LandingPage() {
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false)

  const allFeatures = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Smart Application Tracking",
      description: "Track your job applications with detailed insights and progress monitoring",
      category: "Core"
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Get powerful statistics and insights to optimize your job hunt strategy",
      category: "Analytics"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal Setting",
      description: "Set targets and track your progress towards landing your dream job",
      category: "Core"
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Performance Metrics",
      description: "Monitor your application success rates and interview performance",
      category: "Analytics"
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "Advanced Search",
      description: "Find applications quickly with powerful search and filtering options",
      category: "Productivity"
    },
    {
      icon: <Bell className="h-8 w-8" />,
      title: "Smart Notifications",
      description: "Never miss important deadlines with intelligent reminder system",
      category: "Productivity"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Interview Scheduling",
      description: "Manage interview schedules and preparation with integrated calendar",
      category: "Core"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Follow-up Tracking",
      description: "Track follow-up emails and communication with potential employers",
      category: "Communication"
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Resume Management",
      description: "Store and organize multiple resume versions for different applications",
      category: "Core"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Success Analytics",
      description: "Analyze which strategies work best for your job search",
      category: "Analytics"
    },
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Customizable Workflow",
      description: "Adapt the application process to match your personal workflow",
      category: "Productivity"
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Data Export",
      description: "Export your application data for backup or analysis",
      category: "Productivity"
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Collaboration Tools",
      description: "Share your progress with mentors or career coaches",
      category: "Communication"
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Secure Data",
      description: "Your sensitive job search data is encrypted and secure",
      category: "Security"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Time Tracking",
      description: "Track time spent on applications and interviews",
      category: "Productivity"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Achievement System",
      description: "Earn badges and track milestones in your job search journey",
      category: "Motivation"
    }
  ]

  const categories = ["Core", "Analytics", "Productivity", "Communication", "Security", "Motivation"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <LandingHeader />
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 italic leading-tight px-2">
                Master Your Career Journey
                <br />
                <span className="text-gray-900 dark:text-white">
                  One <span className="relative inline-block">
                    Application
                    <svg 
                      className="absolute -bottom-1 sm:-bottom-2 md:-bottom-3 left-0 w-full h-2 sm:h-3 md:h-4 text-purple-400 dark:text-purple-300 overflow-visible" 
                      viewBox="0 0 300 25" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ maxWidth: '100%' }}
                    >
                      {/* Main scribbled line */}
                      <path 
                        d="M10 18 Q30 8 50 18 Q70 8 90 18 Q110 8 130 18 Q150 8 170 18 Q190 8 210 18 Q230 8 250 18 Q270 8 290 18" 
                        stroke="currentColor" 
                        strokeWidth="6" 
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.8"
                      />
                      {/* Overlapping scribble for more organic look */}
                      <path 
                        d="M15 20 Q35 10 55 20 Q75 10 95 20 Q115 10 135 20 Q155 10 175 20 Q195 10 215 20 Q235 10 255 20 Q275 10 285 20" 
                        stroke="currentColor" 
                        strokeWidth="5" 
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.6"
                      />
                      {/* Additional scribble strokes for texture */}
                      <path 
                        d="M20 16 Q40 6 60 16 Q80 6 100 16 Q120 6 140 16 Q160 6 180 16 Q200 6 220 16 Q240 6 260 16 Q280 6 280 16" 
                        stroke="currentColor" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.4"
                      />
                      <path 
                        d="M25 22 Q45 12 65 22 Q85 12 105 22 Q125 12 145 22 Q165 12 185 22 Q205 12 225 22 Q245 12 265 22 Q285 12 285 22" 
                        stroke="currentColor" 
                        strokeWidth="3.5" 
                        strokeLinecap="round"
                        fill="none"
                        opacity="0.3"
                      />
                    </svg>
                  </span> at a Time
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
                Transform your job search with intelligent tracking, powerful analytics, and strategic insights. 
                Land your dream role with confidence and precision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Link to="/signup" className="block w-full sm:w-auto">
                    <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold shadow-lg">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto"
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl font-semibold border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-lg"
                    onClick={() => setIsFeaturesModalOpen(true)}
                  >
                    <Eye className="mr-2 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    View Features
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Modal */}
      {isFeaturesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="max-w-6xl max-h-[95vh] sm:max-h-[90vh] w-full overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-start mb-4 sm:mb-6">
                <div className="text-center flex-1">
                  <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    All Features
                  </h2>
                  <p className="text-center text-gray-600 dark:text-gray-300 mt-2 text-sm sm:text-base">
                    Discover everything JobTracker has to offer
                  </p>
                </div>
                <button
                  onClick={() => setIsFeaturesModalOpen(false)}
                  className="ml-2 sm:ml-4 p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              <div className="mt-4 sm:mt-6">
                {categories.map((category) => (
                  <div key={category} className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {category} Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                      {allFeatures
                        .filter(feature => feature.category === category)
                        .map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ y: -2 }}
                            className="group"
                          >
                            <Card className={`h-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 ${
                               feature.category === "Core" 
                                 ? "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-800/30 dark:hover:to-indigo-800/30" 
                                 : feature.category === "Analytics" 
                                 ? "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-800/30 dark:hover:to-pink-800/30"
                                 : feature.category === "Productivity" 
                                 ? "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/30 dark:hover:to-emerald-800/30"
                                 : feature.category === "Communication" 
                                 ? "bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-800/30 dark:hover:to-amber-800/30"
                                 : feature.category === "Security" 
                                 ? "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 hover:from-red-100 hover:to-rose-100 dark:hover:from-red-800/30 dark:hover:to-rose-800/30"
                                 : "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-800/30 dark:hover:to-orange-800/30"
                             }`}>
                              <CardContent className="p-3 sm:p-4">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md ${
                                  feature.category === "Core" 
                                    ? "bg-gradient-to-r from-blue-500 to-indigo-600" 
                                    : feature.category === "Analytics" 
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600"
                                    : feature.category === "Productivity" 
                                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                                    : feature.category === "Communication" 
                                    ? "bg-gradient-to-r from-orange-500 to-amber-600"
                                    : feature.category === "Security" 
                                    ? "bg-gradient-to-r from-red-500 to-rose-600"
                                    : "bg-gradient-to-r from-yellow-500 to-orange-600"
                                }`}>
                                  <div className="text-white">
                                    {feature.icon}
                                  </div>
                                </div>
                                <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                                  {feature.title}
                                </h4>
                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                                  {feature.description}
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 text-center">
                <Button 
                  onClick={() => setIsFeaturesModalOpen(false)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2 sm:mb-3">
                  {stat.number}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 leading-tight"
            >
              Elevate Your Job Search Strategy,
              <br />
              <span className="text-blue-600 dark:text-blue-400">Not Just Track Applications</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4"
            >
              Advanced features designed to give you the competitive edge in today's job market. 
              Make every application count with data-driven insights.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardContent className="p-6 sm:p-8 md:p-10 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-5">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
                Streamline Your Application Process
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 md:mb-10">
                Capture opportunities from any job board instantly. Our intelligent system helps you organize, 
                prioritize, and optimize your application strategy for maximum success.
              </p>
              <div className="space-y-4 sm:space-y-5 md:space-y-6">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">One-click save job details</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">Visual progress tracking</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300">Real-time analytics</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-md mx-auto lg:mx-0"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">Application Dashboard</h3>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Applied - 12 jobs</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Interviewing - 3 jobs</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Offers - 1 job</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
              Loved by Job Seekers Worldwide
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300">
              See what our users have to say about their experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="flex items-center mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 italic">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold mr-3 sm:mr-4">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                          {testimonial.name}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                          {testimonial.role} at {testimonial.company}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 md:mb-8">
              Ready to Accelerate Your Career Growth?
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 mb-8 sm:mb-10">
              Join ambitious professionals who have already transformed their job search and landed 
              their ideal positions with our comprehensive platform.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link to="/signup" className="block w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white font-bold px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-base sm:text-lg md:text-xl lg:text-2xl shadow-xl hover:shadow-2xl border border-gray-800 rounded-sm transform hover:scale-105 transition-all duration-300 ease-in-out">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
            </motion.div>
            <p className="text-blue-200 mt-4 sm:mt-6 text-sm sm:text-base md:text-lg">
              No credit card required • 14-day free trial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">JobTracker</h3>
              <p className="text-gray-400">
                The ultimate platform for job seekers to track applications and land their dream jobs.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Application Tracking</li>
                <li>Analytics & Insights</li>
                <li>Goal Setting</li>
                <li>Performance Metrics</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/api-docs" className="hover:text-white transition-colors">API Documentation</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JobTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
} 