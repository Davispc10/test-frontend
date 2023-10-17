import { PagButton } from '@/interfaces/types'
import { PaginationButton } from '../atoms'

const PreviousButton = ({ handler, currentPage }: PagButton) => {
	return (
		<PaginationButton
			handler={handler}
			currentPage={currentPage}
		>
			PREV
		</PaginationButton>
	)
}

export default PreviousButton

