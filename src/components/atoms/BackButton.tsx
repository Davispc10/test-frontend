'use client'

import Link from 'next/link'

import useMediaQuery from '@/hooks/useMediaQuery'

const BackButton = () => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 870px)')

	return (
		<>
			{isAboveMediumScreens ? (
				<Link href={'/'}>
					<button className="z-40 top-0 fixed mt-5 flex items-center justify-center font-bold bg-red-600 w-[120px] h-[50px] mb-2 --pag-btn-corners-cut">
						BACK
					</button>
				</Link>
			) : null}
		</>
	)
}

export default BackButton

