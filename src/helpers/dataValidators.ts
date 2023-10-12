import { Thumbnail } from '@/interfaces/types'
import { marvelLogoNoImage2 } from 'public/assets'

const validateThumbnail = ({ path, extension }: Thumbnail) =>
	path.replace(/\//g, ' ').includes('image_not_available')
		? marvelLogoNoImage2.src
		: `${path}.${extension}`

const validateDescription = (description: string) =>
	description === '' ? 'No description provided.' : description

export { validateThumbnail, validateDescription }

