"use client"

import { useEffect } from "react"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    console.log("[v0] SplashScreen component mounted")

    // Fallback timer in case video doesn't load or complete
    const fallbackTimer = setTimeout(() => {
      console.log("[v0] Fallback timer triggered, completing splash")
      onComplete()
    }, 4000) // 4 seconds fallback

    return () => clearTimeout(fallbackTimer)
  }, [onComplete])

  const handleVideoEnd = () => {
    console.log("[v0] Video ended, completing splash")
    onComplete()
  }

  const handleVideoLoad = () => {
    console.log("[v0] Video loaded successfully")
  }

  const handleVideoError = (e: any) => {
    console.log("[v0] Video error:", e)
    // If video fails to load, complete after 2 seconds
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <video
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
        onLoadedData={handleVideoLoad}
        onError={handleVideoError}
        className="w-full h-full object-cover"
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover'
        }}
      >
        <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-2-%5Bremix%5D%20%281%29-7bdjCfWiZF5DGWka7GxveEaJAS22wr.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
}
