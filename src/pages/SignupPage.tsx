import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Briefcase, ArrowRight, Sparkles, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import OAuthButtons from '@/components/common/OAuthButtons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuth } from '@/context/AuthContext'

const signupSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type SignupFormData = z.infer<typeof signupSchema>

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isOAuthLoading, setIsOAuthLoading] = useState(false)
  const [oauthError, setOauthError] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema)
  })

  const watchedPassword = watch('password')

  const passwordStrength = {
    length: watchedPassword?.length >= 8,
    uppercase: /[A-Z]/.test(watchedPassword || ''),
    lowercase: /[a-z]/.test(watchedPassword || ''),
    number: /[0-9]/.test(watchedPassword || ''),
    special: /[^A-Za-z0-9]/.test(watchedPassword || '')
  }

  const { signup, loginWithGoogle, loginWithGitHub } = useAuth()

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    setOauthError(null)
    try {
      await signup(data.fullName, data.email, data.password)
      setStep(2)
      // Navigate to applications page after showing success message
      setTimeout(() => navigate('/applications'), 2000)
    } catch (error) {
      console.error('Signup failed:', error)
      // You could add toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsOAuthLoading(true)
    setOauthError(null)
    try {
      await loginWithGoogle()
      navigate('/applications')
    } catch (error) {
      console.error('Google signup failed:', error)
      setOauthError(error instanceof Error ? error.message : 'Failed to sign up with Google. Please try again.')
    } finally {
      setIsOAuthLoading(false)
    }
  }

  const handleGitHubSignup = async () => {
    setIsOAuthLoading(true)
    setOauthError(null)
    try {
      await loginWithGitHub()
      navigate('/applications')
    } catch (error) {
      console.error('GitHub signup failed:', error)
      setOauthError(error instanceof Error ? error.message : 'Failed to sign up with GitHub. Please try again.')
    } finally {
      setIsOAuthLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  const successVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10
      }
    }
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardContent className="p-8">
              <motion.div
                variants={successVariants}
                className="flex justify-center mb-6"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
              </motion.div>
              
              <motion.h2 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to JobTracker!
              </motion.h2>
              
              <motion.p variants={itemVariants} className="text-gray-600 mb-6">
                Your account has been created successfully. You're all set to start tracking your job applications!
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                Redirecting to dashboard...
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200 rounded-full opacity-20"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-pink-200 rounded-full opacity-20"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        />
      </div>

      <motion.div
        className="w-full max-w-md"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div variants={itemVariants} className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <motion.div
                  className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-3 w-3 text-white" />
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Join JobTracker!
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Create your account and start organizing your job search
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* OAuth Error Message */}
            {oauthError && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
              >
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-sm text-yellow-800">{oauthError}</p>
              </motion.div>
            )}

            <motion.form variants={itemVariants} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-gray-700 font-medium">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className="pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('fullName')}
                  />
                </div>
                {errors.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.fullName.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 pr-4 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('email')}
                  />
                </div>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    className="pl-10 pr-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {watchedPassword && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <div className="grid grid-cols-5 gap-1">
                      {Object.entries(passwordStrength).map(([key, valid]) => (
                        <div
                          key={key}
                          className={`h-1 rounded-full transition-colors ${
                            valid ? 'bg-green-500' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className={`flex items-center gap-1 ${passwordStrength.length ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`h-3 w-3 ${passwordStrength.length ? 'text-green-600' : 'text-gray-400'}`} />
                        8+ characters
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`h-3 w-3 ${passwordStrength.uppercase ? 'text-green-600' : 'text-gray-400'}`} />
                        Uppercase
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`h-3 w-3 ${passwordStrength.lowercase ? 'text-green-600' : 'text-gray-400'}`} />
                        Lowercase
                      </div>
                      <div className={`flex items-center gap-1 ${passwordStrength.number ? 'text-green-600' : 'text-gray-500'}`}>
                        <CheckCircle className={`h-3 w-3 ${passwordStrength.number ? 'text-green-600' : 'text-gray-400'}`} />
                        Number
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    className="pl-10 pr-12 py-3 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...register('confirmPassword')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.confirmPassword.message}
                  </motion.p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="terms" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <motion.div variants={itemVariants}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 text-lg shadow-lg"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Creating account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Create Account
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.form>

            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <OAuthButtons
                onGoogleClick={handleGoogleSignup}
                onGitHubClick={handleGitHubSignup}
                isLoading={isOAuthLoading}
                variant="signup"
              />
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 