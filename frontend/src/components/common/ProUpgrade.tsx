import { useState } from 'react'
import { Crown, Calendar, BarChart3, Smartphone, Zap, Check, Star, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface ProUpgradeProps {
  isOpen: boolean
  onClose: () => void
}

interface ProFeature {
  icon: React.ComponentType<any>
  title: string
  description: string
  isPro: boolean
}

const proFeatures: ProFeature[] = [
  {
    icon: Calendar,
    title: 'Calendar Integration',
    description: 'Sync interviews with Google Calendar & Outlook',
    isPro: true
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Detailed insights and performance metrics',
    isPro: true
  },
  {
    icon: Smartphone,
    title: 'Mobile App',
    description: 'Native mobile app for iOS & Android',
    isPro: true
  },
  {
    icon: Zap,
    title: 'AI Resume Analysis',
    description: 'AI-powered resume optimization',
    isPro: true
  },
  {
    icon: Check,
    title: 'Basic Tracking',
    description: 'Track job applications and status',
    isPro: false
  },
  {
    icon: Check,
    title: 'Follow-up Reminders',
    description: 'Never miss important follow-ups',
    isPro: false
  }
]

export default function ProUpgrade({ isOpen, onClose }: ProUpgradeProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'stripe'>('razorpay')

  const handleProUpgrade = async () => {
    setIsProcessing(true)
    
    try {
      if (paymentMethod === 'razorpay') {
        await handleRazorpayPayment()
      } else {
        await handleStripePayment()
      }
    } catch (error) {
      console.error('Payment failed:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleRazorpayPayment = async () => {
    // Initialize Razorpay
    const options = {
      key: 'rzp_test_YOUR_RAZORPAY_KEY', // Replace with your actual key
      amount: 5900, // Amount in paise (₹59 * 100)
      currency: 'INR',
      name: 'JobTracker Pro',
      description: 'Upgrade to Pro Plan',
      image: 'https://your-logo-url.com/logo.png',
      handler: function (response: any) {
        console.log('Payment successful:', response)
        alert('Payment successful! Welcome to JobTracker Pro!')
        onClose()
        // Here you would typically update the user's subscription status
        localStorage.setItem('jobtracker_pro', 'true')
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#667eea'
      }
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  const handleStripePayment = async () => {
    // This would integrate with Stripe
    alert('Stripe payment integration would be implemented here')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader className="text-center bg-gradient-to-r from-yellow-100 to-orange-100 rounded-t-lg p-6">
          <DialogTitle className="text-2xl font-bold text-yellow-900">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Crown className="h-8 w-8 text-yellow-600" />
              <span>Upgrade to JobTracker Pro</span>
            </div>
          </DialogTitle>
          <DialogDescription className="text-yellow-800 text-lg font-medium">
            Unlock premium features to supercharge your job search
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 p-6">
          {/* Features List */}
          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
            <div className="space-y-3">
              {proFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-200">
                  <div className={`p-2 rounded-full ${feature.isPro ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                    {feature.isPro ? <Lock className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <feature.icon className="h-4 w-4 text-gray-600" />
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      {feature.isPro && (
                        <Badge variant="secondary" className="text-xs">
                          <Crown className="h-3 w-3 mr-1" />
                          Pro
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing and Payment */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            {/* Pricing Card */}
            <Card className="border-2 border-yellow-200 bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Crown className="h-6 w-6 text-yellow-700" />
                  <CardTitle className="text-xl text-yellow-900">Pro Plan</CardTitle>
                </div>
                <CardDescription className="text-yellow-800 font-medium">
                  One-time payment, lifetime access
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <span className="text-3xl font-bold text-yellow-900">₹59</span>
                  <span className="text-yellow-800 ml-2 font-medium">only</span>
                </div>
                <div className="text-sm text-yellow-800 mb-4 font-medium">
                  <div>✓ No recurring charges</div>
                  <div>✓ Lifetime access</div>
                  <div>✓ All future updates</div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="bg-white border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Choose Payment Method</CardTitle>
                <CardDescription className="text-gray-600">Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="razorpay"
                    name="payment"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'razorpay' | 'stripe')}
                    className="text-blue-600"
                  />
                  <label htmlFor="razorpay" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      RZ
                    </div>
                    <span className="text-gray-900">Razorpay (Recommended for India)</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="stripe"
                    name="payment"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'razorpay' | 'stripe')}
                    className="text-blue-600"
                  />
                  <label htmlFor="stripe" className="flex items-center gap-2 cursor-pointer">
                    <div className="w-8 h-5 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      S
                    </div>
                    <span className="text-gray-900">Stripe (International)</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Upgrade Button */}
            <Button
              onClick={handleProUpgrade}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 text-lg shadow-lg"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Upgrade to Pro - ₹59
                </div>
              )}
            </Button>

            {/* Security Notice */}
            <div className="text-center text-sm text-gray-600 bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center justify-center gap-1 mb-1">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium text-green-800">Secure Payment</span>
              </div>
              <p className="text-green-700">Your payment is secured with bank-level encryption</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3">What Users Say</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700">"Calendar integration saved me so much time!"</p>
              <p className="text-xs text-gray-500 mt-2">- Priya S., Software Engineer</p>
            </div>
            <div className="p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-sm text-gray-700">"The analytics helped me improve my job search strategy."</p>
              <p className="text-xs text-gray-500 mt-2">- Rahul M., Product Manager</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 