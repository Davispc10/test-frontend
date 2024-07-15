import clsx from "clsx"
import { Text } from "../atoms/Text"

type Props = {
  width: number
  height: number
  title: string
}

export function BlurTitle({ width, height, title }: Props) {
  return (
    <div className="flex h-fit w-fit items-center justify-center">
      <div
        className={clsx(
          `fixed z-0 h-[${height}px] w-[${width}px] bg-red-600 blur-xl`,
        )}
      ></div>
      <div className="relative z-10">
        <Text text={title} bold />
      </div>
    </div>
  )
}
