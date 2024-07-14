import { Text } from "@/components/atoms/Text"
import { MarvelLogo } from "@/components/atoms/MarvelLogo"
import Link from "next/link"

export function Header() {
  return (
    <div className="flex w-full items-center justify-center gap-16 bg-[#EB2228]">
      <Link href={"/"}>
        <Text text="Home" bold />
      </Link>

      <MarvelLogo />

      <Text text="About" bold />
    </div>
  )
}
