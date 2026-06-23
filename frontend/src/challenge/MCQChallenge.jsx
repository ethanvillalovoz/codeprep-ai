import { useState } from "react"

// MCQChallenge displays a multiple-choice coding challenge card
export function MCQChallenge({ challenge, showExplanation = false, onCorrect }) {
  // State to track which option the user selected
  const [selectedOption, setSelectedOption] = useState(null)
  // State to control whether the explanation is shown
  const [shouldShowExplanation, setShouldShowExplanation] = useState(showExplanation)
  // State for user rating (thumbs up/down)
  const [rating, setRating] = useState(null)

  // Parse options if they are stored as a JSON string
  const options =
    typeof challenge.options === "string"
      ? JSON.parse(challenge.options)
      : challenge.options

  // Handle when a user selects an option
  const handleOptionSelect = (index) => {
    // Prevent changing answer after selection
    if (selectedOption !== null) {
      return
    }
    setSelectedOption(index)
    setShouldShowExplanation(true)
    // Call onCorrect callback if the correct answer is selected
    if (index === challenge.correct_answer_id && onCorrect) {
      onCorrect()
    }
  }

  const handleOptionKeyDown = (event, index) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      handleOptionSelect(index)
    }
  }

  // Determine the CSS class for each option based on selection and correctness
  const getOptionClass = (index) => {
    if (selectedOption === null) {
      return "option"
    }
    if (index === challenge.correct_answer_id) {
      return "option correct"
    }
    if (index === selectedOption && index !== challenge.correct_answer_id) {
      return "option incorrect"
    }
    return "option"
  }

  return (
    <div className="challenge-card">
      {/* Difficulty badge */}
      <span className={`difficulty-badge ${challenge.difficulty}`}>
        {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
      </span>
      {/* Challenge title */}
      <h3 className="challenge-title">{challenge.title}</h3>
      {/* Render all options */}
      <div className="options">
        {options.map((option, index) => (
          <div
            className={getOptionClass(index)}
            key={index}
            onClick={() => handleOptionSelect(index)}
            onKeyDown={(event) => handleOptionKeyDown(event, index)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedOption === index}
            style={{ outline: "none" }}
          >
            {option}
          </div>
        ))}
      </div>
      {/* Show explanation after an option is selected */}
      {shouldShowExplanation && selectedOption !== null && (
        <div className="explanation">
          <h4>Explanation</h4>
          <p>{challenge.explanation}</p>
        </div>
      )}
      {/* Rating buttons for user feedback */}
      <div className="rating">
        <span>Rate this challenge:</span>
        <button
          aria-label="Thumbs up"
          onClick={() => setRating("up")}
          style={{ color: rating === "up" ? "#43a047" : undefined }}
        >👍</button>
        <button
          aria-label="Thumbs down"
          onClick={() => setRating("down")}
          style={{ color: rating === "down" ? "#e53935" : undefined }}
        >👎</button>
      </div>
    </div>
  )
}
