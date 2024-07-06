type TitleProps = {
  text?: string
}

export function Title({ text }: TitleProps) {
  return <h2>{text}</h2>
}