import { Text } from "../atoms/Text"
export function Footer() {
  return (
    <div
      id="page-footer"
      className="flex h-8 w-full items-center justify-center bg-zinc-800"
    >
      <Text
        text="2024 © Carlos Edilson Junior"
        variant="footer"
        bold={false}
      />
    </div>
  )
}
