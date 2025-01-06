import { MapPin, Clock, Briefcase } from 'lucide-react'
import type { Database } from '../../lib/supabase/types'
import { Rating } from '../shared/Rating'
import { Badge } from '../shared/Badge'
import { OptimizedImage } from '../shared/OptimizedImage'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  profile: Profile
}

export function ProfileHeader({ profile }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-start gap-6">
        <OptimizedImage
          src={profile.avatar_url || 'https://via.placeholder.com/150'}
          alt={profile.full_name}
          width={128}
          height={128}
          className="rounded-full"
          loading="eager" // Load immediately as it's above the fold
          sizes="128px"
        />
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{profile.full_name}</h1>
              {profile.business_name && (
                <p className="text-lg text-gray-600">{profile.business_name}</p>
              )}
            </div>
            <Rating value={profile.rating} size="lg" />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.trade_type.map((trade) => (
              <Badge key={trade}>{trade}</Badge>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <Badge variant={profile.available ? 'success' : 'warning'}>
                {profile.available ? 'Available' : 'Unavailable'}
              </Badge>
            </div>
            {profile.hourly_rate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-5 h-5" />
                <span>${profile.hourly_rate}/hr</span>
              </div>
            )}
          </div>

          {profile.bio && (
            <p className="mt-6 text-gray-600">{profile.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}