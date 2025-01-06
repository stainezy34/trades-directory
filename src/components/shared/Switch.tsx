import { memo } from 'react'
import { cn } from '../../lib/utils/cn'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const Switch = memo(function Switch({
  label,
  checked,
  onChange,
  disabled,
  className
}: Props) {
  return (
    <label className={cn("relative inline-flex items-center", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 
                    peer-checked:after:translate-x-full after:content-[''] after:absolute 
                    after:top-[2px] after:left-[2px] after:bg-white after:rounded-full 
                    after:h-5 after:w-5 after:transition-all peer-disabled:opacity-50" />
      <span className="ml-3 text-sm text-gray-700">{label}</span>
    </label>
  )
})