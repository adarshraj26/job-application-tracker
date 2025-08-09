import { useState, useMemo } from 'react'
import { JobApplication, SearchFilters } from '@/types'

export function useSearch(applications: JobApplication[]) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: ''
  })

  const filteredApplications = useMemo(() => {
    let result = [...applications]

    if (filters.query) {
      const query = filters.query.toLowerCase()
      result = result.filter(app => 
        app.companyName.toLowerCase().includes(query) ||
        app.position.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query)
      )
    }

    if (filters.status) {
      result = result.filter(app => app.status === filters.status)
    }

    if (filters.outcome) {
      result = result.filter(app => app.outcome === filters.outcome)
    }

    if (filters.source) {
      result = result.filter(app => app.source === filters.source)
    }

    if (filters.workMode) {
      result = result.filter(app => app.workMode === filters.workMode)
    }

    return result
  }, [applications, filters])

  const updateFilter = (key: keyof SearchFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const clearFilters = () => {
    setFilters({ query: '' })
  }

  return {
    filters,
    filteredApplications,
    updateFilter,
    clearFilters
  }
}