import { TableItemProps } from "@/utils/types"

export default function TableItem(props: TableItemProps) {
  return (
    <>
      {
        props.type === 'title' &&
        <th title={props.title} className={props.className}>
          {props.children}
        </th>
      }
      {
        props.type === 'data' &&
        <td title={props.title} className={props.className}>
          {props.children}
        </td>
      }
    </>
  )
}