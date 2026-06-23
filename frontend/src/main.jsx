import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"

// Entry point for the React application
// Renders the App component inside the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* StrictMode helps highlight potential problems in an application */}
    <App />
  </StrictMode>,
)
