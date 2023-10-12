import { getPaginatedCharacters } from '@/services/marvelApi'
import { useGlobalContext } from '@/context/store'
import { renderPagination } from '@/helpers/generatePagination'
import useMediaQuery from '@/hooks/useMediaQuery'
import { PreviousButton, NextButton } from '../molecules'

const Pagination = () => {
	const { pagesNumber, currentPage, setCurrentPage, searchTerm, setCharacters } =
		useGlobalContext()
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px)')

	const handlePageChange = async (newPage: number) => {
		setCurrentPage(newPage)
		if (searchTerm) {
			const characters = await getPaginatedCharacters(newPage, searchTerm)
			setCharacters(characters)
		}
	}

	return (
		<>
			{isAboveMediumScreens ? (
				<div className="flex w-[840px] items-center justify-between gap-4 bg-secondary-300 --md-pagination-corners-cut">
					<PreviousButton
						handler={handlePageChange}
						currentPage={currentPage}
					/>
					<div className="flex items-center justify-center gap-5 ">
						{renderPagination(pagesNumber, currentPage, setCurrentPage)}
					</div>
					<NextButton
						handler={handlePageChange}
						currentPage={currentPage}
						pagesNumber={pagesNumber}
					/>
				</div>
			) : (
				<div className="flex w-[300px] items-center justify-between gap-4 bg-secondary-300 --sm-pagination-corners-cut">
					<PreviousButton
						handler={handlePageChange}
						currentPage={currentPage}
					/>
					<NextButton
						handler={handlePageChange}
						currentPage={currentPage}
						pagesNumber={pagesNumber}
					/>
				</div>
			)}
		</>
	)
}

export default Pagination

