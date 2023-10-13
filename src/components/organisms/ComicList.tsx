import { Comic } from '@/interfaces/interfaces'
import { RefObject, FC } from 'react'
import { ComicCard } from '../molecules'
import { validateThumbnail } from '@/helpers/dataValidators'

type ComicsCarousel = {
	comics: Comic[]
	comicRef: RefObject<HTMLDivElement>
	activeIndex: number
	updateIndex: (index: number) => void
}

const ComicList: FC<ComicsCarousel> = ({ comics, comicRef, activeIndex, updateIndex }) => {
	const activeComic = 'active bg-red-600'
	const inactiveComic = 'opacity-50 bg-secondary-700'

	const isActiveComic = (itemIndex: number): string =>
		itemIndex === activeIndex ? activeComic : inactiveComic

	const validatedComics = (comics: Comic[]) =>
		comics.map((comic, index) => (
			<ComicCard
				title={comic.title}
				validatedThumbnail={validateThumbnail(comic.thumbnail)}
				comicRef={comicRef}
				activeIndex={activeIndex}
				updateIndex={updateIndex}
				index={index}
				isActiveComic={isActiveComic}
			/>
		))

	return (
		<div className={`px-2 py-0`}>
			<div
				className="carousel flex gap-8 overflow-x-auto"
				ref={comicRef}
			>
				{validatedComics(comics)}
			</div>
		</div>
	)
}

export default ComicList

