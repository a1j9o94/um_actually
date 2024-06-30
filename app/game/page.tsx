// app/game/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import GameController from '@/components/GameController'
import { Quiz, Question } from '@/lib/generate_question'

export default function GamePage() {
  const searchParams = useSearchParams()
  const topic = searchParams.get('topic')
  const [quiz, setQuiz] = useState<Quiz>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (topic) {
      fetchQuestions(topic)
    }
  }, [topic])

  const fetchQuestions: (topic: string) => Promise<void> = async (topic: string) => {
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch questions')
      }

      const data = await response.json()

      console.log('Data:', data);
      const quiz: Quiz = {
        questions: data.quiz,
        topic: topic
      }

      setQuiz(quiz)
      console.log('Quiz object after setting:', quiz);
      setLoading(false)
    } catch (err) {
      setError('Failed to load questions. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-2xl font-bold text-gray-600">Loading questions...</div>
    </div>
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-2xl font-bold text-red-600">{error}</div>
    </div>
  }

  console.log('Quiz object:', quiz);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Game: {topic}</h1>
        {quiz && quiz.questions.length > 0 ? (
          <GameController questions={quiz.questions} />
        ) : (
          <div className="text-center text-2xl text-gray-600">No questions available. Please try a different topic.</div>
        )}
      </div>
    </div>
  )
}