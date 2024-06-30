import TopicForm from '@/components/TopicForm'

export default function TopicPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-3xl font-bold mb-8">Choose Your Topic</h1>
      <TopicForm />
    </div>
  )
}