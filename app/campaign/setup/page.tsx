"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { CalendarIcon, Target, TrendingUp, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const adGoals = [
  { value: "website-visits", label: "Website Visits", description: "Drive traffic to your website" },
  { value: "leads", label: "Leads", description: "Generate leads and contact information" },
  { value: "sales", label: "Sales", description: "Drive direct sales and conversions" },
]

const campaignObjectives = [
  "Brand Awareness",
  "Reach",
  "Traffic",
  "Engagement",
  "App Installs",
  "Video Views",
  "Lead Generation",
  "Messages",
  "Conversions",
  "Catalog Sales",
  "Store Traffic",
]

interface PerformanceData {
  day: number
  performance: number
  reach: number
  clicks: number
}

export default function CampaignSetupPage() {
  const [formData, setFormData] = useState({
    campaignName: "",
    productPrice: "",
    adGoal: "",
    campaignObjective: "",
    productDescription: "",
    location: "",
    dailyBudget: "",
    adSets: "1",
  })
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>()
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([])
  const [performanceLevel, setPerformanceLevel] = useState("")
  const [budgetPerAdSet, setBudgetPerAdSet] = useState(0)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Calculate performance based on budget and ad sets
  useEffect(() => {
    const budget = Number.parseFloat(formData.dailyBudget) || 0
    const adSets = Number.parseInt(formData.adSets) || 1
    const budgetPerSet = budget / adSets

    setBudgetPerAdSet(budgetPerSet)

    // Determine performance level based on budget per ad set
    let level = ""
    let performanceScore = 0

    if (budgetPerSet >= 500) {
      level = "Untouchable Performance"
      performanceScore = 95
    } else if (budgetPerSet >= 200) {
      level = "Insane Performance"
      performanceScore = 85
    } else if (budgetPerSet >= 150) {
      level = "Best Performance"
      performanceScore = 75
    } else if (budgetPerSet >= 93) {
      level = "Low Performance"
      performanceScore = 45
    } else if (budgetPerSet > 0) {
      level = "Very Low Performance"
      performanceScore = 25
    }

    setPerformanceLevel(level)

    // Generate mock performance data
    const data: PerformanceData[] = []
    for (let i = 1; i <= 7; i++) {
      data.push({
        day: i,
        performance: performanceScore + Math.random() * 10 - 5,
        reach: performanceScore * 100 + Math.random() * 500,
        clicks: performanceScore * 10 + Math.random() * 50,
      })
    }
    setPerformanceData(data)
  }, [formData.dailyBudget, formData.adSets])

  const getPerformanceColor = () => {
    if (budgetPerAdSet >= 500) return "text-purple-500"
    if (budgetPerAdSet >= 200) return "text-green-500"
    if (budgetPerAdSet >= 150) return "text-blue-500"
    if (budgetPerAdSet >= 93) return "text-yellow-500"
    return "text-red-500"
  }

  const getPerformanceIcon = () => {
    if (budgetPerAdSet >= 150) return <CheckCircle className="w-5 h-5" />
    if (budgetPerAdSet >= 93) return <AlertTriangle className="w-5 h-5" />
    return <AlertTriangle className="w-5 h-5" />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Store campaign data
    const campaignData = {
      ...formData,
      startDate,
      endDate,
      budgetPerAdSet,
      performanceLevel,
    }
    localStorage.setItem("campaignData", JSON.stringify(campaignData))
    router.push("/campaign/creative-studio")
  }

  const isFormValid = () => {
    return (
      formData.campaignName &&
      formData.productPrice &&
      formData.adGoal &&
      formData.campaignObjective &&
      formData.productDescription &&
      formData.location &&
      formData.dailyBudget &&
      endDate
    )
  }

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
          <div className="text-sm text-gray-600">Campaign Setup</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Your AI-Powered Campaign</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Set up your campaign parameters and watch our AI predict performance based on your budget allocation.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Campaign Setup Form */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  Campaign Details
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Configure your campaign settings and targeting
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Campaign Name */}
                  <div className="space-y-2">
                    <Label htmlFor="campaignName" className="text-gray-700">
                      Campaign Name *
                    </Label>
                    <Input
                      id="campaignName"
                      placeholder="Enter campaign name"
                      value={formData.campaignName}
                      onChange={(e) => handleInputChange("campaignName", e.target.value)}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Product Price */}
                  <div className="space-y-2">
                    <Label htmlFor="productPrice" className="text-gray-700">
                      Product Price *
                    </Label>
                    <Input
                      id="productPrice"
                      type="number"
                      placeholder="Enter product price"
                      value={formData.productPrice}
                      onChange={(e) => handleInputChange("productPrice", e.target.value)}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Ad Goal */}
                  <div className="space-y-2">
                    <Label className="text-gray-700">Ad Goal *</Label>
                    <Select value={formData.adGoal} onValueChange={(value) => handleInputChange("adGoal", value)}>
                      <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select your ad goal" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        {adGoals.map((goal) => (
                          <SelectItem key={goal.value} value={goal.value}>
                            <div>
                              <div className="font-medium text-gray-900">{goal.label}</div>
                              <div className="text-sm text-gray-600">{goal.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Campaign Objective */}
                  <div className="space-y-2">
                    <Label className="text-gray-700">Campaign Objective *</Label>
                    <Select
                      value={formData.campaignObjective}
                      onValueChange={(value) => handleInputChange("campaignObjective", value)}
                    >
                      <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select campaign objective" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        {campaignObjectives.map((objective) => (
                          <SelectItem key={objective} value={objective} className="text-gray-900">
                            {objective}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Product Description */}
                  <div className="space-y-2">
                    <Label htmlFor="productDescription" className="text-gray-700">
                      Product Description *
                    </Label>
                    <Textarea
                      id="productDescription"
                      placeholder="Describe your product or service..."
                      value={formData.productDescription}
                      onChange={(e) => handleInputChange("productDescription", e.target.value)}
                      className="min-h-[100px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700">
                      Target Location *
                    </Label>
                    <Input
                      id="location"
                      placeholder="Enter target location"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-700">Start Date *</Label>
                      <div className="h-11 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 flex items-center text-gray-700">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(startDate, "PPP")} (Today)
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">End Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "h-11 justify-start text-left font-normal border-gray-300 hover:bg-gray-50",
                              !endDate && "text-gray-500",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Pick end date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white border border-gray-200">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                            disabled={(date) => date < startDate}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Daily Budget */}
                  <div className="space-y-2">
                    <Label htmlFor="dailyBudget" className="text-gray-700">
                      Daily Budget (₹) *
                    </Label>
                    <Input
                      id="dailyBudget"
                      type="number"
                      placeholder="Enter daily budget"
                      value={formData.dailyBudget}
                      onChange={(e) => handleInputChange("dailyBudget", e.target.value)}
                      className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  {/* Ad Sets */}
                  <div className="space-y-2">
                    <Label className="text-gray-700">Number of Ad Sets *</Label>
                    <Select value={formData.adSets} onValueChange={(value) => handleInputChange("adSets", value)}>
                      <SelectTrigger className="h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-gray-200">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <SelectItem key={num} value={num.toString()} className="text-gray-900">
                            {num} Ad Set{num > 1 ? "s" : ""}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Performance Analytics */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                  Performance Prediction
                </CardTitle>
                <CardDescription className="text-gray-600">
                  AI-powered performance analysis based on your budget allocation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Budget Breakdown */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Budget:</span>
                    <span className="font-medium text-gray-900">₹{formData.dailyBudget || "0"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Ad Sets:</span>
                    <span className="font-medium text-gray-900">{formData.adSets}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Budget per Ad Set:</span>
                    <span className="font-medium text-gray-900">₹{budgetPerAdSet.toFixed(2)}</span>
                  </div>
                </div>

                {/* Performance Level */}
                {performanceLevel && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className={getPerformanceColor()}>{getPerformanceIcon()}</div>
                      <span className={`font-medium ${getPerformanceColor()}`}>{performanceLevel}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {budgetPerAdSet >= 200
                        ? "Excellent budget allocation for maximum reach and engagement"
                        : budgetPerAdSet >= 150
                          ? "Good budget allocation for solid performance"
                          : budgetPerAdSet >= 93
                            ? "Moderate budget - consider increasing for better results"
                            : "Low budget per ad set - performance may be limited"}
                    </div>
                  </div>
                )}

                {/* Performance Chart */}
                {performanceData.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">7-Day Performance Forecast</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "white",
                              border: "1px solid #e5e7eb",
                              borderRadius: "8px",
                            }}
                          />
                          <Line
                            type="monotone"
                            dataKey="performance"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">AI Recommendations</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    {budgetPerAdSet < 93 && (
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <span>Consider increasing budget or reducing ad sets for better performance</span>
                      </div>
                    )}
                    {budgetPerAdSet >= 150 && (
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Excellent budget allocation - expect strong performance</span>
                      </div>
                    )}
                    <div className="flex items-start space-x-2">
                      <TrendingUp className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>Optimal ad set range: 2-3 for balanced reach and frequency</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Button */}
            <Button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className="w-full h-12 text-lg bg-gray-900 hover:bg-gray-800 text-white"
              size="lg"
            >
              Continue to Creative Studio
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
