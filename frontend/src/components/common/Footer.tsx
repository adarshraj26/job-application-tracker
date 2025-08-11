import { Link } from 'react-router-dom'
import { 
  Briefcase, 
  HelpCircle, 
  FileText, 
  Users, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink,
  Github,
  Twitter,
  Linkedin
} from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center space-x-3 group mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-white">
                  JobTracker
                </span>
                <p className="text-xs text-gray-400 -mt-1">Career Management</p>
              </div>
            </Link>
            <p className="text-gray-400 mb-4">
              The ultimate platform for job seekers to track applications and land their dream jobs.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Features</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Application Tracking</li>
              <li>Analytics & Insights</li>
              <li>Goal Setting</li>
              <li>Performance Metrics</li>
              <li>Resume Management</li>
              <li>Interview Prep</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/help" className="hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/api-docs" className="hover:text-white transition-colors flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  API Documentation
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">support@jobtracker.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Phone</p>
                <p className="text-white">+1 (555) 123-4567</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-white">San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} JobTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
