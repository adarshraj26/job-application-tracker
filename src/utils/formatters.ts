import { format, formatDistanceToNow, parseISO } from 'date-fns'

export function formatDate(date: Date | string, pattern: string = 'MMM dd, yyyy'): string {
  try {
    // If date is a string, parse it first
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return format(dateObj, pattern)
  } catch (error) {
    console.error('Error formatting date:', error, 'Date value:', date)
    return 'Invalid date'
  }
}

export function formatRelativeTime(date: Date | string): string {
  try {
    // If date is a string, parse it first
    const dateObj = typeof date === 'string' ? parseISO(date) : date
    return formatDistanceToNow(dateObj, { addSuffix: true })
  } catch (error) {
    console.error('Error formatting relative time:', error, 'Date value:', date)
    return 'Invalid date'
  }
}

export function formatCurrency(amount: string): string {
  // Remove any non-numeric characters except dots and commas
  const numericValue = amount.replace(/[^0-9.,]/g, '')

  if (!numericValue) return amount

  try {
    const number = parseFloat(numericValue.replace(',', ''))
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number)
  } catch {
    return amount
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

export function capitalizeFirstLetter(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}