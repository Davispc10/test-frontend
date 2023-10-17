import Image from 'next/image'
import { CharacterNotFoundImg } from 'public/assets'

type Props = {
	children: React.ReactNode
}

const NotFound = ({ children }: Props) => {
	return (
		<div className="flex flex-col gap-4 justify-center items-center">
			{children}
			<Image
				src={CharacterNotFoundImg}
				width={300}
				height={300}
				alt={"Coundn't find any thing that you asked, sorry."}
			/>
		</div>
	)
}

export default NotFound

