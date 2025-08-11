import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Users, 
  Heart, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter,
  Star,
  Award,
  Lightbulb,
  Target
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/common'
import ThemeToggle from '@/components/common/ThemeToggle'

const jobOpenings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    experience: "3-5 years",
    description: "Join our team to build amazing user experiences with React, TypeScript, and modern web technologies.",
    requirements: [
      "Strong experience with React, TypeScript, and modern JavaScript",
      "Experience with state management (Redux, Zustand)",
      "Knowledge of CSS frameworks (Tailwind CSS)",
      "Experience with testing frameworks (Jest, React Testing Library)",
      "Strong problem-solving and communication skills"
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible remote work",
      "Health, dental, and vision insurance",
      "Professional development budget",
      "Unlimited PTO"
    ]
  },
  {
    id: 2,
    title: "Product Manager",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "2-4 years",
    description: "Drive product strategy and execution for our job tracking platform, working closely with engineering and design teams.",
    requirements: [
      "Experience in product management for SaaS products",
      "Strong analytical and data-driven decision making",
      "Excellent communication and stakeholder management",
      "Experience with agile development methodologies",
      "Background in HR tech or job search platforms preferred"
    ],
    benefits: [
      "Competitive salary and equity",
      "Hybrid work model",
      "Health, dental, and vision insurance",
      "Professional development budget",
      "Unlimited PTO"
    ]
  },
  {
    id: 3,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    experience: "2-4 years",
    description: "Create beautiful and intuitive user experiences that help job seekers achieve their career goals.",
    requirements: [
      "Strong portfolio showcasing web and mobile design work",
      "Experience with design tools (Figma, Sketch)",
      "Understanding of user-centered design principles",
      "Experience with design systems and component libraries",
      "Knowledge of accessibility best practices"
    ],
    benefits: [
      "Competitive salary and equity",
      "Flexible remote work",
      "Health, dental, and vision insurance",
      "Professional development budget",
      "Unlimited PTO"
    ]
  }
]

const companyValues = [
  {
    icon: <Heart className="h-8 w-8" />,
    title: "User-First",
    description: "Everything we do is centered around helping job seekers succeed in their career journey."
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Innovation",
    description: "We constantly push boundaries to create the best possible tools for career growth."
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: "Trust & Security",
    description: "We prioritize the privacy and security of our users' data above everything else."
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Collaboration",
    description: "We believe great products are built by diverse teams working together."
  }
]

const perks = [
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Remote First",
    description: "Work from anywhere in the world"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Flexible Hours",
    description: "Work when you're most productive"
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Learning Budget",
    description: "$2,000 annually for courses and conferences"
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Health Benefits",
    description: "Comprehensive health, dental, and vision"
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Equity",
    description: "Own a piece of the company"
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Impact",
    description: "Help millions of people find their dream jobs"
  }
]

export default function CareersPage() {
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
                Join Our Team
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Help us build the future of job searching. We're looking for passionate individuals 
                who want to make a difference in people's careers.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <Users className="h-4 w-4 mr-1" />
                  Remote First
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <Heart className="h-4 w-4 mr-1" />
                  Great Benefits
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  <Star className="h-4 w-4 mr-1" />
                  Equity
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Culture */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Culture
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're building a company where innovation meets purpose, and every team member 
              has the opportunity to make a real impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 text-white">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Perks & Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Perks & Benefits
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We take care of our team so you can focus on doing your best work.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                        {perk.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {perk.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">
                      {perk.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Job Openings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Open Positions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Ready to join our mission? Check out our current openings.
            </p>
          </div>
          
          <div className="space-y-6">
            {jobOpenings.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl text-gray-900 dark:text-white mb-2">
                          {job.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                            <Briefcase className="h-3 w-3 mr-1" />
                            {job.department}
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                            <MapPin className="h-3 w-3 mr-1" />
                            {job.location}
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.type}
                          </Badge>
                          <Badge variant="outline">
                            {job.experience}
                          </Badge>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                        Apply Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {job.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements</h4>
                        <ul className="space-y-1">
                          {job.requirements.map((req, reqIndex) => (
                            <li key={reqIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-blue-500 mr-2 mt-1">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Benefits</h4>
                        <ul className="space-y-1">
                          {job.benefits.map((benefit, benefitIndex) => (
                            <li key={benefitIndex} className="text-sm text-gray-600 dark:text-gray-300 flex items-start">
                              <span className="text-green-500 mr-2 mt-1">•</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Don't See the Right Role?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals to join our team. 
                Send us your resume and let's start a conversation about how you can contribute to our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-blue-600 hover:bg-gray-100">
                  <Mail className="mr-2 h-4 w-4" />
                  Send Resume
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </Button>
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
