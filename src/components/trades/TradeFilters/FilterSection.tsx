import { memo } from 'react'

type Props = {
  title: string
  children: React.ReactNode
}

export const FilterSection = memo(function FilterSection({ title, children }: Props) {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium text-gray-700 mb-2">{title}</h3>
      {children}
    </div>
  )
})