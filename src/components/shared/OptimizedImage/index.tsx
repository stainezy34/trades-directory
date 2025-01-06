import { useState, useEffect } from 'react'
import { cn } from '../../../lib/utils/cn'
import { getImageDimensions } from './utils'
import type { ImageProps } from './types'

export function OptimizedImage({ 
  src,
  alt,
  width,
  height,
  className,
  sizes = '100vw',
  loading = 'lazy',
  quality = 80,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    img.onload = () => setLoaded(true)
    img.onerror = () => setError(true)
  }, [src])

  if (error) {
    return <div className="bg-gray-200 rounded" style={{ width, height }} />
  }

  const { aspectRatio } = getImageDimensions(width, height)
  const optimizedSrc = `${src}?quality=${quality}`

  return (
    <div 
      className={cn(
        'relative overflow-hidden bg-gray-100',
        !loaded && 'animate-pulse',
        className
      )}
      style={{ aspectRatio }}
    >
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-300',
          !loaded && 'opacity-0',
          loaded && 'opacity-100'
        )}
        {...props}
      />
    </div>
  )
}