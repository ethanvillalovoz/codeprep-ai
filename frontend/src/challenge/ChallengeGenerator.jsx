import { useCallback, useEffect, useState } from "react"
import { MCQChallenge } from "./MCQChallenge.jsx"
import { useApi } from "../utils/api.js"

// ChallengeGenerator is the main component for generating and displaying coding challenges
export function ChallengeGenerator() {
  // State for the current challenge, loading status, and error messages
  const [challenge, setChallenge] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Custom API hook for making backend requests
  const { makeRequest } = useApi()
  // State for selected difficulty and user quota
  const [difficulty, setDifficulty] = useState("easy")
  const [quota, setQuota] = useState(null)

  // Fetch the current quota from the backend
  const fetchQuota = useCallback(async () => {
    try {
      const data = await makeRequest("quota")
      setQuota(data)
    } catch (err) {
      setError(err.message || "Failed to load quota")
    }
  }, [makeRequest])

  // Fetch the user's quota when the component mounts
  useEffect(() => {
    fetchQuota()
  }, [fetchQuota])

  // Generate a new challenge based on the selected difficulty
  const generateChallenge = async () => {
    setIsLoading(true)
    setError(null)
    setChallenge(null)
    try {
      const data = await makeRequest("generate-challenge", {
        method: "POST",
        body: JSON.stringify({ difficulty }),
      })
      setChallenge(data)
      fetchQuota()
    } catch (err) {
      setError(err.message || "Failed to generate challenge")
    } finally {
      setIsLoading(false)
    }
  }

  // Calculate the next quota reset time (24 hours after last reset)
  const getNextResetTime = () => {
    if (!quota?.last_reset_date) return null
    const resetDate = new Date(quota.last_reset_date)
    resetDate.setHours(resetDate.getHours() + 24)
    return resetDate
  }

  // Quota progress bar calculation
  const quotaMax = 50
  const quotaUsed = quotaMax - (quota?.quota_remaining || 0)
  const quotaPercent = Math.min(100, Math.round((quotaUsed / quotaMax) * 100))

  return (
    <div className="challenge-container">
      {/* Page title */}
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>AI Interview Practice</h2>
      {/* Quota display and progress bar */}
      <div className="quota-display">
        <p>Challenges remaining today: {quota?.quota_remaining || 0}</p>
        <div className="quota-progress">
          <div className="quota-progress-bar" style={{ width: `${100 - quotaPercent}%` }}></div>
        </div>
        {quota?.quota_remaining === 0 && (
          <p>Next reset: {getNextResetTime()?.toLocaleString()}</p>
        )}
      </div>
      {/* Difficulty selector */}
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Select Difficulty:</label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={isLoading}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      {/* Generate challenge button */}
      <button
        onClick={generateChallenge}
        disabled={isLoading || quota?.quota_remaining === 0}
        className="generate-button"
      >
        {isLoading ? "Generating..." : "Generate Challenge"}
      </button>
      {/* Error message display */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}
      {/* Loading skeleton while generating */}
      {isLoading && (
        <div className="challenge-card skeleton" style={{ height: 200, marginTop: 32 }}></div>
      )}
      {/* Render the challenge if available */}
      {challenge && (
        <MCQChallenge challenge={challenge} />
      )}
    </div>
  )
}
