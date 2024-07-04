import type { Quiz, Question } from "./generate_question"
import { supabase } from "./supabase"

export async function getQuizRecommendations(): Promise<Quiz[]> {
  //get the 5 quizes with the highest play count. If there are more than 5, get 5 random quizes
  //if there are less than 5, get all the quizes
  //if there are 5, get 5 random quizes
  //return the quizes

  const { data, error } = await supabase.from("quizzes").select("*").order("number_of_plays", { ascending: false }).limit(5)
  if (error) {
    throw error
  }
  return data
}