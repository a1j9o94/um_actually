import React, { useState } from 'react'
import QuestionElement from './QuestionElement'
import { Question } from '@/lib/generate_question'

type GameControllerProps = {
  questions: Question[]
}

export default function GameController({ questions }: GameControllerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)

  const handleAnswer = (answer: string) => {
    const isCorrect = answer === questions[currentQuestionIndex].correctStatement
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect.')
    setShowExplanation(true)
    setAnswerSubmitted(true)
    
    if (isCorrect) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setFeedback(null)
      setShowExplanation(false)
      setAnswerSubmitted(false)
    } else {
      setGameOver(true)
    }
  }

  const getOutcomeDetails = () => {
    const percentage = (score / questions.length) * 100
    if (percentage >= 80) {
      return {
        message: "You're great!",
        description: "You're a master of almost true facts!",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#4CAF50" />
            <path d="M70 35 L45 65 L30 50" stroke="white" strokeWidth="8" fill="none" />
            <circle cx="30" cy="30" r="5" fill="white" />
            <circle cx="70" cy="30" r="5" fill="white" />
            <path d="M30 70 Q50 80 70 70" stroke="white" strokeWidth="4" fill="none" />
          </svg>
        )
      }
    } else if (percentage >= 50) {
      return {
        message: "You're okay.",
        description: "Not bad, but there's room for improvement!",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#FFC107" />
            <circle cx="30" cy="40" r="5" fill="white" />
            <circle cx="70" cy="40" r="5" fill="white" />
            <path d="M30 70 Q50 65 70 70" stroke="white" strokeWidth="4" fill="none" />
          </svg>
        )
      }
    } else {
      return {
        message: "Terrible!",
        description: "Well... at least you learned some new facts?",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#F44336" />
            <circle cx="30" cy="40" r="5" fill="white" />
            <circle cx="70" cy="40" r="5" fill="white" />
            <path d="M30 70 Q50 60 70 70" stroke="white" strokeWidth="4" fill="none" />
            <path d="M25 25 L40 40 M40 25 L25 40" stroke="white" strokeWidth="4" />
            <path d="M75 25 L60 40 M60 25 L75 40" stroke="white" strokeWidth="4" />
          </svg>
        )
      }
    }
  }

  if (gameOver) {
    const { message, description, svg } = getOutcomeDetails()
    return (
      <div className="text-center bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">Game Over!</h2>
        {svg}
        <p className="text-3xl font-bold mb-2 text-gray-800">{message}</p>
        <p className="text-xl mb-6 text-gray-600">{description}</p>
        <p className="text-2xl mb-6 text-gray-700">Your score: {score} out of {questions.length}</p>
        <button
          onClick={() => window.location.href = '/'}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Play Again
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="font-bold text-xl text-gray-800">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <span className="ml-6 font-bold text-xl text-blue-600">Score: {score}</span>
      </div>
      <QuestionElement
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        feedback={feedback}
        answerSubmitted={answerSubmitted}
      />
      {showExplanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Explanation:</h3>
          <p className="text-gray-800">{questions[currentQuestionIndex].explanation}</p>
          <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800">Scratch Work:</h3>
          <p className="text-gray-800">{questions[currentQuestionIndex].scratch}</p>
        </div>
      )}
      {answerSubmitted && (
        <div className="mt-6 text-center">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}