"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  CheckCircle,
  Rocket,
  Clock,
  Target,
  DollarSign,
  Users,
  Calendar,
  CreditCard,
  ExternalLink,
  AlertCircle,
  RefreshCw,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function LaunchCampaignPage() {
  const [launchProgress, setLaunchProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isLaunching, setIsLaunching] = useState(false)
  const [campaignData, setCampaignData] = useState<any>({})
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  const [isCheckingPayment, setIsCheckingPayment] = useState(false)
  const router = useRouter()

  const launchSteps = [
    "Validating campaign settings",
    "Optimizing ad creatives",
    "Setting up targeting parameters",
    "Configuring budget allocation",
    "Submitting to META for review",
    "Campaign launched successfully!",
  ]

  useEffect(() => {
    const campaign = JSON.parse(localStorage.getItem("campaignData") || "{}")
    const business = JSON.parse(localStorage.getItem("businessDetails") || "{}")
    const creative = JSON.parse(localStorage.getItem("creativeData") || "{}")
    const adSets = JSON.parse(localStorage.getItem("finalAdSets") || "[]")

    setCampaignData({ campaign, business, creative, adSets })
  }, [])

  const checkPaymentMethod = async () => {
    setIsCheckingPayment(true)

    setTimeout(() => {
      const hasPayment = Math.random() > 0.3
      setPaymentVerified(hasPayment)
      setIsCheckingPayment(false)

      if (hasPayment) {
        setShowPaymentModal(false)
      }
    }, 2000)
  }

  const handleLaunch = () => {
    if (!paymentVerified) {
      setShowPaymentModal(true)
      return
    }

    setIsLaunching(true)

    const interval = setInterval(() => {
      setLaunchProgress((prev) => {
        const newProgress = prev + 16.67
        if (newProgress >= 100) {
          clearInterval(interval)
          setCurrentStep(5)
          setTimeout(() => {
            const activeCampaign = {
              id: Date.now().toString(),
              name: campaignData.campaign?.campaignName || "New Campaign",
              status: "active",
              budget: campaignData.campaign?.dailyBudget || "0",
              adSets: campaignData.adSets?.length || 1,
              createdAt: new Date().toISOString(),
              performance: {
                impressions: 0,
                clicks: 0,
                conversions: 0,
                spend: 0,
              },
            }

            const existingCampaigns = JSON.parse(localStorage.getItem("activeCampaigns") || "[]")
            existingCampaigns.push(activeCampaign)
            localStorage.setItem("activeCampaigns", JSON.stringify(existingCampaigns))

            router.push("/dashboard")
          }, 3000)
          return 100
        }

        setCurrentStep(Math.floor(newProgress / 16.67))
        return newProgress
      })
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TEadifyz.ai</span>
          </div>
          <div className="text-sm text-gray-600">Launch Campaign</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {!isLaunching ? (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Ready to Launch Your Campaign</h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Your AI-powered advertising campaign is configured and ready to go live. Review the final details below.
              </p>
            </div>

            <Card className="bg-white backdrop-blur-sm border-gray-200 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900">Campaign Overview</CardTitle>
                <CardDescription className="text-gray-600">Final campaign configuration summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">
                      {campaignData.campaign?.campaignName || "Campaign"}
                    </div>
                    <div className="text-sm text-gray-600">Campaign Name</div>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">₹{campaignData.campaign?.dailyBudget || "0"}</div>
                    <div className="text-sm text-gray-600">Daily Budget</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{campaignData.adSets?.length || 1}</div>
                    <div className="text-sm text-gray-600">Ad Sets</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">30 Days</div>
                    <div className="text-sm text-gray-600">Duration</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white backdrop-blur-sm border-gray-200 mb-8">
              <CardHeader>
                <CardTitle className="text-gray-900">Pre-Launch Checklist</CardTitle>
                <CardDescription className="text-gray-600">All systems verified and ready</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    "Campaign settings configured",
                    "Ad creatives uploaded and optimized",
                    "Target audiences defined",
                    "Budget allocation optimized",
                    "META account connected",
                    "Compliance checks passed",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button onClick={handleLaunch} size="lg" className="h-14 px-12 text-lg">
                <Rocket className="mr-3 w-6 h-6" />
                Launch Campaign Now
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                Your campaign will be submitted to META for review and typically goes live within 24 hours
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                {launchProgress === 100 ? (
                  <CheckCircle className="w-10 h-10 text-green-500" />
                ) : (
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">
                {launchProgress === 100 ? "Campaign Launched Successfully!" : "Launching Your Campaign"}
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {launchProgress === 100
                  ? "Your campaign is now live and optimizing for the best results. Redirecting to dashboard..."
                  : "Please wait while we set up your campaign and submit it for review."}
              </p>
            </div>

            <Card className="bg-white backdrop-blur-sm border-gray-200">
              <CardHeader>
                <CardTitle className="text-gray-900">Launch Progress</CardTitle>
                <CardDescription className="text-gray-600">Setting up your AI-powered campaign</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-900">Progress</span>
                    <span className="text-gray-900">{Math.round(launchProgress)}%</span>
                  </div>
                  <Progress value={launchProgress} className="h-3" />
                </div>

                <div className="space-y-3">
                  {launchSteps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : index === currentStep ? (
                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                      <span className={`text-sm ${index <= currentStep ? "text-gray-900" : "text-gray-600"}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-gray-900">
              <CreditCard className="w-6 h-6 text-blue-600" />
              <span>Payment Method Required</span>
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              To run ads on your account, you'll need to add a payment method in Facebook's Ads Manager.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {!paymentVerified && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Payment Method Not Found</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Please add a payment method to your Facebook Ads Manager account to continue.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {paymentVerified && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Payment Method Verified</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your payment method is active and ready for campaign launch.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button
                onClick={() => window.open("https://business.facebook.com/adsmanager", "_blank")}
                className="mb-4"
                size="lg"
              >
                <ExternalLink className="mr-2 w-5 h-5" />
                Open Facebook Ads Manager
              </Button>
            </div>

            <Card className="bg-white border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Instructions to Add Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                      1
                    </span>
                    Desktop Guide
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-8">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Go to Facebook Ads Manager
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      In the left-hand sidebar, find and click on "Payment Settings"
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Select "Add Payment Method"
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Choose a payment method (e.g., credit card, PayPal, etc.) and fill in the necessary details
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Save your payment information
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-blue-600 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
                      2
                    </span>
                    Mobile Guide (via Facebook Ads App)
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600 ml-8">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Open the Facebook Ads Manager app (download if not installed)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Tap the menu icon (three horizontal lines) and go to Payment Settings
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Choose Add Payment Method and follow the steps to complete the process
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-3">
              <Button
                onClick={checkPaymentMethod}
                disabled={isCheckingPayment}
                className="flex-1"
                variant={paymentVerified ? "default" : "outline"}
              >
                {isCheckingPayment ? (
                  <>
                    <RefreshCw className="mr-2 w-4 h-4 animate-spin" />
                    Checking Payment Method...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 w-4 h-4" />
                    Check Payment Method
                  </>
                )}
              </Button>

              {paymentVerified && (
                <Button
                  onClick={() => {
                    setShowPaymentModal(false)
                    handleLaunch()
                  }}
                  className="flex-1"
                >
                  <Rocket className="mr-2 w-4 h-4" />
                  Launch Campaign Now
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
