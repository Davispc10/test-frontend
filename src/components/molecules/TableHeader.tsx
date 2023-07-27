import { TableHeaderProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";

export default function TableHeader({ className, items }: TableHeaderProps) {
  return (
    <thead>
      <TableRow className={`${className && className}`}>
        {items && items.map((item, index) => (
          <TableItem
            key={`${item.title && item.title.toLowerCase().replace(/\s+/g, '')}_${index}`}
            type='title'
            title={item.title}
            className="w-1/5"
          >
            {item.value}
          </TableItem>
        ))}
      </TableRow>
    </thead>
  )
}