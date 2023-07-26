import { PaginationItemProps } from "@/utils/types";

export default function PageItem(props: PaginationItemProps) {
  return (
    <span
      onClick={props.onClickFunction && props.onClickFunction}
      className={`
        ${props.isActive === true ? "font-bold" : ""}
        cursor-pointer
      `}
    >
      {props.value}
    </span>
  )
}