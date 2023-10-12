type Props = {
	handler: () => void
	styles: string
}

const SearchButton = ({ handler, styles }: Props) => {
	return (
		<button
			onClick={handler}
			className={styles}
		>
			SEARCH
		</button>
	)
}

export default SearchButton

