import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Search, 
  MessageCircle, 
  Mail, 
  Phone, 
  BookOpen, 
  Video, 
  FileText,
  ArrowRight,
  HelpCircle,
  Settings,
  Users,
  Shield,
  Zap,
  Target,
  BarChart3
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Footer } from '@/components/common'
import ThemeToggle from '@/components/common/ThemeToggle'
import { useState } from 'react'

const faqData = [
  {
    category: "Getting Started",
    icon: <Zap className="h-5 w-5" />,
    items: [
      {
        question: "How do I create my first job application?",
        answer: "Click the 'Add Application' button on your dashboard, fill in the company details, position, and application date. You can also add notes and set reminders for follow-ups."
      },
      {
        question: "Can I import my existing applications?",
        answer: "Yes! You can import applications from CSV files or manually add them one by one. We also support importing from popular job boards."
      },
      {
        question: "How do I set up my profile?",
        answer: "Go to Settings > Profile to add your personal information, upload your resume, and customize your preferences."
      }
    ]
  },
  {
    category: "Features & Usage",
    icon: <Target className="h-5 w-5" />,
    items: [
      {
        question: "How do I track interview rounds?",
        answer: "When you receive an interview invitation, click on the application and add a new interview round. You can track dates, types, and outcomes."
      },
      {
        question: "Can I set goals for my job search?",
        answer: "Absolutely! Go to the Goals section to set targets for applications per week, interviews per month, or your target salary range."
      },
      {
        question: "How do I use the analytics dashboard?",
        answer: "The analytics dashboard shows your application success rates, interview performance, and trends. Use filters to analyze specific time periods or companies."
      }
    ]
  },
  {
    category: "Account & Settings",
    icon: <Settings className="h-5 w-5" />,
    items: [
      {
        question: "How do I change my password?",
        answer: "Go to Settings > Security to update your password. Make sure to use a strong password with at least 8 characters."
      },
      {
        question: "Can I export my data?",
        answer: "Yes, you can export your applications as CSV or PDF. Go to Settings > Data Export to download your information."
      },
      {
        question: "How do I delete my account?",
        answer: "Go to Settings > Account to delete your account. Please note this action is irreversible and will permanently delete all your data."
      }
    ]
  },
  {
    category: "Privacy & Security",
    icon: <Shield className="h-5 w-5" />,
    items: [
      {
        question: "Is my data secure?",
        answer: "Yes, we use industry-standard encryption to protect your data. Your information is never shared with third parties without your consent."
      },
      {
        question: "Can I control my privacy settings?",
        answer: "Yes, go to Settings > Privacy to control what data we collect and how it's used. You can also request data deletion at any time."
      },
      {
        question: "Do you sell my personal information?",
        answer: "No, we never sell your personal information. Your data is used only to provide you with our services and improve your experience."
      }
    ]
  }
]

const helpCategories = [
  {
    title: "Quick Start Guide",
    description: "Get up and running in minutes with our step-by-step guide",
    icon: <BookOpen className="h-8 w-8" />,
    link: "#quick-start"
  },
  {
    title: "Video Tutorials",
    description: "Watch helpful videos to master all features",
    icon: <Video className="h-8 w-8" />,
    link: "#tutorials"
  },
  {
    title: "API Documentation",
    description: "Integrate JobTracker with your own applications",
    icon: <FileText className="h-8 w-8" />,
    link: "/api-docs"
  },
  {
    title: "Community Forum",
    description: "Connect with other job seekers and share tips",
    icon: <Users className="h-8 w-8" />,
    link: "#community"
  }
]

export default function HelpCenterPage() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId)
    } else {
      newOpenItems.add(itemId)
    }
    setOpenItems(newOpenItems)
  }

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
                Help Center
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Find answers to your questions, learn how to use JobTracker effectively, and get the support you need to succeed in your job search.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for help articles, tutorials, or FAQs..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {category.description}
                  </p>
                  <Link to={category.link} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find quick answers to the most common questions about JobTracker
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="space-y-4">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-8">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                      <div className="text-white">
                        {category.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.category}
                    </h3>
                  </div>
                  
                  {category.items.map((item, itemIndex) => {
                    const itemId = `item-${categoryIndex}-${itemIndex}`
                    const isOpen = openItems.has(itemId)
                    return (
                      <div key={itemIndex} className="border border-gray-200 dark:border-gray-700 rounded-lg mb-2">
                        <button
                          className="w-full px-4 py-3 text-left bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg flex items-center justify-between border border-gray-200 dark:border-gray-700"
                          onClick={() => toggleItem(itemId)}
                        >
                          <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                          <svg
                            className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-12 sm:py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Still Need Help?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Our support team is here to help you succeed. Get in touch with us through any of these channels.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Live Chat</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Chat with our support team in real-time
                  </p>
                  <Button className="w-full">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Mail className="h-8 w-8 text-purple-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Email Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Send us an email and we'll respond within 24 hours
                  </p>
                  <Button variant="outline" className="w-full">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Phone className="h-8 w-8 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Phone Support</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    Call us during business hours
                  </p>
                  <Button variant="outline" className="w-full">Call Now</Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
