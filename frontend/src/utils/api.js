import { useAuth } from "@clerk/clerk-react"
import { useCallback } from "react"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000"

// useApi is a custom hook for making authenticated API requests to the backend
export const useApi = () => {
  // Get the getToken function from Clerk authentication
  const { getToken } = useAuth()

  // makeRequest sends a request to the specified API endpoint with authentication
  const makeRequest = useCallback(async (endpoint, options = {}) => {
    // Retrieve the user's authentication token
    const token = await getToken()
    // Set default headers including the auth token
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    // Send the HTTP request to the backend API
    const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
      ...options,
      headers,
    })

    // Handle non-OK responses and throw errors as needed
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      if (response.status === 429) {
        throw new Error("Daily quota exceeded")
      }
      throw new Error(errorData?.detail || "An error occurred")
    }

    // Return the parsed JSON response
    return response.json()
  }, [getToken])

  // Return the makeRequest function for use in components
  return { makeRequest }
}
