import { CustomImageProps } from "@/utils/types"
import Image from "next/image"

export default function CustomImage(props: CustomImageProps) {
  return (
    <Image
      className={props.className && props.className}
      width={props.width}
      height={props.height}
      src={props.src}
      alt={props.alt ? props.alt : ''}
      title={props.title}
    />
  )
}