import Link from 'next/link'
import { FC } from 'react'
import { CardImage, CardDescription } from '../atoms'

interface CharacterCardProps {
	id: number
	name: string
	validatedThumbnail: string
}

const CharacterCard: FC<CharacterCardProps> = ({ id, name, validatedThumbnail }) => {
	return (
		<Link href={`character/${id}`}>
			<div className="w-[225px] h-fit my-5 flex flex-col justify-center items-center --card-corners-cut">
				<CardImage
					src={validatedThumbnail}
					alt={name}
					width={260}
					height={200}
				/>
				<CardDescription
					name={name}
					style={
						'bg-secondary-700 z-10 w-full h-[112px] border-t-4 border-t-red-600 px-2 py-4 rounded-br-lg hover:bg-red-600 transition-all ease-in-out flex flex-col justify-between cursor-pointer'
					}
				/>
			</div>
		</Link>
	)
}

export default CharacterCard

