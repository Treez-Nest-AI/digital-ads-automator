"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Building2, MapPin, Phone, Mail, FileText, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const businessCategories = [
  "E-commerce & Retail",
  "Technology & Software",
  "Healthcare & Medical",
  "Education & Training",
  "Food & Beverage",
  "Real Estate",
  "Finance & Insurance",
  "Travel & Tourism",
  "Automotive",
  "Beauty & Wellness",
  "Professional Services",
  "Manufacturing",
  "Entertainment & Media",
  "Non-profit",
  "Other",
]

export default function BusinessDetailsPage() {
  const [formData, setFormData] = useState({
    businessName: "",
    category: "",
    aboutBusiness: "",
    location: "",
    phoneNumber: "",
    businessEmail: "",
    gstNumber: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Store business details in localStorage
    localStorage.setItem("businessDetails", JSON.stringify(formData))

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/onboarding/connection-gateway")
    }, 2000)
  }

  const isFormValid = () => {
    return (
      formData.businessName &&
      formData.category &&
      formData.aboutBusiness &&
      formData.location &&
      formData.phoneNumber &&
      formData.businessEmail
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TEadifyz.ai</span>
          </div>
          <div className="text-sm text-gray-600">Step 1 of 3</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Business Details</span>
            <span>33% Complete</span>
          </div>
          <Progress value={33} className="h-2" />
        </div>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center text-gray-900">
              <Building2 className="w-6 h-6 mr-3 text-blue-600" />
              Tell Us About Your Business
            </CardTitle>
            <CardDescription className="text-gray-600">
              Help us understand your business so we can create the most effective ad campaigns for you.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName" className="text-base font-medium text-gray-900">
                  Business Name *
                </Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange("businessName", e.target.value)}
                  className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-medium text-gray-900">
                  Business Category *
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your business category" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    {businessCategories.map((category) => (
                      <SelectItem key={category} value={category} className="hover:bg-gray-50">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* About Business */}
              <div className="space-y-2">
                <Label htmlFor="aboutBusiness" className="text-base font-medium text-gray-900">
                  About Your Business *
                </Label>
                <Textarea
                  id="aboutBusiness"
                  placeholder="Describe what your business does, your products/services, and what makes you unique..."
                  value={formData.aboutBusiness}
                  onChange={(e) => handleInputChange("aboutBusiness", e.target.value)}
                  className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
                <p className="text-sm text-gray-600">This helps our AI create more targeted and relevant ad content.</p>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="text-base font-medium text-gray-900">
                  Business Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="location"
                    type="text"
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-base font-medium text-gray-900">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <Label htmlFor="businessEmail" className="text-base font-medium text-gray-900">
                  Business Email *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="businessEmail"
                    type="email"
                    placeholder="business@company.com"
                    value={formData.businessEmail}
                    onChange={(e) => handleInputChange("businessEmail", e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {/* GST Number (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="gstNumber" className="text-base font-medium text-gray-900">
                  GST Number <span className="text-gray-600 font-normal">(Optional)</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="gstNumber"
                    type="text"
                    placeholder="Enter GST number if applicable"
                    value={formData.gstNumber}
                    onChange={(e) => handleInputChange("gstNumber", e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <p className="text-sm text-gray-600">Required for businesses in certain regions for tax compliance.</p>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full h-12 text-lg bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? "Saving Details..." : "Continue to Platform Connection"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Your information is secure and will only be used to optimize your ad campaigns.
          </p>
        </div>
      </div>
    </div>
  )
}
