'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

interface AnimatedTextProps {
  quizzes: Array<{ presentation_topic: string; topic: string }>
}

export default function AnimatedText({ quizzes }: AnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quizzes.length)
        setIsTransitioning(false)
      }, 500)
    }, 3000)

    return () => clearInterval(interval)
  }, [quizzes.length])

  return (
    <span>
      Test your obsession of{' '}
      <Link href={`/game?topic=${quizzes[currentIndex].topic}`} className="hover:underline">
        <span className={`font-bold inline-block transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
          {quizzes[currentIndex].presentation_topic}
        </span>
      </Link>
    </span>
  )
}
