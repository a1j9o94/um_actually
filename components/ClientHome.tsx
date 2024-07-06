'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import HowToPlay from './HowToPlay'
import AnimatedText from './AnimatedText'

interface Quiz {
  topic: string
  presentation_topic: string
  questions: { incorrectStatement: string }[]
  number_of_plays: number
}

interface ClientHomeProps {
  quizzes: Quiz[]
}

export default function ClientHome({ quizzes }: ClientHomeProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false)

  return (
    <>
      {showHowToPlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1 rounded-lg shadow-lg max-w-2xl w-full">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">How to Play</h2>
              <HowToPlay />
              <button
                className="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-xl hover:bg-blue-700 transition duration-300 w-full"
                onClick={() => setShowHowToPlay(false)}
              >
                Got it, let&apos;s play!
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-center mb-16">
        <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
          <AnimatedText quizzes={quizzes} />
        </p>
        <div className="space-x-4">
          <Link href="/topic" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full text-xl hover:bg-blue-100 transition duration-300 inline-block">
            Pick a new topic
          </Link>
          <button
            onClick={() => setShowHowToPlay(true)}
            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-xl hover:bg-blue-700 transition duration-300 inline-block"
          >
            How to Play
          </button>
        </div>
      </div>
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Quizzes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <Link key={quiz.topic} href={`/game?topic=${quiz.topic}`} className="block">
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg hover:scale-105">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{quiz.presentation_topic}</h3>
                <p className="text-gray-600 mb-4">
                  {quiz.questions && quiz.questions.length > 0 && quiz.questions[0].incorrectStatement
                    ? quiz.questions[0].incorrectStatement.length > 100 
                      ? quiz.questions[0].incorrectStatement.substring(0, 100) + '...'
                      : quiz.questions[0].incorrectStatement
                    : 'No preview available'}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{quiz.number_of_plays ?? 0} plays</span>
                  <span className="text-blue-600 font-medium">Play Now</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
