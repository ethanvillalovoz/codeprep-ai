import { useCallback, useEffect, useState } from "react"
import { MCQChallenge } from "../challenge/MCQChallenge.jsx"
import { useApi } from "../utils/api.js"

// HistoryPanel displays the user's past coding challenges
export function HistoryPanel() {
  // State to store the list of challenges in history
  const [history, setHistory] = useState([])
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true)
  // State to store any error messages
  const [error, setError] = useState(null)
  // Custom API hook for making backend requests
  const { makeRequest } = useApi()

  // Fetch the challenge history from the backend
  const fetchHistory = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await makeRequest("my-history")
      setHistory(data.challenges)
    } catch {
      setError("Failed to load history.")
    } finally {
      setIsLoading(false)
    }
  }, [makeRequest])

  // Fetch the user's challenge history when the component mounts
  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  // Show loading state while fetching history
  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading history...</p>
      </div>
    )
  }

  // Show error message if fetching history fails
  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={fetchHistory}>Retry</button>
      </div>
    )
  }

  // Render the list of past challenges or a message if none exist
  return (
    <div className="history-panel">
      <h2>Challenge History</h2>
      {history.length === 0 ? (
        <p>No challenge history available</p>
      ) : (
        <div className="history-list">
          {history.map((challenge) => (
            <MCQChallenge
              key={challenge.id}
              challenge={challenge}
              showExplanation
            />
          ))}
        </div>
      )}
    </div>
  )
}
