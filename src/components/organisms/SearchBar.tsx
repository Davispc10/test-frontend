import { getCharactersByNameAxios, getCharactersTotal } from '@/services/marvelApi'
import { useGlobalContext } from '@/context/store'
import useMediaQuery from '@/hooks/useMediaQuery'
import { InputBox, SearchButton } from '../atoms'

const SearchBar = () => {
	const { setCharacters, searchTerm, setSearchTerm, setNumberOfCharacters } =
		useGlobalContext()

	const isAboveSmallScreens = useMediaQuery('(min-width: 480px)')

	const handleSearch = async () => {
		try {
			const data = await getCharactersByNameAxios(searchTerm)
			const numberOfCharacters = await getCharactersTotal(searchTerm)
			setCharacters(data)
			setNumberOfCharacters(numberOfCharacters)
		} catch (error) {
			console.error('Erro ao buscar personagens:', error)
		}
	}

	const handleKeyPress = async (event: any) => {
		if (event.key === 'Enter' || event.keyCode == 13) {
			await handleSearch()
		}
	}

	const mdSearchStyle =
		'w-72 bg-secondary-300 text-secondary-700 placeholder:text-secondary-600 border-none text-xl outline-none pr-12'

	const smSearchStyle =
		'w-72 bg-secondary-300 text-secondary-700 placeholder:text-secondary-600 border-none text-xl outline-none'

	const mdSearchBtnStyle =
		'w-44 h-16 flex items-center -ml-3 justify-center font-bold text-white bg-red-600 --md-search-button-corners-cut'

	const smSearchBtnStyle =
		'w-78 h-16 flex items-center justify-center font-bold text-white bg-red-600 --sm-search-button-corners-cut'

	return (
		<div className="flex items-center">
			{isAboveSmallScreens ? (
				<>
					<div className="flex -mr-3 h-16 items-center text-black bg-secondary-300 --md-search-input-corners-cut">
						<InputBox
							data-testid="search-input"
							value={searchTerm}
							setValue={setSearchTerm}
							handler={handleKeyPress}
							styles={mdSearchStyle}
						/>
					</div>
					<SearchButton
						handler={handleSearch}
						styles={mdSearchBtnStyle}
					/>
				</>
			) : (
				<div className="flex flex-col gap-1">
					<div className="flex h-16 items-center text-black bg-secondary-300 --sm-search-input-corners-cut">
						<InputBox
							data-testid="search-input"
							value={searchTerm}
							setValue={setSearchTerm}
							handler={handleKeyPress}
							styles={smSearchStyle}
						/>
					</div>
					<SearchButton
						handler={handleSearch}
						styles={smSearchBtnStyle}
					/>
				</div>
			)}
		</div>
	)
}

export default SearchBar

