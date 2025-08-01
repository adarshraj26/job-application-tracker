import { useState, useMemo } from 'react'
import { JobApplication, SortConfig } from '@/types'

export function useSort<T extends JobApplication>(data: T[]) {
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof JobApplication]
      const bValue = b[sortConfig.key as keyof JobApplication]

      if (aValue === null || aValue === undefined) return 1
      if (bValue === null || bValue === undefined) return -1

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' 
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime()
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue
      }

      return 0
    })
  }, [data, sortConfig])

  const requestSort = (key: keyof JobApplication) => {
    setSortConfig(prevConfig => {
      if (prevConfig && prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
        }
      }
      return { key, direction: 'asc' }
    })
  }

  return { sortedData, sortConfig, requestSort }
}