"use client"

import type React from "react"
import { Suspense, useState, useEffect } from "react"
import { Inter } from "next/font/google"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [showLoading, setShowLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if this is the first visit in this session
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading")
    if (hasSeenLoading) {
      setShowLoading(false)
    }
  }, [])

  const handleLoadingComplete = () => {
    setShowLoading(false)
    sessionStorage.setItem("hasSeenLoading", "true")
  }

  // Don't render anything on server side to avoid hydration mismatch
  if (!isClient) {
    return <div className="min-h-screen bg-white"></div>
  }

  return (
    <div className={`dark ${inter.variable} font-sans antialiased`}>
      {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <div className={`transition-opacity duration-500 ${showLoading ? "opacity-0" : "opacity-100"}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </div>
    </div>
  )
}
