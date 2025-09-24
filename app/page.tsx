"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { CheckCircle, ArrowRight, Play, ExternalLink, Zap } from "lucide-react"

export default function LandingPage() {
  const [websiteUrl, setWebsiteUrl] = useState("")
  const router = useRouter()

  const handleGetStarted = () => {
    if (websiteUrl.trim()) {
      localStorage.setItem("businessWebsite", websiteUrl)
      router.push("/auth/signin")
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Exact Cast AI Style */}
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
          <nav className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Platform</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Solutions</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Resources</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 cursor-pointer">
              <span>Company</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Docs
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900">
              Pricing
            </a>
          </nav>
          <div className="flex items-center space-x-3">
            <Button className="bg-gray-900 hover:bg-gray-800 text-white" onClick={() => router.push("/auth/signin")}>
              Sign in
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section - Exact Cast AI Style */}
      <section className="bg-white py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Digital ad campaigns
                <br />
                with zero infra
                <br />
                headaches
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Test and deploy the most optimal ad campaigns for performance, cost and security.
              </p>
            </div>

            {/* Right Side - Animated Digital Ads Visualization */}
            <div className="relative">
              <div className="relative w-full max-w-lg mx-auto">
                <video autoPlay loop muted playsInline className="w-full h-auto rounded-2xl shadow-2xl">
                  <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1_1-FQ1hNQQ1TldQYGObmcrNz4w0sZ5VK2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Video overlay with subtle gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl pointer-events-none"></div>

                {/* Performance badge overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-gray-900">Live Performance</span>
                  </div>
                </div>

                {/* ROI indicator */}
                <div className="absolute bottom-4 right-4 bg-green-600/90 backdrop-blur-sm text-white rounded-lg px-3 py-2 shadow-lg">
                  <div className="text-center">
                    <div className="text-xs opacity-90">ROI Boost</div>
                    <div className="text-lg font-bold">+244%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Search Bar - Exact Cast AI Style */}
      <section className="bg-white pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="Add your product URL here for AI ads automation"
              className="w-full h-14 pl-6 pr-16 text-lg border-2 border-blue-200 rounded-full focus:border-blue-500 bg-blue-50"
            />
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 p-0"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <div className="text-sm text-gray-600 mb-8 uppercase tracking-wide font-medium">
            TRUSTED BY 2100+ COMPANIES GLOBALLY
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
              <span className="font-bold text-gray-800">Akamai</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
              <span className="font-bold text-gray-800">BMW GROUP</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-full"></div>
              <span className="font-bold text-gray-800">FICO</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full"></div>
              <span className="font-bold text-gray-800">Hugging Face</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-full"></div>
              <span className="font-bold text-gray-800">ShareChat</span>
            </div>
            {/* G2 Badges */}
            <div className="flex space-x-2">
              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                FALL 2024
                <br />
                High Performer
              </div>
              <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                FALL 2024
                <br />
                Momentum Leader
              </div>
              <div className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                FALL 2024
                <br />
                Regional Leader
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-4">
            <div className="text-sm text-blue-600 uppercase tracking-wide font-medium mb-4">KEY FEATURES</div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance mb-8">
              Run digital ad campaigns at a
              <br />
              fraction of the cost
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Features */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Campaign Automation</h3>
                <p className="text-gray-600 mb-6">
                  Deploy and manage AI-powered ad campaigns directly in your marketing workflows and join organizations
                  already running automated, high-performance campaigns with TEadifyz.ai.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Autoscaling based on performance metrics</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">
                      0-N-0 autoscaling to fully shut down unused campaigns and reduce idle costs
                    </span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Campaign-specific budget optimization for max efficiency</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Side - Interface Preview */}
            <div className="relative">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="text-sm text-gray-600 mb-4">Set up campaign for deployment</div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Cluster</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Cluster-name-staging</span>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">Endpoints</div>
                      <div className="space-y-2">
                        <div className="bg-gray-50 rounded p-2 text-sm">
                          <div className="font-medium">Service</div>
                          <div className="text-gray-600">llama3-8B</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2 text-sm">
                          <div className="font-medium">Endpoint</div>
                          <div className="text-gray-600">http://llama3-8b-service</div>
                        </div>
                      </div>
                    </div>
                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-600 mb-2">Port</div>
                      <div className="text-sm">8080</div>
                    </div>
                    <div className="border-t pt-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Deploy</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Gateway Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">AI Campaign Gateway</h2>
              <p className="text-lg text-gray-600 mb-8">
                Route campaigns to any platform—hosted open source or SaaS—via a single endpoint. Automatically retry,
                fallback, or switch providers without code changes.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">Integrate seamlessly using the standard Campaign API format</span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">
                    Unlock additional cost savings by running the Router in a TEadifyz.ai-managed optimization cluster
                  </span>
                </li>
              </ul>
            </div>

            {/* Right Side - Metrics */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">POTENTIAL LLM SAVINGS</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">95.61%</div>
                    <div className="text-lg font-semibold text-green-600">$4,166.92</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">TOTAL COST</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">$4,357.95</div>
                    <div className="text-sm text-gray-600">PER 1M TOKENS</div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">$52.00</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-sm text-gray-600 mb-4">MODEL RECOMMENDATIONS</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">GPT-4</span>
                      <span className="text-sm text-gray-600">LLAMA3-8B</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$50.75</div>
                      <div className="text-xs text-green-600">$2,334.09 (95.13%)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">GPT-4</span>
                      <span className="text-sm text-gray-600">LLAMA3-70B</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$1,520.43</div>
                      <div className="text-xs text-green-600">$3,304.84 (68.47%)</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm font-medium">GPT-4</span>
                      <span className="text-sm text-gray-600">GPT-4o-MINI</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">$2,506.72</div>
                      <div className="text-xs text-green-600">$2,334.09 (95.13%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cost Report Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Charts and Data */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">POTENTIAL LLM SAVINGS</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">95.61%</div>
                    <div className="text-lg font-semibold text-green-600">$4,166.92</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">TOTAL COST</div>
                    <div className="text-4xl font-bold text-gray-900 mb-2">$4,357.95</div>
                    <div className="text-sm text-gray-600">PER 1M TOKENS</div>
                    <div className="text-lg font-semibold text-gray-900 mt-2">$52.00</div>
                  </div>
                </div>

                {/* Chart placeholder */}
                <div className="h-32 bg-white rounded-lg flex items-end justify-between p-4 space-x-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${Math.random() * 80 + 20}%`, width: "4%" }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Content */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Cost report</h2>
              <p className="text-lg text-gray-600 mb-8">
                Make the best choice for your ad campaigns with all cost insights in one place.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">
                    Gain visibility into campaign costs with consolidated reports and dashboards
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <span className="text-gray-700">
                    Compare other cost-effective campaign strategies through recommendations
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="py-20 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <div className="text-sm text-blue-400 uppercase tracking-wide font-medium mb-6">CASE STUDY</div>
              <h2 className="text-4xl font-bold mb-8">
                Akamai achieves 40-70% cloud savings, boosts engineer productivity
              </h2>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 bg-transparent">
                Read the case study
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Right Side - Testimonial */}
            <div className="space-y-6">
              <blockquote className="text-lg text-gray-300">
                "I had an aha moment – an iPhone moment – with TEadifyz.ai. Literally two minutes into the integration,
                we saw the cost analytics, and I had an insight into something I had never had before and had tried to
                get for a very long time."
              </blockquote>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">DS</span>
                </div>
                <div>
                  <div className="font-semibold">Dekel Shavit</div>
                  <div className="text-sm text-gray-400">Sr. Director of Engineering</div>
                </div>
                <div className="flex space-x-2 ml-auto">
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Chart visualization */}
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="h-32 flex items-end justify-between space-x-1">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-blue-500 rounded-t"
                      style={{ height: `${Math.random() * 80 + 20}%`, width: "3%" }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Company logos */}
              <div className="flex items-center space-x-8 pt-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-white rounded-full"></div>
                  <span className="font-bold">Akamai</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  <span className="font-bold">yotpo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  <span className="font-bold">bede</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="text-sm text-blue-600 uppercase tracking-wide font-medium mb-4">LEARN MORE</div>
            <h2 className="text-4xl font-bold text-gray-900">Additional resources</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gray-100 rounded-t-lg h-48 flex items-center justify-center">
                  <div className="bg-gray-800 text-white p-4 rounded text-sm font-mono">
                    $ Run the ad setup task https://teadifyz.ai/setup <br />$ Setup Meta ads for your campaigns
                    <br />$ You can now use AI for campaign optimization
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">Docs</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Getting started with ad campaign optimization solutions for businesses
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Learn how to optimize ad performance and efficiency with TEadifyz.ai's automated solutions.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Read now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gray-100 rounded-t-lg h-48 flex items-center justify-center">
                  <div className="bg-white p-4 rounded shadow-sm">
                    <div className="text-2xl font-bold text-gray-900 mb-2">95.61%</div>
                    <div className="text-sm text-gray-600">Savings</div>
                    <div className="text-lg font-semibold text-green-600">$4,357.95</div>
                    <div className="text-xs text-gray-500">$52.00</div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs">GPT-4</span>
                      <span className="text-xs">LLAMA3-8B</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                      <div className="bg-green-500 h-1 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">Blog</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Ad Cost Optimization: How to Run Digital Marketing Campaigns Cost-Efficiently
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Discover how you can optimize ad costs without sacrificing performance.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Learn more
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="bg-gray-100 rounded-t-lg h-48 flex items-center justify-center">
                  <div className="bg-gray-800 text-white p-4 rounded text-sm font-mono">
                    $ Run the platform setup task https://teadifyz.ai/platforms <br />$ Setup Meta, Google, LinkedIn
                    integrations
                    <br />$ You can now use AI for multi-platform campaigns
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">Docs</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    See the full list of our supported ad platforms and integrations
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore the AI models and cloud platforms compatible with TEadifyz.ai's optimization solutions.
                  </p>
                  <Button variant="ghost" className="p-0 h-auto text-blue-600 hover:text-blue-700">
                    Read now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bottom Search Bar */}
      <section className="py-12 px-4 bg-white border-t border-gray-200">
        <div className="container mx-auto max-w-4xl">
          <div className="relative">
            <Input
              type="text"
              placeholder="What are the key features of TEadifyz.ai?"
              className="w-full h-14 pl-12 pr-16 text-lg border-2 border-blue-200 rounded-full focus:border-blue-500"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <Button
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 rounded-full h-10 w-10 p-0"
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">TEadifyz.ai</span>
              </div>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                TEadifyz.ai is the leading Digital Advertising Performance Automation platform, enabling customers to
                cut ad costs, improve performance, and boost productivity.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.21 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Solutions */}
            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">SOLUTIONS</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Meta ads optimization
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Google ads cost monitoring
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  LinkedIn campaign optimization
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Multi-platform security
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Campaign optimization for businesses
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Database optimization
                </a>
              </div>
            </div>

            {/* Resources */}
            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">RESOURCES</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  Blog
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Events
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Webinars
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Customer stories
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Documentation
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Release notes
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Pricing
                </a>
              </div>
            </div>

            {/* Company */}
            <div className="col-span-1">
              <h3 className="font-semibold text-white mb-4 uppercase tracking-wide text-sm">COMPANY</h3>
              <div className="space-y-3 text-sm">
                <a href="#" className="block text-gray-400 hover:text-white">
                  About us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Careers
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Contact us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Slack community
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Newsroom
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Brand assets
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Partner program
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  API Hero program
                </a>
                <a href="#" className="block text-gray-400 hover:text-white">
                  Referral program
                </a>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">ISO</span>
                  </div>
                  <span className="text-xs text-gray-400">27001</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">SOC</span>
                  </div>
                  <span className="text-xs text-gray-400">SOC 2</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">CLOUD NATIVE</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-8 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">FinOps</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                    <span className="text-xs font-bold">AWS</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div>AWS Qualified</div>
                    <div>Software</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold">G</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <div>Google Cloud</div>
                    <div>Premier Partner</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t border-gray-800 pt-8 mb-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-semibold text-white mb-3">Contact & Support</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>
                    <span className="text-white">Technical:</span>
                    <a href="mailto:technical@treezenterprise.com" className="ml-2 hover:text-white">
                      technical@treezenterprise.com
                    </a>
                  </div>
                  <div>
                    <span className="text-white">Support:</span>
                    <a href="mailto:support@treezenterprise.com" className="ml-2 hover:text-white">
                      support@treezenterprise.com
                    </a>
                  </div>
                  <div>
                    <span className="text-white">Phone:</span>
                    <a href="tel:+15558323439" className="ml-2 hover:text-white">
                      +1 (555) TEA-DIFY
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3">Address</h4>
                <div className="text-sm text-gray-400">
                  <div>1st floor, Lakshmi Nivasam,</div>
                  <div>1st Cross St, Sigayyanapalya,</div>
                  <div>Mahadevpura, Bengaluru,</div>
                  <div>Karnataka 560048, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div className="mb-4 md:mb-0">© 2025 TEadifyz.ai by TreezEnterprise. All rights reserved.</div>
              <div className="flex items-center space-x-6">
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-white">
                  Cookie Policy
                </a>
                <a href="#" className="hover:text-white">
                  Do not sell
                </a>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
                <a href="#" className="hover:text-white">
                  Information security policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom right help widget */}
      <div className="fixed bottom-6 right-6">
        <Button size="lg" className="rounded-full w-14 h-14 bg-blue-600 hover:bg-blue-700 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </Button>
      </div>
    </div>
  )
}
