const descriptionVerifier = (
  description: string | undefined,
  sub1 = 0,
  sub2 = 150
): string => {
  if (description) {
    return `${description.substring(sub1, sub2)}${sub2 === 150 ? '...' : ''}`
  } else {
    return "There's no description."
  }
}

const thumbnailVerifier = (thumbnail: string): string => {
  const placeholderImage = '/images/logo.svg'
  return thumbnail.includes('image_not_available')
    ? placeholderImage
    : thumbnail
}

export { thumbnailVerifier, descriptionVerifier }
