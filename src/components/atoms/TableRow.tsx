import { TableRowProps } from "@/utils/types";

export default function TableRow(props: TableRowProps) {
  return (
    <tr className={props.className}>
      {props.children}
    </tr>
  )
}