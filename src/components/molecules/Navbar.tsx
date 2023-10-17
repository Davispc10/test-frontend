'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useGlobalContext } from '@/context/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { marvelHeroesLogo, marvelLogo2 } from 'public/assets'

export default function Navbar() {
	const { setCurrentPage } = useGlobalContext()
	const isAboveSmallScreens = useMediaQuery('(min-width: 480px)')

	return (
		<nav className="flex top-0 h-[96px] w-full z-40 justify-center bg-secondary-700 p-2 fixed">
			<Link
				href={'/'}
				onClick={() => setCurrentPage(1)}
			>
				{isAboveSmallScreens ? (
					<Image
						className="h-full"
						src={marvelHeroesLogo}
						width={450}
						height={300}
						alt="marvel-heroes-logo"
					/>
				) : (
					<Image
						className="h-full"
						src={marvelLogo2}
						width={200}
						height={200}
						alt="marvel-logo"
					/>
				)}
			</Link>
		</nav>
	)
}

