import { useState, useEffect } from 'react'

export function useImageLoad(src: string) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = src
    
    img.onload = () => {
      setLoaded(true)
      setError(false)
    }
    
    img.onerror = () => {
      setLoaded(false)
      setError(true)
    }

    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { loaded, error }
}