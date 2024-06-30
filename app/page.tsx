import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-6xl font-bold mb-8 text-center">Welcome to the Almost True Game!</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Test your knowledge and critical thinking skills with our unique trivia game. 
        Can you spot what&apos;s wrong in almost true statements?
      </p>
      <Link href="/topic" className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full text-xl hover:bg-blue-100 transition duration-300">
        Start a New Game
      </Link>
    </main>
  )
}