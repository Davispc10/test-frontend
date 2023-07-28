import { useEffect } from 'react'
import { TableBodyProps } from "@/utils/types";
import TableRow from "../atoms/TableRow";
import TableItem from "../atoms/TableItem";
import CustomImage from "../atoms/CustomImage";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Link from 'next/link';
import Button from '../atoms/Button';

export default function TableBody({ className, items }: TableBodyProps) {
  const page = useSelector((state: RootState) => state.query.page)
  const limit = useSelector((state: RootState) => state.query.limit)
  function limitText(text: string, limit: number) {
    if (text.length > limit) {
      return text.substring(0, limit - 3) + '...';
    }
    return text;
  }
  return (
    <tbody className={`
      border-2
      ${className && className}
      `}>
      {items && items.slice((page * limit), ((page * limit) + limit)).map((item, index) => {
        const limitedDescription = limitText(item.description, 80);
        return (
          <TableRow className='border-b' key={`${index}_${item.id}`}>
            <TableItem className="w-1/3 md:w-1/4 h-36 px-3 md:px-4 py-4" type='data' title={`Imagem ${item.name}`}>
              <CustomImage className='mx-auto rounded-full border w-[100px] object-contain h-[100px] max-w-[100px] max-h-[100px]' width={100} height={100} src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={`Imagem ${item.name}`} title={`Imagem ${item.name}`} />
            </TableItem>
            <TableItem className="w-1/3 text-center md:w-1/4 h-36 px-2 md:px-4 py-4" type='data' title={item.name}>
              {item.name}
            </TableItem>
            <TableItem className="hidden md:w-1/4 md:h-36 md:px-4 md:py-4 md:table-cell" type='data' title={item.description}>
              {limitedDescription}
            </TableItem>
            <TableItem className="w-1/3 md:w-1/4 h-36 px-4 text-center" type='data' title={`Imagem ${item.name}`}>
              <Link href={`/herois/${item.id}`}>
                <Button className='px-3 py-2 md:px-8 md:py-3 rounded bg-blue-600 text-white' title='Detalhes' />
              </Link>
            </TableItem>
          </TableRow>
        )
      })}
    </tbody>
  )
}