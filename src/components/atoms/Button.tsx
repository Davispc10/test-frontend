import { ButtonProps } from "@/utils/types";

export default function Button(props: ButtonProps) {
  return (
    <button
      title={props.title}
      className={`${props.className && props.className}`}
    >
      {props.title}
    </button>
  )
}