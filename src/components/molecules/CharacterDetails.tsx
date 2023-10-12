'use client'

import Image from 'next/image'
import useMediaQuery from '@/hooks/useMediaQuery'

type Props = {
	character: {
		name: string
		validatedThumbnail: string
		validatedDescription: string
	}
}

const CharacterDetails = ({ character }: Props) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1260px)')

	return (
		<div className="max-h-[420px] mx-24 flex justify-start items-center --detail-card-corners-cut bg-secondary-700 border-t-red-600">
			{isAboveMediumScreens ? (
				<Image
					className="object-fit object-cover object-center border-t-red-600"
					src={character.validatedThumbnail}
					alt={character.name}
					width={480}
					height={480}
				/>
			) : null}
			<div className="flex bg-secondary-700 z-10 w-full h-[480px] border-t-4 border-t-red-600 px-6 py-12 hover:bg-red-600 transition-all ease-in-out cursor-pointer">
				{!isAboveMediumScreens ? (
					<Image
						className="object-fit object-cover object-center border-t-red-600 float-left mr-4"
						src={character.validatedThumbnail}
						alt={character.name}
						width={240}
						height={240}
					/>
				) : null}
				<div className=" flex-1 ">
					<p className="p-1 font-bold text-4xl text-secondary-100">{character.name}</p>
					<p className="text-secondary-100mt-8 pl-2 break-words h-[330px] overflow-y-auto">
						{character.validatedDescription}
					</p>
				</div>
			</div>
		</div>
	)
}

export default CharacterDetails

