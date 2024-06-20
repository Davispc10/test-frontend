import { ThumbnailProps } from '@/components/types'

export function validateImage({ extension, path }: ThumbnailProps) {
  if (path.includes('image_not_available')) {
    return {
      path: '/assets/imgs/avatar-not-found.jpeg',
      extension: 'jpeg',
    }
  }

  return {
    path: `${path}.${extension}`,
    extension,
  }
}
