import Link from "next/link"
import { ImageIcon } from "../atoms/ImageIcon"
import leftBigArrowIcon from "@/assets/icons/leftBigArrow.svg"

type Props = {
  title: string
}

export function DetailsHeader({ title }: Props) {
  return (
    <div className="flex w-full flex-row items-center justify-between py-4">
      <div className="flex w-32 justify-center">
        <Link href={"/"} className="flex flex-row items-center justify-center">
          <ImageIcon iconFileName={leftBigArrowIcon} className="size-9" />
          <p className="text-lg font-semibold text-zinc-100">Voltar</p>
        </Link>
      </div>

      <p className="text-4xl font-bold">{title}</p>

      <div className="w-32"></div>
    </div>
  )
}
