import { PagButton } from '@/interfaces/types'

const PaginationButton: React.FC<PagButton> = ({
	children,
	handler,
	currentPage,
	pagesNumber = 1,
}) => {
	const disabled = currentPage === pagesNumber ? true : false
	const disabledColor = currentPage === pagesNumber ? ' bg-secondary-500' : 'bg-primary-600'
	const orientation = pagesNumber === 1 ? currentPage - 1 : currentPage + 1

	return (
		<button
			onClick={() => handler(orientation)}
			disabled={disabled}
			className={`${disabledColor} flex items-center justify-center font-bold w-[120px] h-[50px] m-2 --pag-btn-corners-cut`}
		>
			{children}
		</button>
	)
}

export default PaginationButton

