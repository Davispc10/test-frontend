import { RefObject } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { Comic } from '@/interfaces/interfaces'

type Props = {
	activeIndex: number
	comic: RefObject<HTMLDivElement>
	children: Array<Comic>
	updateIndex: (value: number) => void
}

const Indicators = ({ activeIndex, children, comic, updateIndex }: Props) => {
	const handleClick = (index: number): void => {
		updateIndex(index)
		if (comic.current) {
			comic.current.scrollLeft = 200 * index
		}
	}

	const activeIndicator = (index: number) =>
		index === activeIndex ? 'text-primary-600' : 'text-secondary-600'

	return (
		<div
			id="indicators"
			className="flex justify-center"
		>
			{children?.map((item, index) => (
				<FontAwesomeIcon
					key={index}
					className={`material-symbols-outlined flex w-7 justify-center ${activeIndicator(
						index
					)}`}
					onClick={() => handleClick(index)}
					icon={faCircle}
				/>
			))}
		</div>
	)
}

export default Indicators

