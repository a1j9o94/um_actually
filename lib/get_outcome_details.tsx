import React from 'react';

interface OutcomeDetails {
    message: string;
    description: string;
    svg: React.ReactNode;
}

export default function getOutcomeDetails(score: number, questions: number): OutcomeDetails {
    const percentage = (score / questions) * 100
    let outcome: OutcomeDetails = {
        message: "",
        description: "",
        svg: <></>
    }
    
    if (percentage >= 80) {
      outcome = {
        message: "You're great!",
        description: "You're a master of almost true facts!",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#4CAF50" />
            <path d="M70 35 L45 65 L30 50" stroke="white" strokeWidth="8" fill="none" />
            <circle cx="30" cy="30" r="5" fill="white" />
            <circle cx="70" cy="30" r="5" fill="white" />
            <path d="M30 70 Q50 80 70 70" stroke="white" strokeWidth="4" fill="none" />
          </svg>
        )
      }
    } else if (percentage >= 50) {
      outcome = {
        message: "You're okay.",
        description: "Not bad, but there's room for improvement!",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#FFC107" />
            <circle cx="30" cy="40" r="5" fill="white" />
            <circle cx="70" cy="40" r="5" fill="white" />
            <path d="M30 70 Q50 65 70 70" stroke="white" strokeWidth="4" fill="none" />
          </svg>
        )
      }
    } else {
      outcome = {
        message: "Terrible!",
        description: "Well... at least you learned some new facts?",
        svg: (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-40 h-40 mx-auto mb-4">
            <circle cx="50" cy="50" r="45" fill="#F44336" />
            <circle cx="30" cy="40" r="5" fill="white" />
            <circle cx="70" cy="40" r="5" fill="white" />
            <path d="M30 70 Q50 60 70 70" stroke="white" strokeWidth="4" fill="none" />
            <path d="M25 25 L40 40 M40 25 L25 40" stroke="white" strokeWidth="4" />
            <path d="M75 25 L60 40 M60 25 L75 40" stroke="white" strokeWidth="4" />
          </svg>
        )
      }
    }
    return outcome;
}