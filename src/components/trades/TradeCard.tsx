import { memo } from 'react'
import { Star, Clock, MapPin, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OptimizedImage } from '../shared/OptimizedImage'
import type { Database } from '../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  tradesperson: Profile
}

export const TradeCard = memo(function TradeCard({ tradesperson }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <OptimizedImage
          src={tradesperson.avatar_url || 'https://via.placeholder.com/100'}
          alt={tradesperson.full_name}
          width={96}
          height={96}
          className="rounded-full"
          loading="lazy"
          sizes="96px"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{tradesperson.full_name}</h3>
              {tradesperson.business_name && (
                <p className="text-gray-600">{tradesperson.business_name}</p>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-medium">{tradesperson.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {tradesperson.trade_type.map((trade) => (
              <span
                key={trade}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {trade}
              </span>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{tradesperson.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{tradesperson.available ? 'Available' : 'Unavailable'}</span>
            </div>
            {tradesperson.hourly_rate && (
              <div className="flex items-center gap-2 text-gray-600">
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
    </div>
  )
})