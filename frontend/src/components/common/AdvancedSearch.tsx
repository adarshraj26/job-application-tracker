import { useState, useEffect } from 'react'
import { Search, Filter, X, Calendar, Building, MapPin, DollarSign, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { JobApplication } from '@/types'
import { STATUS_OPTIONS, OUTCOME_OPTIONS, SOURCE_OPTIONS, PRIORITY_OPTIONS } from '@/utils/constants'

interface AdvancedSearchProps {
  applications: JobApplication[]
  onFilterChange: (filteredApplications: JobApplication[]) => void
}

interface SearchFilters {
  searchTerm: string
  status: string
  outcome: string
  source: string
  priority: string
  dateRange: {
    start: string
    end: string
  }
  salaryRange: {
    min: string
    max: string
  }
  workMode: string
}

export default function AdvancedSearch({ applications, onFilterChange }: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: '',
    outcome: '',
    source: '',
    priority: '',
    dateRange: { start: '', end: '' },
    salaryRange: { min: '', max: '' },
    workMode: ''
  })

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = applications.filter(application => {
      // Search term filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase()
        const matchesSearch = 
          application.companyName.toLowerCase().includes(searchLower) ||
          application.position.toLowerCase().includes(searchLower) ||
          application.location.toLowerCase().includes(searchLower) ||
          (application.contactPerson?.toLowerCase().includes(searchLower) || false) ||
          (application.notes?.toLowerCase().includes(searchLower) || false)
        
        if (!matchesSearch) return false
      }

      // Status filter
      if (filters.status && application.status !== filters.status) return false

      // Outcome filter
      if (filters.outcome && application.outcome !== filters.outcome) return false

      // Source filter
      if (filters.source && application.source !== filters.source) return false

      // Priority filter
      if (filters.priority && application.priority !== filters.priority) return false

      // Work mode filter
      if (filters.workMode && application.workMode !== filters.workMode) return false

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const appliedDate = new Date(application.appliedDate)
        if (filters.dateRange.start) {
          const startDate = new Date(filters.dateRange.start)
          if (appliedDate < startDate) return false
        }
        if (filters.dateRange.end) {
          const endDate = new Date(filters.dateRange.end)
          if (appliedDate > endDate) return false
        }
      }

      // Salary range filter (basic implementation)
      if (filters.salaryRange.min || filters.salaryRange.max) {
        // This is a simplified implementation - you might want to parse salary strings more carefully
        const salary = application.salary.toLowerCase()
        if (filters.salaryRange.min && !salary.includes(filters.salaryRange.min.toLowerCase())) return false
        if (filters.salaryRange.max && !salary.includes(filters.salaryRange.max.toLowerCase())) return false
      }

      return true
    })

    onFilterChange(filtered)
  }, [filters, applications, onFilterChange])

  // Update active filters display
  useEffect(() => {
    const active: string[] = []
    if (filters.searchTerm) active.push(`Search: "${filters.searchTerm}"`)
    if (filters.status) active.push(`Status: ${filters.status}`)
    if (filters.outcome) active.push(`Outcome: ${filters.outcome}`)
    if (filters.source) active.push(`Source: ${filters.source}`)
    if (filters.priority) active.push(`Priority: ${filters.priority}`)
    if (filters.workMode) active.push(`Work Mode: ${filters.workMode}`)
    if (filters.dateRange.start || filters.dateRange.end) active.push('Date Range')
    if (filters.salaryRange.min || filters.salaryRange.max) active.push('Salary Range')
    
    setActiveFilters(active)
  }, [filters])

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      status: '',
      outcome: '',
      source: '',
      priority: '',
      dateRange: { start: '', end: '' },
      salaryRange: { min: '', max: '' },
      workMode: ''
    })
  }

  const removeFilter = (filterType: keyof SearchFilters) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: filterType === 'dateRange' ? { start: '', end: '' } : 
                   filterType === 'salaryRange' ? { min: '', max: '' } : ''
    }))
  }

  return (
    <Card className="mb-6 border border-gray-200 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search & Filter Applications
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {isExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by company, position, location, contact person, or notes..."
            value={filters.searchTerm}
            onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
            className="pl-10"
            data-tour="search"
          />
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X 
                  className="h-3 w-3 cursor-pointer hover:text-red-500" 
                  onClick={() => {
                    // Remove specific filter based on the filter text
                    if (filter.includes('Search:')) removeFilter('searchTerm')
                    else if (filter.includes('Status:')) removeFilter('status')
                    else if (filter.includes('Outcome:')) removeFilter('outcome')
                    else if (filter.includes('Source:')) removeFilter('source')
                    else if (filter.includes('Priority:')) removeFilter('priority')
                    else if (filter.includes('Work Mode:')) removeFilter('workMode')
                    else if (filter === 'Date Range') removeFilter('dateRange')
                    else if (filter === 'Salary Range') removeFilter('salaryRange')
                  }}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700"
            >
              Clear All
            </Button>
          </div>
        )}

        {/* Advanced Filters */}
        {isExpanded && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            {/* Status Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Outcome Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Outcome</label>
              <Select value={filters.outcome} onValueChange={(value) => setFilters(prev => ({ ...prev, outcome: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Outcomes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Outcomes</SelectItem>
                  {OUTCOME_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Source Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Source</label>
              <Select value={filters.source} onValueChange={(value) => setFilters(prev => ({ ...prev, source: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Sources</SelectItem>
                  {SOURCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Priority Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
              <Select value={filters.priority} onValueChange={(value) => setFilters(prev => ({ ...prev, priority: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Priorities</SelectItem>
                  {PRIORITY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Work Mode Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Work Mode</label>
              <Select value={filters.workMode} onValueChange={(value) => setFilters(prev => ({ ...prev, workMode: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="All Work Modes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Work Modes</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="On-site">On-site</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date Range */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Applied Date Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, start: e.target.value } 
                  }))}
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, end: e.target.value } 
                  }))}
                />
              </div>
            </div>

            {/* Salary Range */}
            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                Salary Range
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min Salary"
                  value={filters.salaryRange.min}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    salaryRange: { ...prev.salaryRange, min: e.target.value } 
                  }))}
                />
                <Input
                  placeholder="Max Salary"
                  value={filters.salaryRange.max}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    salaryRange: { ...prev.salaryRange, max: e.target.value } 
                  }))}
                />
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
} 