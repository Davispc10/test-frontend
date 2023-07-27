import { useEffect } from 'react'
import { TableBodyProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";
import CustomImage from "../atoms/CustomImage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function TableBody({ className, items }: TableBodyProps) {
  const page = useSelector((state: RootState) => state.query.page)
  const limit = useSelector((state: RootState) => state.query.limit)
  return (
    <tbody>
      {items && items.slice((page * limit), ((page * limit) + limit)).map((item, index) => (
        <TableRow key={`${index}_${item.id}`}>
          <TableItem className="w-1/5" type='data' title={item.id.toString()}>
            {item.id}
          </TableItem>
          <TableItem className="w-1/5" type='data' title={item.name}>
            {item.name}
          </TableItem>
          <TableItem className="w-1/5" type='data' title={item.description}>
            {item.description}
          </TableItem>
          <TableItem className="w-1/5" type='data' title={`Imagem ${item.name}`}>
            <CustomImage width={300} height={300} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`Imagem ${item.name}`} title={`Imagem ${item.name}`} />
          </TableItem>
          <TableItem className="w-1/5 text-center" type='data' title={`Imagem ${item.name}`}>
            <button>Ver detalhes</button>
          </TableItem>
        </TableRow>
      ))}
    </tbody>
  )
}