import clsx from "clsx"
import Image from "next/image"

type Props = {
  iconFileName: any
  position?: "left" | "right"
}

export function ImageIcon({ iconFileName, position }: Props) {
  return (
    <Image
      src={iconFileName}
      alt={iconFileName.toString() + " icon"}
      className={clsx(
        { "relative left-10 top-2.5 h-6": position === "left" },
        { "relative right-10 top-3.5 h-5": position === "right" },
      )}
    />
  )
}
