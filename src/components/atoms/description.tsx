type DescriptionProps = {
  text?: string
}

export function Description({ text }: DescriptionProps) {
  return <p className="text-white">{text}</p>
}