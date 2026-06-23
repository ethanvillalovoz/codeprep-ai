import { ClerkProvider } from "@clerk/clerk-react"
import { BrowserRouter } from "react-router-dom"

// Import your Publishable Key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// Throw an error if the Clerk publishable key is missing
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY")
}

// Wraps the app with ClerkProvider for authentication and BrowserRouter for routing
export default function ClerkProviderWithRoutes({ children }) {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ClerkProvider>
  )
}
