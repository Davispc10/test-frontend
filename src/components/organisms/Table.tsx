'use client'

import Pagination from '@/components/molecules/Pagination';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { HeroProps } from '@/utils/types';
import { useEffect } from 'react'
import { Md5 } from 'ts-md5';
import InputSearch from '../atoms/InputSearch';
import { titleHeader } from '@/utils/titlesHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { addHeros, changePage, changePageTotal, changeSearchName, resetHeros } from '@/redux/features/querySlice';

export default function Table() {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.query.page)
  const limit = useSelector((state: RootState) => state.query.limit)
  const pageTotal = useSelector((state: RootState) => state.query.pageTotal)
  const searchName = useSelector((state: RootState) => state.query.searchName)
  const heros = useSelector((state: RootState) => state.query.heros)
  const PUBLIC_KEY = '7bfe41ebd0f4f4631c41dfe891402576';
  const PRIVATE_KEY = '0f4fcdaac01df9619fdf63bcc699d2a5f87896be';
  const ts = Number(new Date());
  let hash = Md5.hashStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

  useEffect(() => {
    // Refatorar funções e dividir suas responsabilidades
    const getHeros = async () => {
      const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}${searchName ? `&nameStartsWith=${searchName}` : ''}&orderBy=name&limit=${limit}&offset=${page * limit}&apikey=${PUBLIC_KEY}&hash=${hash}`);
      const data = await res.json();
      let paginas = Math.round(data.data.total / limit);
      dispatch(changePageTotal({ pageTotal: paginas }));
      if (pageTotal === 0) {
        dispatch(changePage({ page: 0 }));
      }

      const updatedHeros = data.data.results.map((hero: HeroProps) => {
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
        return null;
      }).filter(Boolean);
      dispatch(addHeros({ hero: heros.concat(updatedHeros) }))

      if (searchName) {
        const filteredResults = heros.filter((hero: HeroProps) => hero.name.toLowerCase().includes(searchName.toLowerCase()));
        const updatedHeros = data.data.results.map((hero: HeroProps) => {
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
          return null;
        }).filter(Boolean);
        dispatch(addHeros({ hero: filteredResults.concat(updatedHeros) }))
      }
    };
    getHeros();
  }, [limit, page, searchName]);

  useEffect(() => {
    console.log(heros)
  }, [heros])

  return (
    <>
      {/* 
        Criar um componente para tabela vazia 
        - Uma table body que receba uma linha completa e avise que não há personagens.
      */}
      <div className='bg-white border rounded px-5 py-3 flex flex-col gap-5'>
        <InputSearch
          size='lg'
          placeholder='Pesquise o seu herói favorito'
          value={searchName}
          onChangeFunction={(e) => {
            if (!e.target.value) {
              dispatch(resetHeros())
            }
            dispatch(changeSearchName({ searchName: e.target.value }))
          }}
        />
        <table className='w-full'>
          <TableHeader className='border-b mb-4' items={titleHeader} />
          <TableBody items={heros} />
        </table>
        <Pagination />
      </div>
    </>
  )
}
