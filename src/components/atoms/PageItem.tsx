import { PaginationItemProps } from "@/utils/types";

export default function PageItem(props: PaginationItemProps) {
  return (
    <span
      className={`
        ${props.isActive === true ? "font-bold" : ""}
      `}
    >
      {props.value}
    </span>
  )
}