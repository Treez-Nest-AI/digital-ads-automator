"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"email" | "otp" | "newPassword" | "success">("email")
  const [otpError, setOtpError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const router = useRouter()

  const [generatedOtp, setGeneratedOtp] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Generate a random 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)

    // Simulate sending OTP
    setTimeout(() => {
      setIsLoading(false)
      setStep("otp")
      // In real implementation, this would be sent via SMS/Email
      console.log(`[v0] Generated OTP: ${newOtp}`) // For testing purposes
    }, 2000)
  }

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setOtpError("")

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      if (otp === generatedOtp) {
        setStep("newPassword")
      } else {
        setOtpError("Invalid OTP. Please try again.")
      }
    }, 1000)
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setPasswordError("")

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      setIsLoading(false)
      return
    }

    // Simulate password update
    setTimeout(() => {
      setIsLoading(false)
      setStep("success")
    }, 2000)
  }

  const resendOtp = () => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    setOtpError("")
    console.log(`[v0] New OTP: ${newOtp}`) // For testing purposes
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl text-gray-900">Password Reset Successful</CardTitle>
              <CardDescription className="text-gray-600">Your password has been successfully updated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => router.push("/auth/signin")}
              >
                Continue to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "newPassword") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            className="mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setStep("otp")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to OTP
          </Button>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Set New Password</CardTitle>
              <CardDescription className="text-gray-600">Enter your new password below</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-700">
                    New Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 pr-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                    {passwordError}
                  </div>
                )}

                <div className="text-xs text-gray-600">Password must be at least 8 characters long</div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={isLoading || !newPassword || !confirmPassword}
                >
                  {isLoading ? "Updating Password..." : "Update Password"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "otp") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button
            variant="ghost"
            className="mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setStep("email")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Email
          </Button>

          <Card className="bg-white border border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Enter OTP</CardTitle>
              <CardDescription className="text-gray-600">We've sent a 6-digit code to {email}</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-gray-700">
                    6-Digit Code
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="text-center text-2xl tracking-widest h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    maxLength={6}
                    required
                  />
                </div>

                {otpError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">{otpError}</div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
              </form>

              <div className="text-center text-sm text-gray-600 mt-4">
                Didn't receive the code?{" "}
                <button onClick={resendOtp} className="text-blue-600 hover:underline">
                  Resend OTP
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => router.push("/auth/signin")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Sign In
        </Button>

        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Reset Your Password</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your email address and we'll send you an OTP to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white"
                disabled={isLoading || !email}
              >
                {isLoading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{" "}
              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
