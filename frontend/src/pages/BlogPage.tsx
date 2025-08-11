import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Calendar, 
  User, 
  Clock, 
  ArrowRight,
  BookOpen,
  TrendingUp,
  Target,
  Users,
  Briefcase,
  Star,
  Share2,
  Bookmark,
  Eye
} from 'lucide-react'
import { Link } from 'react-router-dom'

const blogPosts = [
  {
    id: 1,
    title: "10 Essential Tips for Landing Your Dream Job in 2024",
    excerpt: "Discover the most effective strategies to stand out in today's competitive job market and secure the position you've always wanted.",
    content: "The job market in 2024 is more competitive than ever, with companies looking for candidates who can bring immediate value to their organizations. In this comprehensive guide, we'll explore the top 10 strategies that successful job seekers are using to land their dream positions...",
    author: "Sarah Johnson",
    authorAvatar: "SJ",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Career Tips",
    tags: ["Job Search", "Career Growth", "Interview Tips"],
    featured: true,
    image: "/api/placeholder/600/400",
    views: 1247,
    likes: 89
  },
  {
    id: 2,
    title: "How to Build a Standout Resume That Gets You Interviews",
    excerpt: "Learn the art of crafting a compelling resume that showcases your skills and experience in the most effective way possible.",
    content: "Your resume is often the first impression you make on potential employers. In today's digital age, where applicant tracking systems (ATS) scan resumes before human eyes, it's crucial to optimize your resume for both machines and people...",
    author: "Michael Chen",
    authorAvatar: "MC",
    publishDate: "2024-01-12",
    readTime: "6 min read",
    category: "Resume Writing",
    tags: ["Resume", "ATS", "Professional Development"],
    featured: false,
    image: "/api/placeholder/600/400",
    views: 892,
    likes: 67
  },
  {
    id: 3,
    title: "The Complete Guide to Remote Job Interviews",
    excerpt: "Master the art of virtual interviews with our comprehensive guide covering everything from technical setup to body language.",
    content: "Remote interviews have become the new normal in today's digital workplace. While they offer convenience, they also present unique challenges that traditional in-person interviews don't have...",
    author: "Emily Rodriguez",
    authorAvatar: "ER",
    publishDate: "2024-01-10",
    readTime: "10 min read",
    category: "Interview Prep",
    tags: ["Remote Work", "Virtual Interviews", "Technology"],
    featured: false,
    image: "/api/placeholder/600/400",
    views: 756,
    likes: 54
  },
  {
    id: 4,
    title: "Salary Negotiation Strategies That Actually Work",
    excerpt: "Don't leave money on the table. Learn proven negotiation techniques to maximize your compensation package.",
    content: "Salary negotiation is one of the most important skills you can develop in your career. Yet, many professionals feel uncomfortable discussing money or don't know how to approach these conversations effectively...",
    author: "David Kim",
    authorAvatar: "DK",
    publishDate: "2024-01-08",
    readTime: "7 min read",
    category: "Salary & Benefits",
    tags: ["Negotiation", "Compensation", "Career Growth"],
    featured: false,
    image: "/api/placeholder/600/400",
    views: 634,
    likes: 42
  },
  {
    id: 5,
    title: "Networking in the Digital Age: Building Professional Relationships Online",
    excerpt: "Discover how to build meaningful professional connections in today's digital-first world.",
    content: "Networking has always been crucial for career success, but the digital age has transformed how we connect with others professionally. Social media platforms, professional networks, and virtual events have opened new opportunities...",
    author: "Lisa Thompson",
    authorAvatar: "LT",
    publishDate: "2024-01-05",
    readTime: "9 min read",
    category: "Networking",
    tags: ["Networking", "Social Media", "Professional Development"],
    featured: false,
    image: "/api/placeholder/600/400",
    views: 521,
    likes: 38
  },
  {
    id: 6,
    title: "Career Pivot: How to Successfully Change Industries",
    excerpt: "Thinking about switching careers? Learn how to navigate a successful industry transition.",
    content: "Career pivots are becoming increasingly common as professionals seek new challenges, better work-life balance, or opportunities in emerging fields. While changing industries can be daunting, it's also an exciting opportunity for growth...",
    author: "Alex Morgan",
    authorAvatar: "AM",
    publishDate: "2024-01-03",
    readTime: "11 min read",
    category: "Career Change",
    tags: ["Career Pivot", "Industry Change", "Professional Growth"],
    featured: false,
    image: "/api/placeholder/600/400",
    views: 445,
    likes: 31
  }
]

const categories = [
  { name: "Career Tips", count: 15, icon: <Target className="h-4 w-4" /> },
  { name: "Interview Prep", count: 12, icon: <Users className="h-4 w-4" /> },
  { name: "Resume Writing", count: 8, icon: <BookOpen className="h-4 w-4" /> },
  { name: "Salary & Benefits", count: 6, icon: <TrendingUp className="h-4 w-4" /> },
  { name: "Networking", count: 9, icon: <Briefcase className="h-4 w-4" /> },
  { name: "Career Change", count: 7, icon: <ArrowRight className="h-4 w-4" /> }
]

const popularTags = [
  "Job Search", "Interview Tips", "Resume", "Networking", "Remote Work", 
  "Career Growth", "Salary Negotiation", "Professional Development", "ATS", "Virtual Interviews"
]

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured)
  const regularPosts = blogPosts.filter(post => !post.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
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
                JobTracker Blog
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Expert insights, career advice, and job search strategies to help you succeed in your professional journey.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles, tips, or topics..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Featured Post */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-64 bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/20 text-white border-0">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {featuredPost.authorAvatar}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{featuredPost.author}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{featuredPost.publishDate}</p>
                        </div>
                      </div>
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Regular Posts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {regularPosts.map((post, index) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600"></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                          {post.authorAvatar}
                        </div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{post.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          {post.likes}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-6"
            >
              {/* Categories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Categories</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/blog/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-blue-500">{category.icon}</div>
                          <span className="text-gray-700 dark:text-gray-300">{category.name}</span>
                        </div>
                        <Badge variant="secondary">{category.count}</Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Tags</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Signup */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                  <p className="text-blue-100 mb-4">
                    Get the latest career tips and job search strategies delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
