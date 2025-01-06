import { Link } from 'react-router-dom'
import { Star, MapPin, Briefcase } from 'lucide-react'
import { Badge } from '../../shared/Badge'
import type { Database } from '../../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  tradesperson: Profile
  matchScore: number
}

export function RecommendedCard({ tradesperson, matchScore }: Props) {
  const matchPercentage = Math.round(matchScore * 100)

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex items-start gap-4">
      <img
        src={tradesperson.avatar_url || 'https://via.placeholder.com/100'}
        alt={tradesperson.full_name}
        className="w-16 h-16 rounded-full object-cover"
      />
      
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{tradesperson.full_name}</h3>
            {tradesperson.business_name && (
              <p className="text-sm text-gray-600">{tradesperson.business_name}</p>
            )}
          </div>
          <Badge variant="success">{matchPercentage}% Match</Badge>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {tradesperson.trade_type.map((trade) => (
            <Badge key={trade} variant="default">{trade}</Badge>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{tradesperson.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{tradesperson.location}</span>
          </div>
          {tradesperson.hourly_rate && (
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>${tradesperson.hourly_rate}/hr</span>
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          <Link
            to={`/profile/${tradesperson.id}`}
            className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg 
                     hover:bg-blue-700 transition-colors"
          >
            View Profile
          </Link>
          <Link
            to={`/messages/${tradesperson.id}`}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg 
                     hover:bg-blue-50 transition-colors"
          >
            Message
          </Link>
        </div>
      </div>
    </div>
  )
}