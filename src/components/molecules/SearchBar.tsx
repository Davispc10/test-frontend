import InputSearch from "../atoms/InputSearch"
import { useDispatch, useSelector } from 'react-redux';
import { changePage, changeSearchName, resetHeros } from '@/redux/features/querySlice';
import { RootState } from "@/redux/store";
import { ClassNameProps } from "@/utils/types";

export default function SearchBar({ className }: ClassNameProps) {
  const dispatch = useDispatch()
  const searchName = useSelector((state: RootState) => state.query.searchName)
  return (
    <div className={className && className}>
      <InputSearch
        size='lg'
        placeholder='Pesquise o seu herói favorito'
        value={searchName}
        onChangeFunction={(e) => {
          if (!e.target.value) {
            dispatch(resetHeros())
            dispatch(changePage({ page: 0 }))
          }
          dispatch(changeSearchName({ searchName: e.target.value }))
        }}
      />
    </div>
  )
}