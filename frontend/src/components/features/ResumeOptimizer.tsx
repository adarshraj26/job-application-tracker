import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CheckCircle, AlertCircle, Lightbulb, Target } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ResumeSuggestion {
  id: string
  type: 'improvement' | 'addition' | 'removal' | 'formatting'
  category: string
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  implemented: boolean
}

interface ResumeOptimizerProps {
  suggestions: ResumeSuggestion[]
  onImplementSuggestion: (id: string) => void
}

export default function ResumeOptimizer({ suggestions, onImplementSuggestion }: ResumeOptimizerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImpact, setSelectedImpact] = useState<string>('all')

  const categories = ['all', 'content', 'formatting', 'keywords', 'experience']
  const impacts = ['all', 'high', 'medium', 'low']

  const filteredSuggestions = suggestions.filter(suggestion => {
    const categoryMatch = selectedCategory === 'all' || suggestion.category === selectedCategory
    const impactMatch = selectedImpact === 'all' || suggestion.impact === selectedImpact
    return categoryMatch && impactMatch
  })

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'improvement': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'addition': return <Lightbulb className="h-4 w-4 text-blue-600" />
      case 'removal': return <AlertCircle className="h-4 w-4 text-red-600" />
      case 'formatting': return <Target className="h-4 w-4 text-purple-600" />
      default: return <Sparkles className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-purple-800">
          <Sparkles className="h-5 w-5" />
          Resume Optimizer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-purple-700 mb-2 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="text-xs"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-purple-700 mb-2 block">Impact</label>
            <div className="flex flex-wrap gap-2">
              {impacts.map(impact => (
                <Button
                  key={impact}
                  variant={selectedImpact === impact ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedImpact(impact)}
                  className="text-xs"
                >
                  {impact.charAt(0).toUpperCase() + impact.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          {filteredSuggestions.map((suggestion, index) => (
            <motion.div
              key={suggestion.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 bg-white rounded-lg border-2 ${
                suggestion.implemented ? 'border-green-200 bg-green-50' : 'border-purple-200'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(suggestion.type)}
                  <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                </div>
                <Badge className={`text-xs ${getImpactColor(suggestion.impact)}`}>
                  {suggestion.impact} impact
                </Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-purple-600 capitalize">{suggestion.category}</span>
                {!suggestion.implemented && (
                  <Button
                    size="sm"
                    onClick={() => onImplementSuggestion(suggestion.id)}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Implement
                  </Button>
                )}
                {suggestion.implemented && (
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="h-4 w-4" />
                    Implemented
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredSuggestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p>No suggestions match your filters.</p>
            <p className="text-sm">Try adjusting your filter criteria.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 