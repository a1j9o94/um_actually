import { getQuizRecommendations } from '../lib/get_quiz_recommendations'
import ClientHome from '../components/ClientHome'

// Add this export to disable caching
export const revalidate = 0

export default async function Home() {
  const quizzes = await getQuizRecommendations()

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-center">Not quite...</h1>
        <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
          These statements about your favorite topic are almost true, but not quite... Can you find the mistakes?
        </p>
        <ClientHome quizzes={quizzes} />
      </div>
    </main>
  )
}
