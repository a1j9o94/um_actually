import Link from 'next/link'
import { getQuizRecommendations } from '../lib/get_quiz_recommendations'
import AnimatedText from '../components/AnimatedText'

// Add this export to disable caching
export const revalidate = 0

export default async function Home() {
  const quizzes = await getQuizRecommendations()
  console.log(quizzes)

  return (
    <main className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl sm:text-6xl font-bold mb-8 text-center">Not quite...</h1>
        <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
          <AnimatedText quizzes={quizzes} />
        </p>
        <p className="text-xl mb-12 text-center max-w-2xl mx-auto">
          These statements about your favorite topic are almost true, but not quite... Can you find the mistakes?
        </p>
        <div className="text-center mb-16">
          <Link href="/topic" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full text-xl hover:bg-blue-100 transition duration-300 inline-block">
            Start a New Game
          </Link>
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
      </div>
    </main>
  )
}