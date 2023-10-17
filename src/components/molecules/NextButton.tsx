import { PagButton } from '@/interfaces/types'
import { PaginationButton } from '../atoms'

const NextButton = ({ handler, currentPage, pagesNumber }: PagButton) => {
	return (
		<PaginationButton
			handler={handler}
			currentPage={currentPage}
			pagesNumber={pagesNumber}
		>
			NEXT
		</PaginationButton>
	)
}

export default NextButton

