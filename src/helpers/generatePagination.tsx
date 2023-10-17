import { Dispatch, SetStateAction } from 'react'

type Action = Dispatch<SetStateAction<number>>

const generatePagination = (pages: number, currentPage: number) => {
	const pagination = []
	const delta = 2

	for (let i = 1; i <= pages; i++) {
		if (i === 1 || i === pages || (i >= currentPage - delta && i <= currentPage + delta)) {
			pagination.push(i)
		}
	}

	return pagination
}

export const renderPagination = (
	pages: number,
	currentPage: number,
	setCurrentPage: Action
) => {
	const pagination = generatePagination(pages, currentPage)
	const paginationElements = []

	for (let i = 0; i < pagination.length; i++) {
		const page = pagination[i]
		if (i > 0 && page - pagination[i - 1] > 1) {
			paginationElements.push(
				<span
					onClick={() => setCurrentPage(page)}
					className="w-10 font-bold text-xl text-secondary-700 cursor-pointer"
					key={`ellipsis-${i}`}
				>
					...
				</span>
			)
		}
		if (page === currentPage) {
			paginationElements.push(
				<span
					onClick={() => setCurrentPage(page)}
					className="w-9 font-extrabold font-2xl text-primary-600 cursor-pointer"
					key={page}
				>
					{page}
				</span>
			)
		} else {
			paginationElements.push(
				<span
					onClick={() => setCurrentPage(page)}
					className="w-10 font-bold text-xl text-secondary-700 cursor-pointer"
					key={page}
				>
					{page}
				</span>
			)
		}
	}

	return paginationElements
}

