import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Target, 
  Heart, 
  Zap, 
  Shield, 
  Globe,
  Award,
  TrendingUp,
  Briefcase,
  Lightbulb,
  ArrowRight,
  Star,
  CheckCircle,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/common'
import ThemeToggle from '@/components/common/ThemeToggle'

const values = [
  {
    title: "User-Centric Design",
    description: "We put our users first, designing every feature with their needs and success in mind.",
    icon: <Heart className="h-8 w-8" />
  },
  {
    title: "Innovation",
    description: "We continuously innovate to provide cutting-edge solutions for modern job seekers.",
    icon: <Lightbulb className="h-8 w-8" />
  },
  {
    title: "Transparency",
    description: "We believe in open communication and transparent practices in everything we do.",
    icon: <Shield className="h-8 w-8" />
  },
  {
    title: "Excellence",
    description: "We strive for excellence in every aspect of our product and service delivery.",
    icon: <Award className="h-8 w-8" />
  }
]

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former HR executive with 15+ years of experience in talent acquisition and career development.",
    avatar: "SJ",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Tech leader with expertise in building scalable applications and AI-driven solutions.",
    avatar: "MC",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Product",
    bio: "Product strategist passionate about creating intuitive user experiences that drive results.",
    avatar: "ER",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "David Kim",
    role: "Head of Design",
    bio: "Design leader focused on creating beautiful, functional interfaces that users love.",
    avatar: "DK",
    linkedin: "#",
    twitter: "#"
  }
]

const milestones = [
  {
    year: "2024",
    title: "10,000+ Users",
    description: "Reached our first major milestone with over 10,000 active users tracking their job applications."
  },
  {
    year: "2023",
    title: "Product Launch",
    description: "Successfully launched JobTracker with core features and gained our first 1,000 users."
  },
  {
    year: "2022",
    title: "Company Founded",
    description: "Founded JobTracker with a mission to help job seekers succeed in their career journey."
  }
]

const stats = [
  { number: "10,000+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
  { number: "50+", label: "Companies Using", icon: <Briefcase className="h-6 w-6" /> },
  { number: "95%", label: "Success Rate", icon: <TrendingUp className="h-6 w-6" /> },
  { number: "24/7", label: "Support Available", icon: <Shield className="h-6 w-6" /> }
]

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                About JobTracker
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                We're on a mission to transform the job search experience, making it more organized, 
                efficient, and successful for millions of job seekers worldwide.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <Users className="h-4 w-4 mr-1" />
                  Founded 2022
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <Globe className="h-4 w-4 mr-1" />
                  Global Reach
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  <Star className="h-4 w-4 mr-1" />
                  User-Focused
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Mission & Vision */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  To empower job seekers with intelligent tools and insights that transform their 
                  job search from a stressful experience into a strategic, data-driven journey toward 
                  career success.
                </p>
                <p className="text-blue-100">
                  We believe everyone deserves to find meaningful work that aligns with their skills, 
                  passions, and career goals.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-6 w-6" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg mb-4">
                  To become the world's leading platform for job search management, helping millions 
                  of professionals land their dream jobs through intelligent tracking, analytics, and 
                  strategic insights.
                </p>
                <p className="text-purple-100">
                  We envision a future where job searching is efficient, transparent, and successful 
                  for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              These core values guide everything we do and shape the culture of our company.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind JobTracker who are dedicated to your career success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-xl font-bold">{member.avatar}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-2">
                    <a href={member.linkedin} className="text-gray-400 hover:text-blue-500 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a href={member.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Key milestones in our mission to revolutionize job search management.
            </p>
          </div>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Get in Touch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">hello@jobtracker.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-300">123 Innovation St, Tech City, TC 12345</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>Join Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                Ready to transform your job search? Join thousands of professionals who are already 
                using JobTracker to land their dream jobs.
              </p>
              <div className="space-y-3">
                <Link to="/signup">
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full border-white text-white hover:bg-white hover:text-blue-600">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
