// app/game/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import GameController from '@/components/GameController'
import { Quiz} from '@/lib/generate_question'
import Link from 'next/link'
import Image from 'next/image'

function GameContent() {
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

  const fetchQuestions = async (topic: string) => {
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic }),
      })
      if (!response.ok) {
        console.error('Failed to fetch questions', response);
        throw new Error('Failed to fetch questions')
      }
      const quizData = await response.json()
      console.log('Quiz data:', quizData);
      // Parse the questions string into an array
      quizData.questions = JSON.parse(quizData.questions);
      setQuiz(quizData)
      setLoading(false)
    } catch (err) {
      console.error('Error fetching or parsing questions:', err);
      setError('Failed to load questions. Please try again.')
      setLoading(false)
    }
  }

  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Image
          src="/loading-spinner.gif"
          alt="Loading..."
          width={100}
          height={100}
          loader={({ src, width }) => `${src}?w=${width}`}
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
        />
        <p className="mt-4 text-xl font-semibold text-gray-600">Loading questions...</p>
      </div>
    )
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
        <Link href="/" className="text-2xl font-bold text-gray-600">Back to home</Link>
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Game: {topic}</h1>
        {quiz && Array.isArray(quiz.questions) && quiz.questions.length > 0 ? ( 
          <GameController questions={quiz.questions} />
        ) : (
          <div className="text-center text-2xl text-gray-600">No questions available. Please try a different topic.</div>
        )}
      </div>
    </div>
  )
}

export default function GamePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GameContent />
    </Suspense>
  )
}