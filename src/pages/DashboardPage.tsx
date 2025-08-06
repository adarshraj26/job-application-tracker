import DashboardCharts from '@/features/dashboard/DashboardCharts'
import DashboardOverview from '@/features/dashboard/DashboardOverview'
import AdvancedAnalytics from '@/features/dashboard/AdvancedAnalytics'
import ProFeatureWrapper from '@/components/common/ProFeatureWrapper'
import { useApplications } from '@/context/ApplicationContext'

export default function DashboardPage() {
  const { applications } = useApplications()

  return (
    <div className="space-y-8 lg:space-y-12">
      <div className="text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2 max-w-2xl lg:max-w-none">
          Get insights into your job search progress and performance with detailed analytics.
        </p>
      </div>

      <DashboardOverview />
      <DashboardCharts />
      <ProFeatureWrapper 
        featureName="Advanced Analytics"
        description="Get detailed insights and performance metrics for your job search"
      >
        <AdvancedAnalytics applications={applications} />
      </ProFeatureWrapper>
      <div data-tour="analytics" className="hidden" />
    </div>
  )
}
