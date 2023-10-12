export interface Comic {
	id: number
	title: string
	thumbnail: {
		path: string
		extension: string
	}
}

export interface Character {
	id: number
	name: string
	description: string
	thumbnail: {
		path: string
		extension: string
	}
}

export interface ComicsCarousel {
	itemIndex: number
	activeIndex: number
	comic: Comic
}

