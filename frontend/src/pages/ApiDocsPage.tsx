import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Code, 
  Copy, 
  Check, 
  BookOpen, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Terminal,
  Database,
  Key,
  Clock,
  AlertCircle,
  ExternalLink
} from 'lucide-react'
import { useState } from 'react'

const endpoints = [
  {
    method: "GET",
    path: "/api/applications",
    description: "Retrieve all job applications",
    auth: "Bearer Token",
    parameters: [
      { name: "page", type: "integer", required: false, description: "Page number (default: 1)" },
      { name: "limit", type: "integer", required: false, description: "Items per page (default: 10)" },
      { name: "status", type: "string", required: false, description: "Filter by application status" },
      { name: "search", type: "string", required: false, description: "Search in company name or position" }
    ],
    response: {
      success: {
        status: 200,
        data: {
          applications: [
            {
              id: "507f1f77bcf86cd799439011",
              companyName: "Tech Corp",
              position: "Software Engineer",
              status: "applied",
              appliedDate: "2024-01-15T00:00:00.000Z",
              createdAt: "2024-01-15T00:00:00.000Z"
            }
          ],
          pagination: {
            currentPage: 1,
            totalPages: 5,
            totalItems: 50,
            itemsPerPage: 10
          }
        }
      }
    }
  },
  {
    method: "POST",
    path: "/api/applications",
    description: "Create a new job application",
    auth: "Bearer Token",
    parameters: [],
    body: {
      companyName: "string (required)",
      position: "string (required)",
      status: "string (required) - applied, interviewing, offered, rejected",
      appliedDate: "date (required)",
      notes: "string (optional)",
      salary: "number (optional)",
      location: "string (optional)"
    },
    response: {
      success: {
        status: 201,
        data: {
          application: {
            id: "507f1f77bcf86cd799439011",
            companyName: "Tech Corp",
            position: "Software Engineer",
            status: "applied",
            appliedDate: "2024-01-15T00:00:00.000Z",
            createdAt: "2024-01-15T00:00:00.000Z"
          }
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/api/applications/:id",
    description: "Update an existing job application",
    auth: "Bearer Token",
    parameters: [
      { name: "id", type: "string", required: true, description: "Application ID" }
    ],
    body: {
      companyName: "string (optional)",
      position: "string (optional)",
      status: "string (optional)",
      appliedDate: "date (optional)",
      notes: "string (optional)",
      salary: "number (optional)",
      location: "string (optional)"
    },
    response: {
      success: {
        status: 200,
        data: {
          application: {
            id: "507f1f77bcf86cd799439011",
            companyName: "Updated Tech Corp",
            position: "Senior Software Engineer",
            status: "interviewing",
            appliedDate: "2024-01-15T00:00:00.000Z",
            updatedAt: "2024-01-16T00:00:00.000Z"
          }
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/api/applications/:id",
    description: "Delete a job application",
    auth: "Bearer Token",
    parameters: [
      { name: "id", type: "string", required: true, description: "Application ID" }
    ],
    response: {
      success: {
        status: 200,
        data: {
          message: "Application deleted successfully"
        }
      }
    }
  }
]

const codeExamples = {
  javascript: `// Get all applications
const response = await fetch('https://api.jobtracker.com/api/applications', {
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data.applications);

// Create new application
const newApp = await fetch('https://api.jobtracker.com/api/applications', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    companyName: 'Tech Corp',
    position: 'Software Engineer',
    status: 'applied',
    appliedDate: '2024-01-15'
  })
});`,

  python: `import requests

# Get all applications
response = requests.get(
    'https://api.jobtracker.com/api/applications',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

data = response.json()
print(data['applications'])

# Create new application
new_app = requests.post(
    'https://api.jobtracker.com/api/applications',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'companyName': 'Tech Corp',
        'position': 'Software Engineer',
        'status': 'applied',
        'appliedDate': '2024-01-15'
    }
)`,

  curl: `# Get all applications
curl -X GET "https://api.jobtracker.com/api/applications" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"

# Create new application
curl -X POST "https://api.jobtracker.com/api/applications" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "companyName": "Tech Corp",
    "position": "Software Engineer",
    "status": "applied",
    "appliedDate": "2024-01-15"
  }'`
}

export default function ApiDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string, language: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedCode(language)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

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
                API Documentation
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Integrate JobTracker into your applications with our comprehensive REST API. 
                Track applications, manage interviews, and analyze your job search progress programmatically.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  <Check className="h-4 w-4 mr-1" />
                  RESTful API
                </Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                  <Shield className="h-4 w-4 mr-1" />
                  JWT Authentication
                </Badge>
                <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400">
                  <Globe className="h-4 w-4 mr-1" />
                  JSON Responses
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Start */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-blue-500" />
                    Quick Start
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <Key className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">1. Get API Key</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Generate your API key from the dashboard</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <Code className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">2. Make Requests</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Use your preferred language to make API calls</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <Database className="h-8 w-8 text-green-500 mx-auto mb-2" />
                      <h3 className="font-semibold text-gray-900 dark:text-white">3. Get Data</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Receive JSON responses with your application data</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Authentication */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All API requests require authentication using a Bearer token. Include your API key in the Authorization header.
                  </p>
                  <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Code Examples */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-500" />
                    Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="javascript" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    {Object.entries(codeExamples).map(([language, code]) => (
                      <TabsContent key={language} value={language} className="mt-4">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => copyToClipboard(code, language)}
                          >
                            {copiedCode === language ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                          <pre className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* API Endpoints */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-orange-500" />
                    API Endpoints
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {endpoints.map((endpoint, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge 
                          className={
                            endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                            endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                            endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                            'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }
                        >
                          {endpoint.method}
                        </Badge>
                        <code className="text-sm font-mono text-gray-900 dark:text-white">
                          {endpoint.path}
                        </code>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {endpoint.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {endpoint.parameters && endpoint.parameters.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Parameters</h4>
                            <div className="space-y-1">
                              {endpoint.parameters.map((param, paramIndex) => (
                                <div key={paramIndex} className="text-sm">
                                  <code className="text-blue-600 dark:text-blue-400">{param.name}</code>
                                  <span className="text-gray-500"> ({param.type})</span>
                                  {param.required && <Badge variant="outline" className="ml-1 text-xs">Required</Badge>}
                                  <p className="text-gray-600 dark:text-gray-400 text-xs">{param.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {endpoint.body && (
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Request Body</h4>
                            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                              <code>{JSON.stringify(endpoint.body, null, 2)}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Response</h4>
                        <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                          <code>{JSON.stringify(endpoint.response, null, 2)}</code>
                        </pre>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="space-y-6"
            >
              {/* Rate Limits */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rate Limits</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">100 requests per minute</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">1,000 requests per hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* SDKs */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SDKs & Libraries</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Code className="h-4 w-4 text-blue-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">JavaScript SDK</span>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Code className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Python SDK</span>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                    <a href="#" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Code className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">PHP SDK</span>
                      <ExternalLink className="h-4 w-4 ml-auto text-gray-400" />
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Support */}
              <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
                  <p className="text-blue-100 mb-4">
                    Get support with API integration and troubleshooting.
                  </p>
                  <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
