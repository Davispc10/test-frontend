import { Text } from "@/components/atoms/Text"
import { MarvelLogo } from "@/components/atoms/MarvelLogo"

export function Header() {
  return (
    <div className="flex w-full items-center justify-center gap-16 bg-[#EB2228]">
      <Text text="Home" />

      <MarvelLogo />

      <Text text="About" />
    </div>
  )
}
