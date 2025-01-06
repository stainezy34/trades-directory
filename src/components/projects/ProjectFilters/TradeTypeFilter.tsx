import { TRADE_TYPES } from '../../../lib/utils/filters'
import type { TradeType } from '../../../lib/utils/filters'

type Props = {
  value?: TradeType
  onChange: (type: TradeType | undefined) => void
}

export function TradeTypeFilter({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Trade Type
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value as TradeType || undefined)}
        className="w-full rounded-lg border-gray-300"
      >
        <option value="">All Trades</option>
        {TRADE_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}