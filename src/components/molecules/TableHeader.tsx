import { TableHeaderProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";

export default function TableHeader({ className, items }: TableHeaderProps) {
  return (
    <thead className={`${className && className}`}>
      <TableRow>
        {items && items.map((item, index) => (
          <TableItem
            key={`${item.title && item.title.toLowerCase().replace(/\s+/g, '')}_${index}`}
            type='title'
            title={item.title}
            className={`
              ${item.className}
              w-1/5 border-2 py-3
            `}
          >
            {item.value}
          </TableItem>
        ))}
      </TableRow>
    </thead>
  )
}