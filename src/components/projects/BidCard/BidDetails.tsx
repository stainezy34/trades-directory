import { DollarSign, Clock, FileText } from 'lucide-react'

type Props = {
  amount: number
  estimatedDuration: string
  proposal: string
}

export function BidDetails({ amount, estimatedDuration, proposal }: Props) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Bid Amount</p>
            <p className="font-medium">${amount.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="text-sm text-gray-600">Estimated Duration</p>
            <p className="font-medium">{estimatedDuration}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-gray-400" />
          <h4 className="font-medium">Proposal</h4>
        </div>
        <p className="text-gray-600">{proposal}</p>
      </div>
    </div>
  )
}