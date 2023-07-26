import { TableBodyProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";
import CustomImage from "../atoms/CustomImage";

export default function TableBody({ className, items }: TableBodyProps) {
  return (
    <tbody>
      {items && items.map((item, index) => (
        <TableRow key={index}>
          <TableItem type='data' title={item.id.toString()}>
            {item.id}
          </TableItem>
          <TableItem type='data' title={item.name}>
            {item.name}
          </TableItem>
          <TableItem type='data' title={item.description}>
            {item.description}
          </TableItem>
          <TableItem type='data' title={`Imagem ${item.name}`}>
            <CustomImage width={300} height={300} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`Imagem ${item.name}`} title={`Imagem ${item.name}`} />
          </TableItem>
        </TableRow>
      ))}
    </tbody>
  )
}