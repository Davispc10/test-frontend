type Props = {
	key: string
	page: number
	handler: (event: any) => void
	style: string
	children: React.ReactNode
}

const PageNumber = ({ key, page, handler, style, children }: Props) => {
	return (
		<span
			key={key}
			onClick={() => handler(page)}
			className={style}
		>
			{children}
		</span>
	)
}

export default PageNumber

