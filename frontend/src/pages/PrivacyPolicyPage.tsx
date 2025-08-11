import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Eye, 
  Lock, 
  Users, 
  Database, 
  Globe,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/common'
import ThemeToggle from '@/components/common/ThemeToggle'

const privacySections = [
  {
    title: "Information We Collect",
    icon: <Database className="h-5 w-5" />,
    content: [
      {
        subtitle: "Personal Information",
        description: "We collect information you provide directly to us, such as when you create an account, update your profile, or contact us for support.",
        items: [
          "Name and contact information (email address, phone number)",
          "Professional information (resume, work history, skills)",
          "Job application data (company names, positions, dates, notes)",
          "Account credentials and preferences"
        ]
      },
      {
        subtitle: "Usage Information",
        description: "We automatically collect certain information about your use of our services.",
        items: [
          "Log data (IP address, browser type, pages visited)",
          "Device information (device type, operating system)",
          "Usage patterns and feature interactions",
          "Performance data and error reports"
        ]
      }
    ]
  },
  {
    title: "How We Use Your Information",
    icon: <Eye className="h-5 w-5" />,
    content: [
      {
        subtitle: "Service Provision",
        description: "We use your information to provide, maintain, and improve our services.",
        items: [
          "Process and store your job applications",
          "Generate analytics and insights about your job search",
          "Send notifications and reminders",
          "Provide customer support"
        ]
      },
      {
        subtitle: "Communication",
        description: "We may use your contact information to communicate with you about our services.",
        items: [
          "Send important service updates",
          "Respond to your inquiries and support requests",
          "Send marketing communications (with your consent)",
          "Notify you about new features and improvements"
        ]
      }
    ]
  },
  {
    title: "Information Sharing",
    icon: <Users className="h-5 w-5" />,
    content: [
      {
        subtitle: "We Do Not Sell Your Data",
        description: "We never sell, rent, or trade your personal information to third parties for marketing purposes.",
        items: []
      },
      {
        subtitle: "Limited Sharing",
        description: "We may share your information in the following limited circumstances:",
        items: [
          "With your explicit consent",
          "To comply with legal obligations",
          "To protect our rights and safety",
          "With service providers who assist in our operations (under strict confidentiality agreements)"
        ]
      }
    ]
  },
  {
    title: "Data Security",
    icon: <Lock className="h-5 w-5" />,
    content: [
      {
        subtitle: "Security Measures",
        description: "We implement industry-standard security measures to protect your personal information.",
        items: [
          "Encryption of data in transit and at rest",
          "Regular security audits and assessments",
          "Access controls and authentication",
          "Secure data centers and infrastructure"
        ]
      },
      {
        subtitle: "Data Retention",
        description: "We retain your information only as long as necessary to provide our services.",
        items: [
          "Active accounts: Until account deletion",
          "Inactive accounts: 2 years after last activity",
          "Legal requirements: As required by applicable law",
          "You can request data deletion at any time"
        ]
      }
    ]
  },
  {
    title: "Your Rights",
    icon: <CheckCircle className="h-5 w-5" />,
    content: [
      {
        subtitle: "Access and Control",
        description: "You have the right to access, update, and control your personal information.",
        items: [
          "Access your personal data",
          "Update or correct inaccurate information",
          "Delete your account and data",
          "Export your data in a portable format",
          "Opt-out of marketing communications"
        ]
      },
      {
        subtitle: "Data Portability",
        description: "You can request a copy of your data in a machine-readable format.",
        items: [
          "Export all your job applications",
          "Download your profile information",
          "Transfer data to other services",
          "Request data in common formats (JSON, CSV)"
        ]
      }
    ]
  },
  {
    title: "Cookies and Tracking",
    icon: <Globe className="h-5 w-5" />,
    content: [
      {
        subtitle: "Cookie Usage",
        description: "We use cookies and similar technologies to enhance your experience.",
        items: [
          "Essential cookies for service functionality",
          "Analytics cookies to improve our services",
          "Preference cookies to remember your settings",
          "You can control cookie settings in your browser"
        ]
      },
      {
        subtitle: "Third-Party Services",
        description: "We may use third-party services that collect information.",
        items: [
          "Analytics services (Google Analytics)",
          "Payment processors (Stripe)",
          "Email services (SendGrid)",
          "All third-party services are bound by our privacy standards"
        ]
      }
    ]
  }
]

const contactInfo = [
  {
    title: "Email",
    value: "privacy@jobtracker.com",
    icon: <Mail className="h-4 w-4" />
  },
  {
    title: "Phone",
    value: "+1 (555) 123-4567",
    icon: <Phone className="h-4 w-4" />
  },
  {
    title: "Address",
    value: "123 Privacy Street, Security City, SC 12345",
    icon: <Shield className="h-4 w-4" />
  }
]

export default function PrivacyPolicyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  GDPR Compliant
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <Shield className="h-4 w-4 mr-1" />
                  Data Protected
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  <Lock className="h-4 w-4 mr-1" />
                  Secure
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Last Updated:</strong> January 15, 2024
                  </p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    This policy is effective as of the date listed above.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="text-blue-500">{section.icon}</div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {section.content.map((content, contentIndex) => (
                    <div key={contentIndex} className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {content.subtitle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {content.description}
                      </p>
                      {content.items && content.items.length > 0 && (
                        <ul className="space-y-2">
                          {content.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-600 dark:text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12"
        >
          <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="text-blue-200">{contact.icon}</div>
                    <div>
                      <p className="text-sm text-blue-200">{contact.title}</p>
                      <p className="font-medium">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/terms"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Terms of Service</span>
                </Link>
                <Link 
                  to="/help"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Help Center</span>
                </Link>
                <Link 
                  to="/contact"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Contact Us</span>
                </Link>
                <a 
                  href="#data-request"
                  className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ArrowRight className="h-4 w-4 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Data Request Form</span>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8"
        >
          <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Important Notice
                  </h3>
                  <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                    By using our services, you agree to the collection and use of information in accordance with this policy. 
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new 
                    privacy policy on this page and updating the "Last Updated" date.
                  </p>
                </div>
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
