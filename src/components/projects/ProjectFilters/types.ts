import type { ProjectStatus } from '../../../lib/types/project'
import type { TradeType } from '../../../lib/utils/filters'

export type FilterState = {
  status?: ProjectStatus
  tradeType?: TradeType
  location?: string
  minBudget?: number
  maxBudget?: number
}