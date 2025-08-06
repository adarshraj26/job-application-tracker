# OAuth Setup Guide

This guide explains how to set up OAuth authentication for Google and GitHub in your JobTracker application.

## Environment Variables

Add the following environment variables to your `.env` file:

```env
# Google OAuth
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
REACT_APP_GITHUB_CLIENT_SECRET=your_github_client_secret
```

## Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/auth/google/callback`
6. Copy the Client ID and Client Secret to your environment variables

## GitHub OAuth Setup

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - Application name: JobTracker
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/auth/github/callback`
4. Copy the Client ID and Client Secret to your environment variables

## Backend Implementation

The OAuth flow requires backend endpoints to handle the callback. You'll need to implement:

1. `/auth/google/callback` - Handle Google OAuth callback
2. `/auth/github/callback` - Handle GitHub OAuth callback
3. `/auth/oauth/token` - Exchange authorization code for access token
4. `/auth/oauth/user` - Get user information from OAuth provider

## Current Implementation

The current implementation shows placeholder messages for OAuth integration. To enable full OAuth:

1. Set up the environment variables
2. Implement the backend OAuth endpoints
3. Update the `loginWithGoogle` and `loginWithGitHub` methods in `AuthContext.tsx`
4. Replace the placeholder redirects with actual OAuth flows

## Features Implemented

✅ **Enhanced UI**: Beautiful OAuth buttons with proper icons and animations
✅ **Loading States**: Smooth loading animations during OAuth processes
✅ **Error Handling**: Proper error messages for OAuth failures
✅ **Reusable Component**: `OAuthButtons` component for consistent styling
✅ **Type Safety**: Full TypeScript support for OAuth functionality
✅ **Responsive Design**: Works on all screen sizes

## Next Steps

1. Set up OAuth applications in Google and GitHub
2. Implement backend OAuth endpoints
3. Update the AuthContext with real OAuth flows
4. Test the complete OAuth integration 