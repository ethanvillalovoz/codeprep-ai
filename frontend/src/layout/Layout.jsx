import { SignedOut, UserButton, SignedIn } from "@clerk/clerk-react"
import { Outlet, Link, Navigate } from "react-router-dom"

// Layout component defines the main structure and navigation for the app
export function Layout() {
  return (
    <div className="app-layout">
      {/* App header with title and navigation */}
      <header className="app-header">
        <div className="header-content">
          <h1>CodePrep.AI</h1>
          <nav>
            {/* Show navigation links and user button only when signed in */}
            <SignedIn>
              <Link to="/">Generate Challenge</Link>
              <Link to="/history">History</Link>
              <UserButton />
            </SignedIn>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main className="app-main">
        {/* Redirect to sign-in page if user is signed out */}
        <SignedOut>
          <Navigate to="/sign-in" replace />
        </SignedOut>
        {/* Render child routes if user is signed in */}
        <SignedIn>
          <Outlet />
        </SignedIn>
      </main>
    </div>
  )
}
