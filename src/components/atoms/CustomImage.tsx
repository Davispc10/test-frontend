import { CustomImageProps } from "@/utils/types"
import Image from "next/image"

export default function CustomImage(props: CustomImageProps) {
  return (
    <Image
      width={props.width}
      height={props.height}
      src={props.src}
      alt={props.alt}
      title={props.title}
    />
  )
}