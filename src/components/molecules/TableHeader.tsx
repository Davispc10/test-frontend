import { TableHeaderProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";

export default function TableHeader({ className, items }: TableHeaderProps) {
  return (
    <thead>
      <TableRow>
        {items && items.map((item, index) => (
          <TableItem
            key={`${item.title && item.title.toLowerCase().replace(/\s+/g, '')}_${index}`}
            type='title'
            title={item.title}
            className={`${className && className}`}
          >
            {item.value}
          </TableItem>
        ))}
      </TableRow>
    </thead>
  )
}