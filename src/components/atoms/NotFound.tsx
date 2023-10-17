import Image, { StaticImageData } from 'next/image'

type Props = {
	children: React.ReactNode
	image: StaticImageData
	styles?: string
}

const NotFound = ({ children, image, styles }: Props) => {
	return (
		<div className={`flex gap-4 justify-center items-center ${styles}`}>
			{children}
			<Image
				src={image}
				width={300}
				height={300}
				alt={"Coundn't find any thing that you asked, sorry."}
			/>
		</div>
	)
}

export default NotFound

