import { useGlobalContext } from '@/context/store'
import { validateThumbnail } from '@/helpers/dataValidators'
import { Character } from '@/interfaces/interfaces'
import { NotFound } from '../atoms'
import { CharacterCard } from '../molecules'

const generateCardList = (characters: Character[]) =>
	characters.length === 0 ? (
		<NotFound>No character found.</NotFound>
	) : (
		characters.map(({ id, name, thumbnail }) => {
			const validatedThumbnail = validateThumbnail(thumbnail)
			return (
				<CharacterCard
					id={id}
					name={name}
					validatedThumbnail={validatedThumbnail}
				/>
			)
		})
	)

export const CharactersList = () => {
	const { characters } = useGlobalContext()

	return (
		<div className="px-16 grid gap-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 justify-evenly">
			{generateCardList(characters)}
		</div>
	)
}

export default CharactersList

