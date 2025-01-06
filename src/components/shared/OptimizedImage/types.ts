export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width: number
  height: number
  quality?: number
  sizes?: string
  loading?: 'lazy' | 'eager'
  className?: string
}