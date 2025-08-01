import { useState } from 'react'
import { Crown, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProUpgrade from './ProUpgrade'

interface ProFeatureWrapperProps {
  children: React.ReactNode
  featureName: string
  description: string
  isPro?: boolean
}

export default function ProFeatureWrapper({ 
  children, 
  featureName, 
  description, 
  isPro = true 
}: ProFeatureWrapperProps) {
  const [showUpgrade, setShowUpgrade] = useState(false)
  const isProUser = localStorage.getItem('jobtracker_pro') === 'true'

  if (isProUser) {
    return <>{children}</>
  }

  if (!isPro) {
    return <>{children}</>
  }

  return (
    <>
      <div className="text-center p-4">
        <Button
          onClick={() => setShowUpgrade(true)}
          variant="outline"
          className="border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
        >
          <Crown className="h-4 w-4 mr-2" />
          Upgrade to Pro - ₹59
        </Button>
      </div>

      <ProUpgrade 
        isOpen={showUpgrade} 
        onClose={() => setShowUpgrade(false)} 
      />
    </>
  )
} 