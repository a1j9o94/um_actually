import React from 'react';

const HowToPlay: React.FC = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 space-y-6 text-gray-800">
      <p className="text-xl font-semibold mb-4">
        Welcome to &quot;Not quite...&quot;! Here&apos;s how to play:
      </p>
      <ol className="space-y-4">
        {[
          "Choose a topic you're interested in or select from popular quizzes.",
          "Read the statement presented to you carefully.",
          "The statement is almost true, but contains a small mistake.",
          "Your goal is to identify and correct the mistake in the statement.",
          "Select the option that correctly fixes the mistake.",
          "Score points for each correct identification and correction.",
          "Try to get through as many statements as you can to improve your score!",
        ].map((step, index) => (
          <li key={index} className="flex items-start">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3">
              {index + 1}
            </span>
            <span className="text-lg">{step}</span>
          </li>
        ))}
      </ol>
      <p className="mt-6 text-lg font-medium text-blue-600">
        Remember, the key is to pay attention to details and use your knowledge of the topic. Good luck and have fun!
      </p>
    </div>
  );
};

export default HowToPlay;
