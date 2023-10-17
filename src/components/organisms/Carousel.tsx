'use client'

import { Comic } from '@/interfaces/interfaces'
import { FC, useState, useRef, useEffect } from 'react'
import { ComicList } from '.'
import { Indicators, ComicNotFound, NotFound } from '../atoms'
import { ComicNotFoundImg } from 'public/assets'

type KeyUpHandler = (e: KeyboardEvent) => void

const Carousel: FC<{ comics: Comic[] }> = ({ comics }) => {
	const [activeIndex, setActiveIndex] = useState(0)
	const comicRef = useRef<HTMLDivElement>(null)

	const updateIndex = (newIndex: number) => {
		if (newIndex < 0) {
			newIndex = 0
		} else if (newIndex >= comics.length) {
			newIndex = comics.length - 1
		}
		setActiveIndex(newIndex)
	}

	const prevItem = () => {
		updateIndex(activeIndex - 1)
		if (comicRef.current) {
			comicRef.current.scrollLeft -= 150
		}
	}

	const nextItem = () => {
		updateIndex(activeIndex + 1)
		if (comicRef.current) {
			comicRef.current.scrollLeft += 150
		}
	}

	const mountKeyUpListener = (handler: KeyUpHandler) =>
		document.addEventListener('keyup', handler)

	const unmountKeyUpListener = (handler: KeyUpHandler) =>
		document.removeEventListener('keyup', handler)

	useEffect(() => {
		const handleKeyUp = (e: KeyboardEvent) => {
			e.preventDefault()
			if (e.ctrlKey && e.key === 'ArrowLeft') {
				prevItem()
			} else if (e.ctrlKey && e.key === 'ArrowRight') {
				nextItem()
			}
		}
		mountKeyUpListener(handleKeyUp)
		return () => {
			unmountKeyUpListener(handleKeyUp)
		}
	}, [activeIndex])

	return (
		<>
			{comics.length ? (
				<>
					<div className="flex items-center justify-center">
						<button
							className="mr-2 p-5 bg-primary-600 --indicator-prev-corners-cut "
							onClick={prevItem}
						></button>
						<div
							className="carousel flex gap-8 overflow-x-auto"
							ref={comicRef}
						>
							<ComicList
								comics={comics}
								comicRef={comicRef}
								activeIndex={activeIndex}
								updateIndex={updateIndex}
							/>
						</div>
						<button
							className="ml-2 p-5 bg-primary-600 --indicator-next-corners-cut"
							onClick={nextItem}
						></button>
					</div>
					<Indicators
						activeIndex={activeIndex}
						updateIndex={updateIndex}
						comic={comicRef}
					>
						{comics}
					</Indicators>
				</>
			) : (
				<NotFound
					image={ComicNotFoundImg}
					styles={'flex-row'}
				>
					<div className="flex flex-col justify-center items-center gap-10">
						<p className="text-4xl font-extrabold text-secondary-700">Oh, no!</p>
						<p className="text-xl font-semibold text-secondary-700 text-center">
							Captain America don't have any <br /> comic of this character.
						</p>
					</div>
				</NotFound>
			)}
		</>
	)
}

export default Carousel

// 'use client'

// import { useState, useRef, useEffect, FC } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

// import { Comic } from '@/interfaces/interfaces'
// import { Indicators } from '@/components/carousel/Indicators'
// import ComicList from '@/components/containers/ComicList'

// type KeyUpHandler = (e: KeyboardEvent) => void

// const Carousel: FC<{ comics: Comic[] }> = ({ comics }) => {
// 	const [activeIndex, setActiveIndex] = useState(0)
// 	const comicRef = useRef<HTMLDivElement>(null)

// 	const updateIndex = (newIndex: number) => {
// 		if (newIndex < 0) {
// 			newIndex = 0
// 		} else if (newIndex >= comics.length) {
// 			newIndex = comics.length - 1
// 		}
// 		setActiveIndex(newIndex)
// 	}

// 	const prevItem = () => {
// 		updateIndex(activeIndex - 1)
// 		if (comicRef.current) {
// 			comicRef.current.scrollLeft -= 205
// 		}
// 	}

// 	const nextItem = () => {
// 		updateIndex(activeIndex + 1)
// 		if (comicRef.current) {
// 			comicRef.current.scrollLeft += 205
// 		}
// 	}

// 	const mountKeyUpListener = (handler: KeyUpHandler) =>
// 		document.addEventListener('keyup', handler)

// 	const unmountKeyUpListener = (handler: KeyUpHandler) =>
// 		document.removeEventListener('keyup', handler)

// 	useEffect(() => {
// 		const handleKeyUp = (e: KeyboardEvent) => {
// 			e.preventDefault()
// 			if (e.ctrlKey && e.key === 'ArrowLeft') {
// 				prevItem()
// 			} else if (e.ctrlKey && e.key === 'ArrowRight') {
// 				nextItem()
// 			}
// 		}
// 		mountKeyUpListener(handleKeyUp)
// 		return () => {
// 			unmountKeyUpListener(handleKeyUp)
// 		}
// 	}, [activeIndex])

// 	return (
// 		<>
// 			<div className="flex items-center justify-center">
// 				<button
// 					className="p-10"
// 					onClick={prevItem}
// 				>
// 					<FontAwesomeIcon
// 						className="material-symbols-outlined text-black"
// 						icon={faChevronLeft}
// 					/>
// 				</button>
// 				<div
// 					className="carousel flex gap-8 overflow-x-auto"
// 					ref={comicRef}
// 				>
// 					<ComicList
// 						comics={comics}
// 						comicRef={comicRef}
// 						activeIndex={activeIndex}
// 						updateIndex={updateIndex}
// 					/>
// 				</div>
// 				<button
// 					className="p-10"
// 					onClick={nextItem}
// 				>
// 					<FontAwesomeIcon
// 						className="material-symbols-outlined text-black"
// 						icon={faChevronRight}
// 					/>
// 				</button>
// 			</div>
// 			<Indicators
// 				activeIndex={activeIndex}
// 				updateIndex={updateIndex}
// 				comic={comicRef}
// 			>
// 				{comics}
// 			</Indicators>
// 		</>
// 	)
// }

// export default Carousel

