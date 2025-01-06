import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'

export const ProjectSearch = memo(function ProjectSearch() {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const query = formData.get('query')?.toString() || ''
    navigate(`/projects?search=${encodeURIComponent(query)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          name="query"
          placeholder="Search projects..."
          className="w-full px-4 py-3 pl-12 text-lg rounded-lg border-2 border-gray-200 
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-1.5 
                   bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </form>
  )
})