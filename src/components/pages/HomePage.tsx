import { FC } from 'react'

import Navbar from '../molecules/Navbar'
import SearchBar from '../organisms/SearchBar'
import Pagination from '../organisms/Pagination'
import CharactersList from '../organisms/CharactersList'

type Props = {
	styles: string
}

const HomePage: FC<Props> = ({ styles }) => {
	return (
		<div className={styles}>
			<Navbar />
			<main className="flex flex-col mt-24 mb-2 items-center justify-between">
				<SearchBar />
				<CharactersList />
				<Pagination />
			</main>
		</div>
	)
}

export default HomePage

