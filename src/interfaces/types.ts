export type PagButton = {
	children?: React.ReactNode
	handler: (page: number) => void
	currentPage: number
	pagesNumber?: number
}

export type Thumbnail = {
	path: string
	extension: string
}
