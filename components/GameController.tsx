import React, { useState } from 'react'
import QuestionElement from './QuestionElement'
import { Question } from '@/lib/generate_question'
import OutcomeElement from './OutcomeElement'

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

  if (gameOver) {
    return (
      <div className="text-center bg-white shadow-lg rounded-lg p-8">
        <OutcomeElement score={score} questions={questions.length} />
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