import type { Quiz, Question } from "./generate_question"
import { supabase } from "./supabase"

export async function getQuizRecommendations(): Promise<Quiz[]> {
  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .order("number_of_plays", { ascending: false })
    .limit(5)

  if (error) {
    console.error("Error fetching quiz recommendations:", error)
    throw error
  }

  if (!data) {
    return []
  }

  // Parse the questions and ensure the correct structure
  const parsedQuizzes: Quiz[] = data.map(quiz => ({
    ...quiz,
    questions: JSON.parse(quiz.questions as unknown as string) as Question[]
  }))

  // If we have more than 5 quizzes, randomly select 5
  if (parsedQuizzes.length > 5) {
    const shuffled = parsedQuizzes.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 5)
  }

  return parsedQuizzes
}