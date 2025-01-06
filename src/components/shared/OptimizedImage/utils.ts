export function getImageDimensions(width: number, height: number) {
  const aspectRatio = width / height

  return {
    aspectRatio,
    width,
    height
  }
}

export function generateSrcSet(src: string, widths: number[], quality = 80) {
  return widths
    .map(w => `${src}?width=${w}&quality=${quality} ${w}w`)
    .join(', ')
}

export function calculateOptimalDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth = 1200,
  maxHeight = 1200
) {
  const aspectRatio = originalWidth / originalHeight

  let width = originalWidth
  let height = originalHeight

  if (width > maxWidth) {
    width = maxWidth
    height = width / aspectRatio
  }

  if (height > maxHeight) {
    height = maxHeight
    width = height * aspectRatio
  }

  return {
    width: Math.round(width),
    height: Math.round(height)
  }
}