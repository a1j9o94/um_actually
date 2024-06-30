import React from 'react'
import { Question } from '@/lib/generate_question'

type QuestionElementProps = {
  question: Question
  onAnswer: (answer: string) => void
  feedback: string | null
  answerSubmitted: boolean
}

export default function QuestionElement({ question, onAnswer, feedback, answerSubmitted }: QuestionElementProps) {
  const allOptions = [question.correctStatement, ...question.alternatives]
  const shuffledOptions = allOptions.sort(() => Math.random() - 0.5)

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
      <p className="text-2xl font-semibold text-gray-800">{question.incorrectStatement}</p>
      <p className="text-xl font-medium text-gray-700">What's wrong with this statement?</p>
      <div className="space-y-3">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => !answerSubmitted && onAnswer(option)}
            className={`w-full p-3 text-left border rounded-lg transition duration-300 text-gray-700 font-medium 
              ${answerSubmitted 
                ? option === question.correctStatement 
                  ? 'bg-green-100' 
                  : 'bg-red-100'
                : 'hover:bg-blue-50'
              }
              ${answerSubmitted ? 'cursor-default' : 'cursor-pointer'}
            `}
            disabled={answerSubmitted}
          >
            {option}
          </button>
        ))}
      </div>
      {feedback && (
        <div className={`mt-4 p-4 rounded-lg ${feedback === 'Correct!' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {feedback}
        </div>
      )}
    </div>
  )
}