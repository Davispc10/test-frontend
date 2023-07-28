interface NoContentToPresentProps {
  text: string
}

export default function NoContentToPresent({ text }: NoContentToPresentProps) {
  return (
    <p className="text-center text-lg font-semibold">{text}</p>
  )
}
