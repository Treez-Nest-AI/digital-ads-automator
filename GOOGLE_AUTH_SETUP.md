# Google Authentication Setup

To enable Google sign-in functionality, you need to set up Google OAuth credentials and environment variables.

## Step 1: Create Google OAuth Credentials

1. Go to the [Google Cloud Console](https://console.developers.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "Credentials"
4. Click on "Create Credentials" and choose "OAuth 2.0 Client IDs"
5. Set the application type to "Web application"
6. Add the following URIs to the "Authorized redirect URIs" section:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
7. After creating the credentials, note down the `Client ID` and `Client Secret`

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-replace-with-random-string

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

Replace the placeholder values with your actual credentials:
- `your-google-client-id-here` - Your Google OAuth Client ID
- `your-google-client-secret-here` - Your Google OAuth Client Secret
- `your-secret-key-here-replace-with-random-string` - A random string for NextAuth (you can generate one using: `openssl rand -base64 32`)

## Step 3: Restart Your Development Server

After setting up the environment variables, restart your development server:

```bash
npm run dev
# or
pnpm dev
```

## Step 4: Test Google Sign-In

1. Navigate to `http://localhost:3000/auth/signin`
2. Click on "Continue with Google"
3. You should be redirected to Google's authentication page
4. After successful authentication, you'll be redirected to the onboarding page

## Troubleshooting

- Make sure the redirect URI in Google Cloud Console exactly matches `http://localhost:3000/api/auth/callback/google`
- Ensure all environment variables are correctly set in `.env.local`
- Check the browser console for any error messages
- Verify that the Google OAuth consent screen is properly configured
