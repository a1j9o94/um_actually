import getOutcomeDetails from "@/lib/get_outcome_details";

export default function OutcomeElement({ score, questions }: { score: number, questions: number }) {
    const { message, description, svg } = getOutcomeDetails(score, questions)
    return (
        <div className="text-center bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-4xl font-bold mb-6 text-gray-800">{message}</h2>
            {svg}
            <p className="text-3xl font-bold mb-2 text-gray-800">{message}</p>
            <p className="text-xl mb-6 text-gray-600">{description}</p>
            <p className="text-2xl mb-6 text-gray-700">Your score: {score} out of {questions}</p>
        </div>
    )
}