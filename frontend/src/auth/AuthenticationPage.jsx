import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react"
import { Navigate, useLocation } from "react-router-dom"

// AuthenticationPage handles user sign-in and sign-up using Clerk
export function AuthenticationPage() {
  const location = useLocation()
  const isSignUp = location.pathname.startsWith("/sign-up")

  return (
    <div className="auth-container">
      {/* Show sign-in and sign-up forms if the user is signed out */}
      <SignedOut>
        {isSignUp ? (
          <SignUp path="/sign-up" routing="path" />
        ) : (
          <SignIn path="/sign-in" routing="path" />
        )}
      </SignedOut>
      {/* Show a message if the user is already signed in */}
      <SignedIn>
        <Navigate to="/" replace />
      </SignedIn>
    </div>
  )
}
