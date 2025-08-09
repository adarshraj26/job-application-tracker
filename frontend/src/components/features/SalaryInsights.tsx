import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface SalaryData {
  role: string
  industry: string
  averageSalary: number
  minSalary: number
  maxSalary: number
  trend: 'up' | 'down' | 'stable'
  experienceLevel: string
  location: string
  lastUpdated: Date
}

interface SalaryInsightsProps {
  salaryData: SalaryData[]
  userRole: string
  userExperience: string
}

export default function SalaryInsights({ salaryData, userRole, userExperience }: SalaryInsightsProps) {
  const relevantSalaries = salaryData.filter(data => 
    data.role.toLowerCase().includes(userRole.toLowerCase()) ||
    data.experienceLevel === userExperience
  )

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'down': return <TrendingDown className="h-4 w-4 text-red-600" />
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const formatSalary = (salary: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary)
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-emerald-800">
          <DollarSign className="h-5 w-5" />
          Salary Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">
              {relevantSalaries.length > 0 ? formatSalary(relevantSalaries[0]?.averageSalary || 0) : 'N/A'}
            </div>
            <div className="text-xs text-emerald-700">Average Salary</div>
          </div>
          <div className="text-center p-3 bg-white rounded-lg border border-emerald-200">
            <div className="text-2xl font-bold text-emerald-600">
              {relevantSalaries.length > 0 ? formatSalary(relevantSalaries[0]?.maxSalary || 0) : 'N/A'}
            </div>
            <div className="text-xs text-emerald-700">Top Range</div>
          </div>
        </div>

        {/* Salary Data */}
        <div className="space-y-3">
          {relevantSalaries.map((data, index) => (
            <motion.div
              key={`${data.role}-${data.industry}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-white rounded-lg border border-emerald-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{data.role}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <span>{data.industry}</span>
                    <span>•</span>
                    <span>{data.location}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {data.experienceLevel} level
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(data.trend)}
                  <Badge className={`text-xs ${getTrendColor(data.trend)}`}>
                    {data.trend}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-emerald-600">
                    {formatSalary(data.minSalary)}
                  </div>
                  <div className="text-xs text-gray-600">Min</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-emerald-600">
                    {formatSalary(data.averageSalary)}
                  </div>
                  <div className="text-xs text-gray-600">Average</div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-emerald-600">
                    {formatSalary(data.maxSalary)}
                  </div>
                  <div className="text-xs text-gray-600">Max</div>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                Updated: {data.lastUpdated.toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>

        {relevantSalaries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <DollarSign className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No salary data available for your role.</p>
            <p className="text-sm">Try searching for similar positions or industries.</p>
          </div>
        )}

        {/* Market Trends */}
        <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
          <h4 className="font-medium text-gray-900 mb-3">Market Trends</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Software Engineers</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600">+8.5%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Data Scientists</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-green-600">+12.3%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Product Managers</span>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">+2.1%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 