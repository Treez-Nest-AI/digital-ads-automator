"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Plus, TrendingUp, Eye, MousePointer, Target, Settings } from "lucide-react"
import { useRouter } from "next/navigation"

interface Campaign {
  id: string
  name: string
  status: "active" | "paused" | "completed"
  budget: string
  adSets: number
  createdAt: string
  performance: {
    impressions: number
    clicks: number
    conversions: number
    spend: number
  }
}

const mockPerformanceData = [
  { day: "Mon", impressions: 12500, clicks: 450, conversions: 23, spend: 1250 },
  { day: "Tue", impressions: 15200, clicks: 520, conversions: 31, spend: 1480 },
  { day: "Wed", impressions: 18900, clicks: 680, conversions: 42, spend: 1890 },
  { day: "Thu", impressions: 16800, clicks: 590, conversions: 35, spend: 1650 },
  { day: "Fri", impressions: 21300, clicks: 780, conversions: 48, spend: 2100 },
  { day: "Sat", impressions: 19600, clicks: 720, conversions: 44, spend: 1920 },
  { day: "Sun", impressions: 17400, clicks: 630, conversions: 38, spend: 1740 },
]

export default function DashboardPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [selectedMetric, setSelectedMetric] = useState<"impressions" | "clicks" | "conversions" | "spend">(
    "impressions",
  )
  const router = useRouter()

  useEffect(() => {
    // Load campaigns from localStorage
    const activeCampaigns = JSON.parse(localStorage.getItem("activeCampaigns") || "[]")

    // Add mock data for demonstration if no campaigns exist
    if (activeCampaigns.length === 0) {
      const mockCampaigns: Campaign[] = [
        {
          id: "1",
          name: "Summer Sale Campaign",
          status: "active",
          budget: "2500",
          adSets: 3,
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          performance: {
            impressions: 125000,
            clicks: 4500,
            conversions: 230,
            spend: 12500,
          },
        },
        {
          id: "2",
          name: "Product Launch Campaign",
          status: "active",
          budget: "1800",
          adSets: 2,
          createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          performance: {
            impressions: 89000,
            clicks: 3200,
            conversions: 180,
            spend: 8900,
          },
        },
      ]
      setCampaigns(mockCampaigns)
    } else {
      setCampaigns(activeCampaigns)
    }
  }, [])

  const totalMetrics = campaigns.reduce(
    (acc, campaign) => ({
      impressions: acc.impressions + campaign.performance.impressions,
      clicks: acc.clicks + campaign.performance.clicks,
      conversions: acc.conversions + campaign.performance.conversions,
      spend: acc.spend + campaign.performance.spend,
    }),
    { impressions: 0, clicks: 0, conversions: 0, spend: 0 },
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default"
      case "paused":
        return "secondary"
      case "completed":
        return "outline"
      default:
        return "outline"
    }
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
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/")}
              className="bg-gray-900 hover:bg-gray-800 text-white flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Campaign</span>
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Campaign Dashboard</h1>
          <p className="text-lg text-gray-600">Monitor and optimize your AI-powered advertising campaigns</p>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Impressions</CardTitle>
              <Eye className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMetrics.impressions.toLocaleString()}</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+12.5%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Clicks</CardTitle>
              <MousePointer className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMetrics.clicks.toLocaleString()}</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+8.2%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Conversions</CardTitle>
              <Target className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalMetrics.conversions.toLocaleString()}</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+15.3%</span> from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Total Spend</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₹{totalMetrics.spend.toLocaleString()}</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">+5.1%</span> from last week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Analytics */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Performance Analytics
              </CardTitle>
              <CardDescription className="text-gray-600">7-day performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex space-x-2">
                  {(["impressions", "clicks", "conversions", "spend"] as const).map((metric) => (
                    <Button
                      key={metric}
                      variant={selectedMetric === metric ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedMetric(metric)}
                      className={
                        selectedMetric === metric
                          ? "bg-gray-900 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockPerformanceData}>
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
                      dataKey={selectedMetric}
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Comparison */}
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-gray-900">Campaign Comparison</CardTitle>
              <CardDescription className="text-gray-600">Performance by campaign</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaigns.map((c) => ({ name: c.name.split(" ")[0], ...c.performance }))}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="conversions" fill="#2563eb" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns List */}
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-gray-900">Active Campaigns</CardTitle>
            <CardDescription className="text-gray-600">Manage and monitor your advertising campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(campaign.status)}`} />
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{campaign.name}</h3>
                        <p className="text-sm text-gray-600">
                          Created {new Date(campaign.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getStatusBadgeVariant(campaign.status)} className="bg-green-100 text-green-800">
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div>
                      <div className="text-sm text-gray-600">Daily Budget</div>
                      <div className="font-semibold text-gray-900">₹{campaign.budget}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Ad Sets</div>
                      <div className="font-semibold text-gray-900">{campaign.adSets}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Impressions</div>
                      <div className="font-semibold text-gray-900">
                        {campaign.performance.impressions.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Clicks</div>
                      <div className="font-semibold text-gray-900">{campaign.performance.clicks.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Conversions</div>
                      <div className="font-semibold text-gray-900">{campaign.performance.conversions}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Spend</div>
                      <div className="font-semibold text-gray-900">₹{campaign.performance.spend.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}

              {campaigns.length === 0 && (
                <div className="text-center py-12">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">No campaigns yet</h3>
                  <p className="text-gray-600 mb-4">Create your first AI-powered campaign to get started</p>
                  <Button onClick={() => router.push("/")} className="bg-gray-900 hover:bg-gray-800 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
