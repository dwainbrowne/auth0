/// <summary>
/// Auth0 plugin for Nuxt 3 to handle login, logout, token retrieval, and session state
/// </summary>

import { createAuth0Client, Auth0Client, User } from '@auth0/auth0-spa-js'

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig().public

  /// Create the Auth0 client using the provided domain and client ID
  const auth0Client: Auth0Client = await createAuth0Client({
    domain: config.auth0Domain,
    clientId: config.auth0ClientId,
    authorizationParams: {
      redirect_uri: window.location.origin + '/callback',
      audience: config.auth0Audience, // Optional, needed for access tokens
      scope: 'openid profile email' // Add any other scopes as needed
    }
  })

  /// Check if the user is authenticated
  const isAuthenticated: boolean = await auth0Client.isAuthenticated()

  /// Get the authenticated user's profile if available
  const user: User | undefined = isAuthenticated ? await auth0Client.getUser() : undefined

  /// Initiates login redirect to Auth0
  const login = async () => {
    await auth0Client.loginWithRedirect()
  }

  /// Logs the user out and redirects them to the homepage
  const logout = () => {
    auth0Client.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    })
  }

  /// Retrieves the JWT (ID Token or Access Token)
  const getToken = async (): Promise<string | null> => {
    try {
      // For Access Token (API requests)
      const token: string = await auth0Client.getTokenSilently()
      return token
    } catch (error: any) {
      if (error?.error === 'login_required' || (error?.message && error.message.toLowerCase().includes('login required'))) {
        console.warn('Login is required to get token.')
      } else {
        console.error('Failed to get token:', error)
      }
      return null
    }
  }

  // Provide Auth0 functionality to the app
  return {
    provide: {
      auth0: {
        login,
        logout,
        isAuthenticated,
        user,
        getToken
      }
    }
  }
})
