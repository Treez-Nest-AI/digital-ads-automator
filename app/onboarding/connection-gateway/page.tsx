"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CheckCircle, ArrowRight, Building2, Users, CreditCard, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

interface MetaConnectionStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  options: Array<{
    id: string
    name: string
    description: string
    image?: string
  }>
}

const metaConnectionSteps: MetaConnectionStep[] = [
  {
    id: "business-portfolio",
    title: "Business Portfolio",
    description: "Select your business portfolio to manage your advertising accounts",
    icon: <Building2 className="w-6 h-6" />,
    options: [
      {
        id: "main-business",
        name: "Main Business Portfolio",
        description: "Primary business account with full access",
      },
      {
        id: "secondary-business",
        name: "Secondary Business",
        description: "Additional business portfolio",
      },
    ],
  },
  {
    id: "facebook-pages",
    title: "Facebook & Instagram Pages",
    description: "Connect your Facebook and Instagram business pages",
    icon: <Users className="w-6 h-6" />,
    options: [
      {
        id: "main-page",
        name: "Main Business Page",
        description: "Your primary Facebook business page",
      },
      {
        id: "instagram-page",
        name: "Instagram Business",
        description: "Connected Instagram business account",
      },
    ],
  },
  {
    id: "ad-account",
    title: "Ad Account",
    description: "Select the ad account to use for your campaigns",
    icon: <CreditCard className="w-6 h-6" />,
    options: [
      {
        id: "primary-ad-account",
        name: "Primary Ad Account",
        description: "Main advertising account with active campaigns",
      },
      {
        id: "secondary-ad-account",
        name: "Secondary Ad Account",
        description: "Additional ad account for specific campaigns",
      },
    ],
  },
]

export default function ConnectionGatewayPage() {
  const [showMetaModal, setShowMetaModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [isConnecting, setIsConnecting] = useState(false)
  const router = useRouter()

  const handleMetaConnection = () => {
    setShowMetaModal(true)
    setCurrentStep(0)
    setSelectedOptions({})
  }

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [stepId]: optionId }))
  }

  const handleNextStep = () => {
    if (currentStep < metaConnectionSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Complete META connection
      setIsConnecting(true)
      setTimeout(() => {
        setIsConnecting(false)
        setShowMetaModal(false)
        router.push("/campaign/setup")
      }, 3000)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isCurrentStepComplete = () => {
    const currentStepId = metaConnectionSteps[currentStep].id
    return selectedOptions[currentStepId] !== undefined
  }

  const currentStepData = metaConnectionSteps[currentStep]

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Cast AI Style */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">TEadifyz AI</span>
          </div>
          <div className="text-sm text-gray-600">Step 2 of 3</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Platform Connection</span>
            <span>66% Complete</span>
          </div>
          <Progress value={66} className="h-2" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Advertising Platforms</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect your social media and advertising accounts to start creating automated campaigns across multiple
            platforms.
          </p>
        </div>

        {/* Platform Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* META Card */}
          <Card className="bg-white border border-gray-200 shadow-sm hover:border-blue-300 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <CardTitle className="text-xl text-gray-900">META</CardTitle>
              <CardDescription className="text-gray-600">Facebook & Instagram Ads</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Connect your Facebook and Instagram business accounts to create and manage ad campaigns.
              </p>
              <Button onClick={handleMetaConnection} className="w-full bg-gray-900 hover:bg-gray-800 text-white">
                Connect META
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Google Card */}
          <Card className="bg-white border border-gray-200 shadow-sm opacity-60">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <CardTitle className="text-xl text-gray-900">Google Ads</CardTitle>
              <CardDescription className="text-gray-600">Search & Display Advertising</CardDescription>
              <Badge variant="secondary" className="mt-2 bg-gray-100 text-gray-700">
                <Clock className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Google Ads integration will be available soon. Manage search and display campaigns.
              </p>
              <Button disabled className="w-full bg-gray-300 text-gray-500">
                Coming Soon
              </Button>
            </CardContent>
          </Card>

          {/* LinkedIn Card */}
          <Card className="bg-white border border-gray-200 shadow-sm opacity-60">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gray-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <CardTitle className="text-xl text-gray-900">LinkedIn Ads</CardTitle>
              <CardDescription className="text-gray-600">Professional Network Advertising</CardDescription>
              <Badge variant="secondary" className="mt-2 bg-gray-100 text-gray-700">
                <Clock className="w-3 h-3 mr-1" />
                Coming Soon
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                LinkedIn Ads integration coming soon. Target professionals and B2B audiences.
              </p>
              <Button disabled className="w-full bg-gray-300 text-gray-500">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            onClick={() => router.push("/campaign/setup")}
          >
            Skip for Now - Continue to Campaign Setup
          </Button>
        </div>
      </div>

      {/* META Connection Modal */}
      <Dialog open={showMetaModal} onOpenChange={setShowMetaModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border border-gray-200">
          <DialogHeader>
            <DialogTitle className="text-2xl text-gray-900">Connect META Account</DialogTitle>
            <DialogDescription className="text-gray-600">
              Complete the following steps to connect your Facebook and Instagram advertising accounts.
            </DialogDescription>
          </DialogHeader>

          {!isConnecting ? (
            <div className="space-y-6">
              {/* Progress Steps */}
              <div className="flex items-center justify-center space-x-4 mb-8">
                {metaConnectionSteps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index <= currentStep ? "bg-gray-900 text-white" : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    {index < metaConnectionSteps.length - 1 && (
                      <div className={`w-12 h-0.5 ${index < currentStep ? "bg-gray-900" : "bg-gray-200"}`} />
                    )}
                  </div>
                ))}
              </div>

              {/* Current Step Content */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-gray-900">{currentStepData.icon}</div>
                  </div>
                  <CardTitle className="text-xl text-gray-900">{currentStepData.title}</CardTitle>
                  <CardDescription className="text-gray-600">{currentStepData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {currentStepData.options.map((option) => (
                      <Card
                        key={option.id}
                        className={`cursor-pointer transition-colors bg-white border ${
                          selectedOptions[currentStepData.id] === option.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleOptionSelect(currentStepData.id, option.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">{option.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                            </div>
                            {selectedOptions[currentStepData.id] === option.id && (
                              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                  onClick={handlePreviousStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={!isCurrentStepComplete()}
                  className="bg-gray-900 hover:bg-gray-800 text-white"
                >
                  {currentStep === metaConnectionSteps.length - 1 ? "Connect Account" : "Next Step"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connecting Your META Account</h3>
              <p className="text-gray-600">
                Please wait while we securely connect your Facebook and Instagram advertising accounts...
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
