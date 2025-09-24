import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientWrapper from "./client-wrapper"
import AuthSessionProvider from "@/components/session-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "TEadifyz.ai - Digital Ads Automation Platform",
  description: "AI-powered digital advertising automation for META, Google, and LinkedIn campaigns",
  generator: "TEadifyz.ai",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased">
        <AuthSessionProvider>
          <ClientWrapper>
            <Suspense fallback={null}>{children}</Suspense>
          </ClientWrapper>
        </AuthSessionProvider>
      </body>
    </html>
  )
}
