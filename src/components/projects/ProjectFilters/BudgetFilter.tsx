type Props = {
  minBudget?: number
  maxBudget?: number
  onChange: (budget: { minBudget?: number; maxBudget?: number }) => void
}

export function BudgetFilter({ minBudget, maxBudget, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Budget Range
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={minBudget || ''}
            onChange={(e) => onChange({ 
              minBudget: e.target.value ? Number(e.target.value) : undefined,
              maxBudget 
            })}
            placeholder="Min"
            className="w-full pl-8 rounded-lg border-gray-300"
          />
        </div>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={maxBudget || ''}
            onChange={(e) => onChange({ 
              minBudget,
              maxBudget: e.target.value ? Number(e.target.value) : undefined 
            })}
            placeholder="Max"
            className="w-full pl-8 rounded-lg border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}