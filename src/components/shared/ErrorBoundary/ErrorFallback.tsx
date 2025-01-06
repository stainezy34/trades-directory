import { AlertTriangle, RefreshCw } from 'lucide-react'

type Props = {
  error: Error | null
}

export function ErrorFallback({ error }: Props) {
  const handleRetry = () => {
    window.location.reload()
  }

  return (
    <div className="p-6 bg-red-50 rounded-lg">
      <div className="flex items-center gap-2 text-red-600 mb-2">
        <AlertTriangle className="w-5 h-5" />
        <h2 className="font-semibold">Something went wrong</h2>
      </div>
      <p className="text-red-700 mb-4">{error?.message}</p>
      <button
        onClick={handleRetry}
        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg
                 hover:bg-red-700 transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Try Again
      </button>
    </div>
  )
}