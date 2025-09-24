import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Send user data to your API when Google sign-in is successful
      if (account?.provider === "google" && user) {
        try {
          const userData = {
            id: user.id || profile?.sub,
            email: user.email,
            verified_email: profile?.email_verified || true,
            name: user.name,
            given_name: profile?.given_name || user.name?.split(' ')[0],
            family_name: profile?.family_name || user.name?.split(' ').slice(1).join(' '),
            picture: user.image
          }

          // Send to your API
          const response = await fetch('https://ry0iftnghh.execute-api.ap-southeast-2.amazonaws.com/default/google-signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
          })

          if (!response.ok) {
            console.error('Failed to send user data to API:', response.statusText)
          } else {
            console.log('User data sent to API successfully')
          }
        } catch (error) {
          console.error('Error sending user data to API:', error)
        }
      }
      
      return true
    },
    async redirect({ url, baseUrl }) {
      // Redirect to onboarding after successful sign in
      if (url.startsWith("/")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return `${baseUrl}/onboarding/business-details`
    },
    async session({ session, token }) {
      // You can add custom session data here
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
})

export { handler as GET, handler as POST }
