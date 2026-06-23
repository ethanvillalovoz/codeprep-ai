import ClerkProviderWithRoutes from "./auth/ClerkProviderWithRoutes.jsx"
import { Routes, Route } from "react-router-dom"
import { Layout } from "./layout/Layout.jsx"
import { ChallengeGenerator } from "./challenge/ChallengeGenerator.jsx"
import { HistoryPanel } from "./history/HistoryPanel.jsx"
import { AuthenticationPage } from "./auth/AuthenticationPage.jsx"
import "./App.css"

// App is the root component that sets up routing and authentication providers
function App() {
  return (
    // Wrap the app with ClerkProvider for authentication and BrowserRouter for routing
    <ClerkProviderWithRoutes>
      <Routes>
        {/* Route for the sign-in page */}
        <Route path="/sign-in/*" element={<AuthenticationPage />} />
        {/* Route for the sign-up page */}
        <Route path="/sign-up" element={<AuthenticationPage />} />
        {/* Protected routes wrapped in the main Layout */}
        <Route element={<Layout />}>
          {/* Main challenge generator page */}
          <Route path="/" element={<ChallengeGenerator />} />
          {/* Challenge history page */}
          <Route path="/history" element={<HistoryPanel />} />
        </Route>
      </Routes>
    </ClerkProviderWithRoutes>
  )
}

export default App
