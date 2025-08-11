import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  FileText, 
  Shield, 
  Users, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Mail,
  Phone
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/common'
import ThemeToggle from '@/components/common/ThemeToggle'

const termsSections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing and using JobTracker ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    icon: <CheckCircle className="h-5 w-5" />
  },
  {
    title: "Description of Service",
    content: `JobTracker provides a platform for job seekers to track their job applications, manage their career goals, and analyze their job search progress. The Service includes features such as application tracking, analytics, goal setting, and performance metrics.`,
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "User Accounts",
    content: `You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account or password. You must be at least 18 years old to use this Service.`,
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Privacy Policy",
    content: `Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices regarding the collection and use of your personal information.`,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Data Protection & Security",
    content: `We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. We comply with applicable data protection laws and regulations.`,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Subscription & Payment Terms",
    content: `Pro features require a paid subscription. Subscriptions are billed on a recurring basis. You may cancel your subscription at any time. Refunds are provided according to our refund policy. All payments are processed securely through our payment partners.`,
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "User Content & Responsibilities",
    content: `You retain ownership of content you submit to the Service. You grant us a license to use, store, and display your content. You are responsible for ensuring your content does not violate any laws or third-party rights.`,
    icon: <Users className="h-5 w-5" />
  },
  {
    title: "Prohibited Uses",
    content: `You may not use the Service for any unlawful purpose or to solicit others to perform unlawful acts. You may not violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances.`,
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    title: "Intellectual Property",
    content: `The Service and its original content, features, and functionality are and will remain the exclusive property of JobTracker and its licensors. The Service is protected by copyright, trademark, and other laws.`,
    icon: <FileText className="h-5 w-5" />
  },
  {
    title: "Service Availability",
    content: `We strive to maintain high service availability but do not guarantee uninterrupted access. We may perform maintenance, updates, or modifications that temporarily affect service availability.`,
    icon: <Clock className="h-5 w-5" />
  },
  {
    title: "Dispute Resolution",
    content: `Any disputes arising from these terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. You agree to resolve disputes individually and waive any right to class action.`,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Termination",
    content: `We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.`,
    icon: <Clock className="h-5 w-5" />
  },
  {
    title: "Limitation of Liability",
    content: `In no event shall JobTracker, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.`,
    icon: <AlertTriangle className="h-5 w-5" />
  },
  {
    title: "Indemnification",
    content: `You agree to defend, indemnify, and hold harmless JobTracker and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of the Service or violation of these Terms.`,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Governing Law",
    content: `These Terms shall be interpreted and governed by the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.`,
    icon: <Shield className="h-5 w-5" />
  },
  {
    title: "Changes to Terms",
    content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.`,
    icon: <Clock className="h-5 w-5" />
  }
]

const importantNotes = [
  "These terms constitute a legally binding agreement between you and JobTracker.",
  "By using our Service, you acknowledge that you have read, understood, and agree to be bound by these terms.",
  "We reserve the right to modify these terms at any time, with changes becoming effective immediately upon posting.",
  "Your continued use of the Service after any changes constitutes acceptance of the new terms.",
  "If you disagree with any part of these terms, you may not access the Service.",
  "For Pro subscriptions, you have a 30-day money-back guarantee from the date of purchase.",
  "All disputes will be resolved through binding arbitration as outlined in our Dispute Resolution section."
]

export default function TermsPage() {
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
                Terms of Service
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Please read these terms carefully before using JobTracker. These terms govern your use of our service.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <Calendar className="h-4 w-4 mr-1" />
                  Last Updated: January 15, 2024
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <Shield className="h-4 w-4 mr-1" />
                  Legally Binding
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  <FileText className="h-4 w-4 mr-1" />
                  Version 1.0
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Important Notice
                  </h3>
                  <ul className="space-y-2">
                    {importantNotes.map((note, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300 flex items-start">
                        <span className="text-orange-500 mr-2 mt-1">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsSections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white">
                      {section.icon}
                    </div>
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Refund Policy Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16"
        >
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-gray-900 dark:text-white">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white">
                  <CheckCircle className="h-5 w-5" />
                </div>
                Refund Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">30-Day Money-Back Guarantee</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    We offer a 30-day money-back guarantee for all Pro subscriptions. If you're not satisfied with our service, contact us within 30 days of your purchase for a full refund.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Cancellation Policy</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    You may cancel your subscription at any time. Cancellations take effect at the end of your current billing period. No refunds are provided for partial months.
                  </p>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">How to Request a Refund</h4>
                <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>1. Contact our support team at support@jobtracker.com</li>
                  <li>2. Include your account email and reason for refund</li>
                  <li>3. We'll process your request within 3-5 business days</li>
                  <li>4. Refunds are issued to your original payment method</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Questions About These Terms?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h4 className="font-semibold mb-2">Legal Inquiries</h4>
                  <p className="text-blue-100 text-sm">
                    legal@jobtracker.com
                  </p>
                </div>
                <div className="text-center">
                  <Mail className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h4 className="font-semibold mb-2">Support & Refunds</h4>
                  <p className="text-blue-100 text-sm">
                    support@jobtracker.com
                  </p>
                </div>
                <div className="text-center">
                  <Phone className="h-8 w-8 mx-auto mb-3 text-blue-200" />
                  <h4 className="font-semibold mb-2">Phone Support</h4>
                  <p className="text-blue-100 text-sm">
                    +1 (555) 123-4567
                  </p>
                </div>
              </div>
              <div className="text-center mt-6">
                <p className="text-blue-100 text-sm">
                  We're here to help clarify any questions you may have about our terms of service, refunds, or legal matters.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Related Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                Related Legal Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link 
                  to="/privacy" 
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <Shield className="h-5 w-5 text-blue-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Privacy Policy</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">How we handle your data</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
                <Link 
                  to="/help" 
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Help Center</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Get support and answers</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400 ml-auto" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By using JobTracker, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
