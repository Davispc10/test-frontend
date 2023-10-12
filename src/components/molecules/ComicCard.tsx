import { RefObject } from 'react'
import { CardImage, CardDescription } from '../atoms'

type Props = {
	title: string
	index: number
	validatedThumbnail: string
	comicRef: RefObject<HTMLDivElement>
	activeIndex: number
	updateIndex: (index: number) => void
	isActiveComic: (index: number) => string
}

const ComicCard = ({
	title,
	index,
	validatedThumbnail,
	comicRef,
	activeIndex,
	updateIndex,
	isActiveComic,
}: Props) => {
	const handleClick = (index: number): void => {
		updateIndex(index)
		if (comicRef.current) {
			comicRef.current.scrollLeft = 200 * index
		}
	}

	return (
		<div
			onClick={() => handleClick(activeIndex)}
			className="w-[170px] h-fit my-5 flex flex-col justify-center items-center --card-corners-cut"
		>
			<CardImage
				src={validatedThumbnail}
				alt={title}
				width={170}
				height={225}
			/>
			<CardDescription
				index={index}
				activeIndex={activeIndex}
				name={title}
				isActiveComic={() => isActiveComic(index)}
				style={
					'z-10 w-[170px] h-[155px] border-t-4 border-t-red-600 px-2 py-2 rounded-br-lg hover:bg-red-600 transition-all ease-in-out flex flex-col justify-between cursor-pointer'
				}
			/>
		</div>
	)
}

export default ComicCard

