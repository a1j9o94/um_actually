import { callLLM, LLMConversation } from "./llm";
import { supabase } from "./supabase";

export type Question = {
    scratch: string;
    incorrectStatement: string;
    explanation: string;
    correctStatement: string;
    alternatives: string[];
}

export type Quiz = {
    topic: string;
    presentation_topic: string;
    questions: Question[];
    number_of_plays: number;
}

export async function generateQuestions(topic: string, count: number = 5): Promise<Quiz> {
    
    const modified_topic = topic.toLowerCase().replace(/\s/g, '').replace(/[^a-zA-Z0-9]/g, '');

    // First, check if we have questions for this topic in the database
    const { data: existingQuiz, error } = await supabase
        .from('quizzes')
        .select('*')
        .eq('topic', modified_topic)
        .single();

    if (error && error.code !== 'PGRST116') {
        console.error('Error fetching from database:', error);
    }

    if (existingQuiz) {
        console.log('Found existing quiz for topic:', topic);
        console.log("existingQuiz", existingQuiz);

        //increment the number of plays
        const { data: updatedQuiz, error: updateError } = await supabase
            .from('quizzes')
            .update({ number_of_plays: existingQuiz.number_of_plays + 1 })
            .eq('topic', modified_topic)
            .select()
            .single();

        //check for an error
        if (updateError) {
            console.error('Error updating quiz in database:', updateError);
        }

        return updatedQuiz;
    }

    console.log('Generating new questions for topic:', topic);

    // If no existing quiz, generate new questions
    const system = `You are a researcher for a quiz game show like Um actually from Dropout. You are given a topic and asked to generate a list of "almost true but wrong" statements about the topic. You try to be tricky but always technically correct. It should be the kind of pedantic things that will make people roll their eyes, but admit is right after.
       
    You should approach the statement the same way the editor of the NYT crossword or connections editor does.
    For each statement, provide:
    1. The incorrect statement
    2. What's wrong with the statement
    3. The correct version of the statement
    4. Two plausible but incorrect alternative answers to the same statement
    Always format your output as a JSON array of objects with the following format and no other text or preamble:
    [
        {
            "scratch": "Think about what question you would want to ask, how can you be clever and tricky. Explain in detail how someone who is familiar with the series might get tripped up by a question like this and think through some other plausible alternatives a person who is informed may get confused by.",
            "explanation": "The explanation for why the question is incorrect. It should be specific and detailed enough to be clear why the alternatives are wrong and include interesting fun trivia",
            "correctStatement": "The correct version of the statement which will be used as the correct answer for the multipe choices quiz.",
            "alternatives": ["alternatives that are full examples of statements that are incorrect for similar reasons tol the main question this will be used as altrnatives in multiple choice quesitions", "..."] ,
            "incorrectStatement": "the main incorrect statement that the player needs to correct. Consider everything you've thought of so far"
        },
        {
            //next question
        }
    ]
    `
    
    const first_message = `Generate ${count} "almost true but wrong" statements about ${topic}. `;
  
    const conversation: LLMConversation = {
        system: system,
        messages: [
          { role: "user", content: first_message }
      ]
    };

    const completion = await callLLM(conversation, 3);
    const questions = JSON.parse(completion) as Question[];
    const quiz: Quiz = { topic: modified_topic, presentation_topic: topic, questions, number_of_plays: 1 };

    const supabase_object = {
        topic: quiz.topic,
        presentation_topic: quiz.presentation_topic,
        questions: JSON.stringify(quiz.questions), // Store questions as a JSON string
        number_of_plays: 1 //initialize number of plays to 1
    };

    console.log("supabase_object", supabase_object);

    // Store the new quiz in the database
    const { data: newQuiz, error: insertError } = await supabase
        .from('quizzes')
        .insert(supabase_object)
        .select()
        .single();



    if (insertError) {
        console.error('Error inserting new quiz into database:', insertError);
        // If insert fails due to duplicate, try to fetch the existing quiz
        if (insertError.code === '23505') { // Unique constraint violation
            const { data: existingQuiz, error: fetchError } = await supabase
                .from('quizzes')
                .select('*')
                .eq('topic', modified_topic)
                .single();
            
            if (fetchError) {
                console.error('Error fetching existing quiz:', fetchError);
                throw fetchError;
            }
            return existingQuiz;
        }
        throw insertError;
    } else {
        console.log('Successfully stored new quiz in database');
    }
    return newQuiz; // Return the quiz object, not json_object
}