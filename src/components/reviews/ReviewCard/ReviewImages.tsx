import { OptimizedImage } from '../../shared/OptimizedImage'

type Props = {
  images: string[]
}

export function ReviewImages({ images }: Props) {
  return (
    <div className="mt-4">
      <h4 className="font-medium mb-2">Project Photos</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {images.map((image, index) => (
          <OptimizedImage
            key={index}
            src={image}
            alt={`Project photo ${index + 1}`}
            width={300}
            height={200}
            className="rounded-lg"
            loading="lazy"
            sizes="(min-width: 640px) 33vw, 50vw"
          />
        ))}
      </div>
    </div>
  )
}