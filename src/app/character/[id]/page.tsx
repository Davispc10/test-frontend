import DetailsPage from '@/components/pages/DetailsPage'
import { FC } from 'react'

interface CharacterPageProps {
	params: {
		id: string
	}
}

const CharacterPage: FC<CharacterPageProps> = async ({ params }) => {
	const { id } = params

	return <DetailsPage id={id} />
}

export default CharacterPage

