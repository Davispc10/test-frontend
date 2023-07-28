'use client'

import Pagination from '@/components/molecules/Pagination';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { HeroProps } from '@/utils/types';
import { useEffect } from 'react'
import { titleHeader } from '@/utils/titlesHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addHeros, changePage, changePageTotal } from '@/redux/features/querySlice';
import SearchBar from '../molecules/SearchBar';
import { PUBLIC_KEY, hash, ts } from '@/utils/keys';

export default function Table() {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.query.page)
  const limit = useSelector((state: RootState) => state.query.limit)
  const pageTotal = useSelector((state: RootState) => state.query.pageTotal)
  const searchName = useSelector((state: RootState) => state.query.searchName)
  const heros = useSelector((state: RootState) => state.query.heros)


  function checkIfHeroExist(data: any, heros: HeroProps[]) {
    const updatedHeros = data.map((hero: HeroProps) => {
      const heroExists = heros.some((existingHero: HeroProps) => existingHero.id === hero.id);
      if (!heroExists) {
        const imageUrl = hero.thumbnail.path;
        const parts = imageUrl.split('/');
        const finalValue = parts[parts.length - 1];
        if (!hero.description) {
          hero.description = 'Descrição não informada';
        }
        if (finalValue === 'image_not_available') {
          hero.thumbnail.path = 'https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-4';
          hero.thumbnail.extension = 'png';
        }
        return hero;
      }
    }).filter(Boolean);
    dispatch(addHeros({ hero: heros.concat(updatedHeros) }))
  }

  useEffect(() => {
    const getHeros = async () => {
      const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}${searchName ? `&nameStartsWith=${searchName}` : ''}&orderBy=name&limit=${limit}&offset=${page * limit}&apikey=${PUBLIC_KEY}&hash=${hash}`);
      const data = await res.json();
      let paginas = Math.round(data.data.total / limit);
      dispatch(changePageTotal({ pageTotal: paginas }));
      if (pageTotal === 0) {
        dispatch(changePage({ page: 0 }));
      }
      if (searchName) {
        const filteredResults = heros.filter((hero: HeroProps) => hero.name.toLowerCase().includes(searchName.toLowerCase()));
        checkIfHeroExist(data.data.results, filteredResults)
      } else {
        checkIfHeroExist(data.data.results, heros)
      }
    };
    getHeros();
  }, [limit, page, searchName]);

  return (
    <>
      <div className='bg-white border rounded px-5 py-3 flex flex-col gap-5'>
        <SearchBar />
        <table className='w-full'>
          <TableHeader className='border-b mb-4' items={titleHeader} />
          <TableBody items={heros} />
        </table>
        <Pagination />
      </div>
    </>
  )
}
