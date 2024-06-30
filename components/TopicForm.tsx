'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TopicForm() {
  const [topic, setTopic] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (topic.trim()) {
      router.push(`/game?topic=${encodeURIComponent(topic)}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <label htmlFor="topic" className="block text-lg font-medium text-gray-100 mb-2">
          Enter a topic
        </label>
        <input
          type="text"
          id="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-gray-900 py-2 px-3"
          placeholder="e.g., Star Wars, Climate Change, Ancient Egypt"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
      >
        Start Game
      </button>
    </form>
  )
}