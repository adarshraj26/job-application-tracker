import { apiService } from '@/services/api'
import {
  ApplicationAction,
  ApplicationContextType,
  ApplicationFormData,
  ApplicationStats,
  JobApplication,
  SearchFilters
} from '@/types'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from 'react'

// Initial state
const initialState: {
  applications: JobApplication[]
  loading: boolean
  error: string | null
} = {
  applications: [],
  loading: false,
  error: null
}

// Reducer function
function applicationReducer(state: typeof initialState, action: ApplicationAction) {
  switch (action.type) {
    case 'SET_APPLICATIONS':
      return { ...state, applications: action.payload, loading: false, error: null }
    case 'ADD_APPLICATION':
      return { ...state, applications: [...state.applications, action.payload], loading: false, error: null }
    case 'UPDATE_APPLICATION':
      return {
        ...state,
        applications: state.applications.map(app => (app.id === action.payload.id ? action.payload : app)),
        loading: false,
        error: null
      }
    case 'DELETE_APPLICATION':
      return { ...state, applications: state.applications.filter(app => app.id !== action.payload), loading: false, error: null }
    case 'SET_LOADING':
      return { ...state, loading: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'CLEAR_APPLICATIONS':
      return { ...initialState }
    default:
      return state
  }
}

// Calculate statistics helper
function calculateStats(applications: JobApplication[]): ApplicationStats {
  // Ensure applications is an array
  if (!Array.isArray(applications)) {
    applications = []
  }

  const stats: ApplicationStats = {
    totalApplications: applications.length,
    appliedCount: applications.filter(app => app.status === 'Applied').length,
    mailReceivedCount: applications.filter(app => app.mailReceived).length,
    interviewingCount: applications.filter(app =>
      [
        'Group Discussion Round',
        'Aptitude Round',
        'Technical Round 1',
        'Technical Round 2',
        'Managerial Round',
        'HR Round'
      ].includes(app.status)
    ).length,
    selectedCount: applications.filter(app => app.outcome === 'Selected').length,
    rejectedCount: applications.filter(app => app.outcome === 'Rejected').length,
    ghostingCount: applications.filter(app => app.status === 'Ghosting').length,
    activeCount: applications.filter(app => app.outcome === 'Active').length,
    statusBreakdown: {
      Applied: 0,
      'Group Discussion Round': 0,
      'Aptitude Round': 0,
      'Technical Round 1': 0,
      'Technical Round 2': 0,
      'Managerial Round': 0,
      'HR Round': 0,
      Ghosting: 0
    },
    outcomeBreakdown: {
      Active: 0,
      Selected: 0,
      Rejected: 0
    },
    sourceBreakdown: {
      LinkedIn: 0,
      'Naukri.com': 0,
      "Company's Careers Page": 0,
      Indeed: 0,
      WorkIndia: 0,
      Others: 0
    }
  }

  applications.forEach(app => {
    if (stats.statusBreakdown.hasOwnProperty(app.status)) stats.statusBreakdown[app.status]++
    if (stats.outcomeBreakdown.hasOwnProperty(app.outcome)) stats.outcomeBreakdown[app.outcome]++
    if (app.source === 'Others') stats.sourceBreakdown['Others']++
    else if (stats.sourceBreakdown.hasOwnProperty(app.source)) stats.sourceBreakdown[app.source]++
  })

  return stats
}

// Create the context with initial undefined (enforced by useApplications hook)
const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

interface ApplicationProviderProps {
  children: ReactNode
}

export function ApplicationProvider({ children }: ApplicationProviderProps) {
  const [state, dispatch] = useReducer(applicationReducer, initialState)

  const loadApplications = useCallback(async () => {
    try {
      console.log('Loading applications...')
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiService.getApplications()
      console.log('Get applications response:', response)
      
      if (response.status === 'success' && response.data?.applications) {
        console.log('Applications loaded successfully:', response.data.applications.length, 'applications')
        dispatch({ type: 'SET_APPLICATIONS', payload: response.data.applications })
      } else {
        console.warn('Invalid response format:', response)
        dispatch({ type: 'SET_APPLICATIONS', payload: [] })
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to load applications' })
      }
    } catch (error) {
      console.error('Error loading applications:', error)
      dispatch({ type: 'SET_APPLICATIONS', payload: [] })
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load applications' })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  const addApplication = useCallback(async (applicationData: ApplicationFormData) => {
    console.log('🔵 ApplicationContext: addApplication called with data:', applicationData)
    console.log('🔵 ApplicationContext: apiService available:', !!apiService)
    console.log('🔵 ApplicationContext: apiService.createApplication available:', !!apiService.createApplication)
    
    try {
      console.log('⏳ ApplicationContext: Setting loading to true')
      dispatch({ type: 'SET_LOADING', payload: true })
      
      console.log('📞 ApplicationContext: Calling apiService.createApplication...')
      const response = await apiService.createApplication(applicationData)
      console.log('📥 ApplicationContext: API response received:', response)
      console.log('📥 ApplicationContext: Response status:', response.status)
      console.log('📥 ApplicationContext: Response data:', response.data)
      console.log('📥 ApplicationContext: Response message:', response.message)
      
      if (response.status === 'success' && response.data) {
        // The backend returns { application: {...} } structure
        const application = (response.data as any).application || response.data
        console.log('✅ ApplicationContext: Application created successfully, adding to state:', application)
        console.log('✅ ApplicationContext: Application ID:', application.id)
        console.log('✅ ApplicationContext: Application company:', application.companyName)
        
        dispatch({ type: 'ADD_APPLICATION', payload: application })
        console.log('✅ ApplicationContext: Dispatched ADD_APPLICATION action')
        
        // Refresh the applications list to ensure we have the latest data
        console.log('🔄 ApplicationContext: Refreshing applications list...')
        setTimeout(() => {
          loadApplications()
        }, 100)
      } else {
        console.error('❌ ApplicationContext: API returned error:', response)
        console.error('❌ ApplicationContext: Response status:', response.status)
        console.error('❌ ApplicationContext: Response message:', response.message)
        throw new Error(response.message || 'Failed to create application')
      }
    } catch (error) {
      console.error('❌ ApplicationContext: Error adding application:', error)
      console.error('❌ ApplicationContext: Error message:', error instanceof Error ? error.message : 'Unknown error')
      console.error('❌ ApplicationContext: Error stack:', error instanceof Error ? error.stack : 'No stack')
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add application. Please check your connection and try again.' })
      throw error
    } finally {
      console.log('🏁 ApplicationContext: Setting loading to false')
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [loadApplications])

  const updateApplication = useCallback(async (id: string, applicationData: ApplicationFormData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiService.updateApplication(id, applicationData)
      if (response.status === 'success' && response.data) {
        dispatch({ type: 'UPDATE_APPLICATION', payload: response.data.application || response.data as any })
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to update application' })
        throw new Error('Failed to update application')
      }
    } catch (error) {
      console.error('Error updating application:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update application. Please check your connection and try again.' })
      throw error
    }
  }, [])

  const deleteApplication = useCallback(async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true })
      const response = await apiService.deleteApplication(id)
      if (response.status === 'success') {
        dispatch({ type: 'DELETE_APPLICATION', payload: id })
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message || 'Failed to delete application' })
        throw new Error(response.message || 'Failed to delete application')
      }
    } catch (error) {
      console.error('Error deleting application:', error)
      dispatch({ type: 'SET_ERROR', payload: 'Failed to delete application' })
      throw error
    }
  }, [])

  const getApplication = useCallback(
    (id: string): JobApplication | undefined => {
      return state.applications.find(app => app.id === id)
    },
    [state.applications]
  )

  const searchApplications = useCallback(
    (filters: SearchFilters): JobApplication[] => {
      let filtered = [...state.applications]
      if (filters.query) {
        const query = filters.query.toLowerCase()
        filtered = filtered.filter(
          app =>
            app.companyName.toLowerCase().includes(query) ||
            app.position.toLowerCase().includes(query) ||
            app.location.toLowerCase().includes(query)
        )
      }
      if (filters.status) filtered = filtered.filter(app => app.status === filters.status)
      if (filters.outcome) filtered = filtered.filter(app => app.outcome === filters.outcome)
      if (filters.source) filtered = filtered.filter(app => app.source === filters.source)
      if (filters.workMode) filtered = filtered.filter(app => app.workMode === filters.workMode)
      return filtered
    },
    [state.applications]
  )

  const stats = useMemo(() => calculateStats(state.applications), [state.applications])

  // Memoize the whole context value to avoid unnecessary rerenders
  const contextValue: ApplicationContextType = useMemo(
    () => ({
      applications: state.applications,
      stats,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplication,
      searchApplications,
      loading: state.loading,
      error: state.error
    }),
    [
      state.applications,
      stats,
      addApplication,
      updateApplication,
      deleteApplication,
      getApplication,
      searchApplications,
      state.loading,
      state.error
    ]
  )

  return <ApplicationContext.Provider value={contextValue}>{children}</ApplicationContext.Provider>
}

// Custom hook to consume your context safely
export function useApplications() {
  const context = useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider')
  }
  return context
}
