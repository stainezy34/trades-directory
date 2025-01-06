import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { OptimizedImage } from '../shared/OptimizedImage'
import { supabase } from '../../lib/supabase/client'
import type { Database } from '../../lib/supabase/types'

type Profile = Database['public']['Tables']['profiles']['Row']

type Props = {
  profile: Profile
  isOwner: boolean
}

export function PortfolioSection({ profile, isOwner }: Props) {
  const [uploading, setUploading] = useState(false)

  // Rest of the component logic remains the same

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
      
      {/* Upload section remains the same */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {profile.portfolio_items?.map((item, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            {item.type === 'image' ? (
              <OptimizedImage
                src={`${supabase.storage.from('portfolio').getPublicUrl(item.path).data.publicUrl}`}
                alt="Portfolio item"
                width={400}
                height={400}
                className="rounded-lg"
                loading="lazy"
                sizes="(min-width: 768px) 33vw, 50vw"
              />
            ) : (
              <video
                src={`${supabase.storage.from('portfolio').getPublicUrl(item.path).data.publicUrl}`}
                controls
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}