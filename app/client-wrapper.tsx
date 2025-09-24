"use client"

import { useState } from "react"
import type React from "react"
import SplashScreen from "@/components/splash-screen"

interface ClientWrapperProps {
  children: React.ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  const [showSplash, setShowSplash] = useState(true)

  console.log("[v0] ClientWrapper rendered, showSplash:", showSplash)

  const handleSplashComplete = () => {
    console.log("[v0] Splash complete, hiding splash screen")
    setShowSplash(false)
  }

  if (showSplash) {
    console.log("[v0] Rendering splash screen")
    return <SplashScreen onComplete={handleSplashComplete} />
  }

  console.log("[v0] Rendering main content")
  return <>{children}</>
}
