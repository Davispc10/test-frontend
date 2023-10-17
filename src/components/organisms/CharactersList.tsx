import { useGlobalContext } from '@/context/store'
import { validateThumbnail } from '@/helpers/dataValidators'
import { Character } from '@/interfaces/interfaces'
import { CharacterCard } from '../molecules'
import { NotFound } from '../atoms'
import { CharacterNotFoundImg } from 'public/assets'
import Loading from '../atoms/Loading'

const generateCardList = (characters: Character[]) =>
	characters.length === 0 ? (
		<NotFound
			image={CharacterNotFoundImg}
			styles={'flex-col'}
		>
			<p className="text-4xl font-extrabold text-secondary-700">Oh, no!</p>
			<p className="text-xl font-semibold text-secondary-700 text-center">
				Not even Captain Marvel could help you <br /> find a character by this name!
			</p>
		</NotFound>
	) : (
		<div className="px-16 grid gap-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 justify-evenly">
			{characters.map(({ id, name, thumbnail }) => {
				const validatedThumbnail = validateThumbnail(thumbnail)
				return (
					<CharacterCard
						id={id}
						name={name}
						validatedThumbnail={validatedThumbnail}
					/>
				)
			})}
		</div>
	)

export const CharactersList = () => {
	const { characters } = useGlobalContext()

	return <>{generateCardList(characters)}</>
}

export default CharactersList
