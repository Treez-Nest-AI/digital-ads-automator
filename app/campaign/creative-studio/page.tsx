"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Smartphone,
  Upload,
  ImageIcon,
  Video,
  RotateCcw,
  ArrowRight,
  Plus,
  X,
  Eye,
  Heart,
  MessageCircle,
  Share,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  file?: File
}

export default function CreativeStudioPage() {
  const [adType, setAdType] = useState<"single" | "carousel" | "video">("single")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [adContent, setAdContent] = useState({
    headline: "",
    description: "",
    callToAction: "",
    websiteUrl: "",
    displayUrl: "",
  })
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const newItem: MediaItem = {
          id: Date.now().toString() + Math.random(),
          type: file.type.startsWith("video/") ? "video" : "image",
          url: e.target?.result as string,
          file,
        }

        if (adType === "single") {
          setMediaItems([newItem])
        } else {
          setMediaItems((prev) => [...prev, newItem])
        }
      }
      reader.readAsDataURL(file)
    })
  }

  const removeMediaItem = (id: string) => {
    setMediaItems((prev) => prev.filter((item) => item.id !== id))
  }

  const handleAdTypeChange = (type: "single" | "carousel" | "video") => {
    setAdType(type)
    setMediaItems([])
  }

  const handleInputChange = (field: string, value: string) => {
    setAdContent((prev) => ({ ...prev, [field]: value }))
  }

  const handleContinue = () => {
    // Store creative data
    const creativeData = {
      adType,
      mediaItems: mediaItems.map((item) => ({ ...item, file: undefined })), // Remove file objects for storage
      adContent,
    }
    localStorage.setItem("creativeData", JSON.stringify(creativeData))
    router.push("/campaign/adsets-preview")
  }

  const isFormValid = () => {
    return (
      mediaItems.length > 0 &&
      adContent.headline &&
      adContent.description &&
      adContent.callToAction &&
      adContent.websiteUrl
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-gray-900">TEadifyz.ai</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreviewMode ? "Edit Mode" : "Preview Mode"}</span>
            </Button>
            <div className="text-sm text-gray-600">Creative Studio</div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">AD Creative Studio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Create compelling ad creatives with our AI-powered studio. Upload media and customize your ad content.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Creative Controls */}
          <div className="space-y-6">
            {/* Ad Type Selection */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Ad Format</CardTitle>
                <CardDescription className="text-gray-600">Choose the format for your ad creative</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={adType} onValueChange={(value) => handleAdTypeChange(value as any)}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="single" className="flex items-center space-x-2">
                      <ImageIcon className="w-4 h-4" />
                      <span>Single Image</span>
                    </TabsTrigger>
                    <TabsTrigger value="carousel" className="flex items-center space-x-2">
                      <RotateCcw className="w-4 h-4" />
                      <span>Carousel</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex items-center space-x-2">
                      <Video className="w-4 h-4" />
                      <span>Video</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </CardContent>
            </Card>

            {/* Media Upload */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Upload Media</CardTitle>
                <CardDescription className="text-gray-600">
                  {adType === "single" && "Upload a single image for your ad"}
                  {adType === "carousel" && "Upload multiple images for your carousel ad (up to 10)"}
                  {adType === "video" && "Upload a video for your ad"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Button */}
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mb-4" />
                  <Button onClick={() => fileInputRef.current?.click()} variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Upload {adType === "video" ? "Video" : "Image"}
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">
                    {adType === "video" ? "MP4, MOV up to 100MB" : "JPG, PNG up to 10MB"}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept={adType === "video" ? "video/*" : "image/*"}
                    multiple={adType === "carousel"}
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

                {/* Uploaded Media Preview */}
                {mediaItems.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Uploaded Media</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {mediaItems.map((item) => (
                        <div key={item.id} className="relative group">
                          {item.type === "image" ? (
                            <img
                              src={item.url || "/placeholder.svg"}
                              alt="Uploaded media"
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          ) : (
                            <video src={item.url} className="w-full h-32 object-cover rounded-lg" controls />
                          )}
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removeMediaItem(item.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Ad Content */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-gray-900">Ad Content</CardTitle>
                <CardDescription className="text-gray-600">Write compelling copy for your ad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="headline" className="text-gray-900">
                    Headline *
                  </Label>
                  <Input
                    id="headline"
                    placeholder="Write a compelling headline..."
                    value={adContent.headline}
                    onChange={(e) => handleInputChange("headline", e.target.value)}
                    maxLength={40}
                    className="h-11"
                  />
                  <p className="text-xs text-gray-500">{adContent.headline.length}/40 characters</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-900">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your product or service..."
                    value={adContent.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    maxLength={125}
                    className="min-h-[100px] resize-none"
                  />
                  <p className="text-xs text-gray-500">{adContent.description.length}/125 characters</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-900">Call to Action *</Label>
                  <Select
                    value={adContent.callToAction}
                    onValueChange={(value) => handleInputChange("callToAction", value)}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Select call to action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learn-more">Learn More</SelectItem>
                      <SelectItem value="shop-now">Shop Now</SelectItem>
                      <SelectItem value="sign-up">Sign Up</SelectItem>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="get-quote">Get Quote</SelectItem>
                      <SelectItem value="contact-us">Contact Us</SelectItem>
                      <SelectItem value="book-now">Book Now</SelectItem>
                      <SelectItem value="subscribe">Subscribe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="websiteUrl" className="text-gray-900">
                    Website URL *
                  </Label>
                  <Input
                    id="websiteUrl"
                    type="url"
                    placeholder="https://your-website.com"
                    value={adContent.websiteUrl}
                    onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
                    className="h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayUrl" className="text-gray-900">
                    Display URL
                  </Label>
                  <Input
                    id="displayUrl"
                    placeholder="your-website.com"
                    value={adContent.displayUrl}
                    onChange={(e) => handleInputChange("displayUrl", e.target.value)}
                    className="h-11"
                  />
                  <p className="text-xs text-gray-500">Optional: Customize how your URL appears in the ad</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Preview */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-900">
                  <Smartphone className="w-5 h-5 mr-2 text-blue-600" />
                  Mobile Preview
                </CardTitle>
                <CardDescription className="text-gray-600">See how your ad will look on mobile devices</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile Frame */}
                <div className="mx-auto max-w-sm">
                  <div className="bg-black rounded-[2.5rem] p-2">
                    <div className="bg-white rounded-[2rem] overflow-hidden">
                      {/* Status Bar */}
                      <div className="bg-white px-6 py-2 flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-900">9:41</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-4 h-2 bg-gray-900 rounded-sm"></div>
                          <div className="w-1 h-1 bg-gray-900 rounded-full"></div>
                          <div className="w-6 h-3 border border-gray-900 rounded-sm">
                            <div className="w-4 h-full bg-gray-900 rounded-sm"></div>
                          </div>
                        </div>
                      </div>

                      {/* Facebook Header */}
                      <div className="px-4 py-3 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">B</span>
                          </div>
                          <div>
                            <p className="font-medium text-sm text-gray-900">Your Business</p>
                            <p className="text-xs text-gray-500">Sponsored</p>
                          </div>
                        </div>
                      </div>

                      {/* Ad Content */}
                      <div className="px-4 py-3">
                        {adContent.headline && (
                          <p className="font-medium text-sm mb-2 text-gray-900">{adContent.headline}</p>
                        )}
                        {adContent.description && <p className="text-sm text-gray-600 mb-3">{adContent.description}</p>}
                      </div>

                      {/* Media Preview */}
                      <div className="relative">
                        {mediaItems.length > 0 ? (
                          <div className="aspect-square bg-gray-100">
                            {adType === "carousel" ? (
                              <div className="relative h-full">
                                {mediaItems[0].type === "image" ? (
                                  <img
                                    src={mediaItems[0].url || "/placeholder.svg"}
                                    alt="Ad media"
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <video src={mediaItems[0].url} className="w-full h-full object-cover" muted />
                                )}
                                {mediaItems.length > 1 && (
                                  <div className="absolute top-4 right-4">
                                    <Badge variant="secondary" className="text-xs">
                                      1/{mediaItems.length}
                                    </Badge>
                                  </div>
                                )}
                              </div>
                            ) : mediaItems[0].type === "image" ? (
                              <img
                                src={mediaItems[0].url || "/placeholder.svg"}
                                alt="Ad media"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <video src={mediaItems[0].url} className="w-full h-full object-cover" muted />
                            )}
                          </div>
                        ) : (
                          <div className="aspect-square bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-500">Upload media to preview</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      {adContent.callToAction && (
                        <div className="px-4 py-3">
                          <Button className="w-full h-10 text-sm bg-gray-900 hover:bg-gray-800 text-white">
                            {adContent.callToAction.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Button>
                        </div>
                      )}

                      {/* Website URL */}
                      {adContent.websiteUrl && (
                        <div className="px-4 pb-3">
                          <p className="text-xs text-gray-500">
                            {adContent.displayUrl ||
                              adContent.websiteUrl.replace("https://", "").replace("http://", "")}
                          </p>
                        </div>
                      )}

                      {/* Engagement Bar */}
                      <div className="px-4 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500">
                              <Heart className="w-5 h-5" />
                              <span className="text-sm">Like</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500">
                              <MessageCircle className="w-5 h-5" />
                              <span className="text-sm">Comment</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500">
                              <Share className="w-5 h-5" />
                              <span className="text-sm">Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!isFormValid()}
              className="w-full h-12 text-lg bg-gray-900 hover:bg-gray-800 text-white"
              size="lg"
            >
              Continue to Ad Sets Preview
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
