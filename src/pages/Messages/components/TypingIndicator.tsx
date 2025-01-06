import { memo } from 'react'

export const TypingIndicator = memo(function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 text-gray-500 text-sm">
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
    </div>
  )
})