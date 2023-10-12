import Image from 'next/image'

type Props = {
	src: string
	alt: string
	width: number
	height: number
}

const CardImage = ({ src, alt, width, height }: Props) => {
	return (
		<div className="w-full">
			<Image
				className="h-[260px] object-fit object-cover object-center hover:scale-105 duration-500"
				src={src}
				alt={alt}
				width={width}
				height={height}
			/>
		</div>
	)
}

export default CardImage

