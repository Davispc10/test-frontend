import Image from 'next/image'
import { ComicNotFoundImg } from 'public/assets'

type Props = {
	children: React.ReactNode
}

const ComicNotFound = ({ children }: Props) => {
	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			{children}
			<Image
				src={ComicNotFoundImg}
				width={300}
				height={300}
				alt={"Coundn't find any thing that you asked, sorry."}
			/>
		</div>
	)
}

export default ComicNotFound

