import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type Props = {
	value: string
	setValue: (value: string) => void
	handler: (event: any) => Promise<void>
	styles: string
}

const InputBox = ({ value, setValue, handler, styles }: Props) => {
	return (
		<>
			<FontAwesomeIcon
				className="p-4"
				icon={faSearch}
			/>
			<input
				className={styles}
				type="text"
				placeholder="Enter a character's name..."
				name="search"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={() => handler}
			/>
		</>
	)
}

export default InputBox

