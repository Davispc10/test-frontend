type Props = {
	name: string
	style: string
	index?: number
	activeIndex?: number
	isActiveComic?: () => string
}

const CardDescription = ({ name, activeIndex, index, style }: Props) => {
	const active = index === activeIndex ? 'bg-primary-600' : 'bg-secondary-600'

	return (
		<div className={`${active} ${style}`}>
			<p className="p-1 font-bold text-xl text-secondary-100 line-clamp-4">{name}</p>
		</div>
	)
}

export default CardDescription

