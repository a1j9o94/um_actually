import React, { useState, useEffect} from 'react'
import QuestionElement from './QuestionElement'
import { Question } from '@/lib/generate_question'
import OutcomeElement from './OutcomeElement'
import Image from 'next/image'
import Link from 'next/link'

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
  const [shuffledOptions, setShuffledOptions] = useState<string[][]>([])

  useEffect(() => {
    const shuffled = questions.map(question => {
      const allOptions = [question.correctStatement, ...question.alternatives]
      return allOptions.sort(() => Math.random() - 0.5)
    })
    setShuffledOptions(shuffled)
  }, [questions])

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
        <Link href="https://ko-fi.com/X8X3105D4P" target="_blank" rel="noopener noreferrer" className="inline-block my-4">
          <Image
            src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
            alt="Buy Me a Coffee at ko-fi.com"
            width={136}
            height={36}
          />
        </Link>
        <div>
          <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300">
            Play Again
          </Link>
        </div>
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
        shuffledOptions={shuffledOptions[currentQuestionIndex] || []}
      />
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
      {showExplanation && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-2 text-gray-800">Explanation:</h3>
          <p className="text-gray-800">{questions[currentQuestionIndex].explanation}</p>
          <h3 className="text-xl font-bold mt-4 mb-2 text-gray-800">Scratch Work:</h3>
          <p className="text-gray-800">{questions[currentQuestionIndex].scratch}</p>
        </div>
      )}
    </div>
  )
}