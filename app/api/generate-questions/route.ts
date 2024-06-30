import { NextResponse } from 'next/server'
import { generateQuestions} from '@/lib/generate_question'

export async function POST(request: Request) {
  const { topic } = await request.json()

  if (!topic) {
    return NextResponse.json({ error: 'Topic is required' }, { status: 400 })
  }

  try {
    const quiz = await generateQuestions(topic)
    return NextResponse.json({ quiz })
  } catch (error) {
    console.error('Error generating questions:', error)
    return NextResponse.json({ error: 'Failed to generate questions' }, { status: 500 })
  }
}