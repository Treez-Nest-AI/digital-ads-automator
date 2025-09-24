"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MapPin, Edit, Target, DollarSign, Calendar, Users, ArrowRight, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface AdSet {
  id: string
  name: string
  budget: number
  location: string
  audience: string
  placement: string[]
  schedule: {
    startDate: string
    endDate: string
  }
}

export default function AdSetsPreviewPage() {
  const [adSets, setAdSets] = useState<AdSet[]>([])
  const [editingAdSet, setEditingAdSet] = useState<AdSet | null>(null)
  const [editLocation, setEditLocation] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Load campaign data from localStorage and generate ad sets
    const campaignData = JSON.parse(localStorage.getItem("campaignData") || "{}")
    const businessData = JSON.parse(localStorage.getItem("businessDetails") || "{}")

    if (campaignData.adSets) {
      const numAdSets = Number.parseInt(campaignData.adSets)
      const budgetPerAdSet = Number.parseFloat(campaignData.dailyBudget) / numAdSets

      const generatedAdSets: AdSet[] = []

      for (let i = 1; i <= numAdSets; i++) {
        generatedAdSets.push({
          id: `adset-${i}`,
          name: `${campaignData.campaignName} - Ad Set ${i}`,
          budget: budgetPerAdSet,
          location: campaignData.location || businessData.location || "Global",
          audience: i === 1 ? "Broad Audience" : i === 2 ? "Lookalike Audience" : `Custom Audience ${i - 2}`,
          placement: ["Facebook Feed", "Instagram Feed", "Instagram Stories"],
          schedule: {
            startDate: campaignData.startDate || new Date().toISOString(),
            endDate: campaignData.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        })
      }

      setAdSets(generatedAdSets)
    }
  }, [])

  const handleEditLocation = (adSet: AdSet) => {
    setEditingAdSet(adSet)
    setEditLocation(adSet.location)
    setIsEditDialogOpen(true)
  }

  const handleSaveLocation = () => {
    if (editingAdSet) {
      setAdSets((prev) =>
        prev.map((adSet) => (adSet.id === editingAdSet.id ? { ...adSet, location: editLocation } : adSet)),
      )
      setIsEditDialogOpen(false)
      setEditingAdSet(null)
      setEditLocation("")
    }
  }

  const handleLaunchCampaign = () => {
    // Store final ad sets data
    localStorage.setItem("finalAdSets", JSON.stringify(adSets))
    router.push("/campaign/launch")
  }

  const totalBudget = adSets.reduce((sum, adSet) => sum + adSet.budget, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TEadifyz.ai</span>
          </div>
          <div className="text-sm text-gray-600">Ad Sets Preview</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Review Your Ad Sets</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and customize your ad sets before launching your campaign. You can edit targeting locations for each
            ad set.
          </p>
        </div>

        {/* Campaign Summary */}
        <Card className="bg-white border-gray-200 shadow-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Campaign Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{adSets.length}</div>
                <div className="text-sm text-gray-600">Ad Sets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">₹{totalBudget.toFixed(2)}</div>
                <div className="text-sm text-gray-600">Daily Budget</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">3</div>
                <div className="text-sm text-gray-600">Placements</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">30</div>
                <div className="text-sm text-gray-600">Days Duration</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ad Sets List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Ad Sets Details</h2>

          {adSets.map((adSet, index) => (
            <Card key={adSet.id} className="bg-white border-gray-200 shadow-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-gray-900">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                    </div>
                    {adSet.name}
                  </CardTitle>
                  <Badge variant="secondary">Active</Badge>
                </div>
                <CardDescription className="text-gray-600">Optimized for maximum performance and reach</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Budget */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Daily Budget
                    </div>
                    <div className="text-lg font-semibold text-gray-900">₹{adSet.budget.toFixed(2)}</div>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      Target Location
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-gray-900">{adSet.location}</div>
                      <Button variant="outline" size="sm" onClick={() => handleEditLocation(adSet)} className="ml-2">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Audience */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      Audience
                    </div>
                    <div className="text-lg font-semibold text-gray-900">{adSet.audience}</div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <div className="flex items-center text-sm font-medium text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule
                    </div>
                    <div className="text-sm">
                      <div className="text-gray-900">{new Date(adSet.schedule.startDate).toLocaleDateString()}</div>
                      <div className="text-gray-600">to {new Date(adSet.schedule.endDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                {/* Performance Prediction */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Expected Performance</div>
                      <div className="text-sm text-gray-600">
                        Based on budget allocation: ₹{adSet.budget.toFixed(2)}/day
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="font-medium">
                          {adSet.budget >= 200
                            ? "Excellent"
                            : adSet.budget >= 150
                              ? "Good"
                              : adSet.budget >= 93
                                ? "Moderate"
                                : "Low"}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">Est. {Math.round(adSet.budget * 50)} daily reach</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Launch Button */}
        <div className="mt-8 text-center">
          <Button onClick={handleLaunchCampaign} size="lg" className="h-14 px-8 text-lg">
            Launch Campaign
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
          <p className="text-sm text-gray-600 mt-4">
            Your campaign will be submitted for review and go live within 24 hours
          </p>
        </div>
      </div>

      {/* Edit Location Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit Target Location</DialogTitle>
            <DialogDescription className="text-gray-600">
              Update the target location for {editingAdSet?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-900">
                Target Location
              </Label>
              <Input
                id="location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Enter target location"
                className="h-11"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveLocation}>Save Changes</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
