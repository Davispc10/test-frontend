import { FC } from 'react'

import { getCharactersById, getComicsByCharacterId } from '@/services/marvelApi'
import { validateThumbnail, validateDescription } from '@/helpers/dataValidators'

import Navbar from '@/components/molecules/Navbar'
import Carousel from '@/components/organisms/Carousel'
import BackButton from '@/components/atoms/BackButton'
import CharacterDetails from '@/components/molecules/CharacterDetails'

type Props = {
	id: string
	styles?: string
}

const DetailsPage: FC<Props> = async ({ id }) => {
	const [{ name, thumbnail, description }] = await getCharactersById(id)
	const comics = await getComicsByCharacterId(id)

	const validatedThumbnail = validateThumbnail(thumbnail)
	const validatedDescription = validateDescription(description)

	const character = { name, validatedThumbnail, validatedDescription }

	return (
		<>
			<Navbar />
			<div className="px-12 pt-2 mt-24">
				<BackButton />
				<CharacterDetails character={character} />
				<Carousel comics={comics} />
			</div>
		</>
	)
}

export default DetailsPage

