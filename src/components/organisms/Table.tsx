'use client'

import Pagination from '@/components/molecules/Pagination';
import TableBody from '@/components/molecules/TableBody';
import TableHeader from '@/components/molecules/TableHeader';
import { HeroProps } from '@/utils/types';
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Md5 } from 'ts-md5';
import InputSearch from '../atoms/InputSearch';
import { titleHeader } from '@/utils/titlesHeader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { changePage, changePageTotal, changeSearchName } from '@/redux/features/querySlice';

export default function Table() {
  const dispatch = useDispatch()
  const page = useSelector((state: RootState) => state.query.page)
  const limit = useSelector((state: RootState) => state.query.limit)
  const pageTotal = useSelector((state: RootState) => state.query.pageTotal)
  const searchName = useSelector((state: RootState) => state.query.searchName)
  const [heros, setHeros] = useState<HeroProps[]>([])
  const PUBLIC_KEY = '7bfe41ebd0f4f4631c41dfe891402576';
  const PRIVATE_KEY = '0f4fcdaac01df9619fdf63bcc699d2a5f87896be';
  const ts = Number(new Date());
  let hash = Md5.hashStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

  const getHeros = async () => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}${searchName ? `&nameStartsWith=${searchName}` : ''}&orderBy=name&limit=${limit}&offset=${page * limit}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    return await res.json()
  }

  const { data, error, isLoading, isSuccess } = useQuery('heros', getHeros);

  useEffect(() => {
    if (page >= 0) {
      const getHeros = async () => {
        const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}${searchName ? `&nameStartsWith=${searchName}` : ''}&orderBy=name&limit=${limit}&offset=${page * limit}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        const data = await res.json();

        let paginas = Math.round(data.data.total / limit);
        dispatch(changePageTotal({ pageTotal: paginas }));

        setHeros((prevHeros) => {
          if (searchName) {
            return data.data.results;
          } else {
            const updatedHeros = data.data.results.map((hero: HeroProps) => {
              const heroExists = prevHeros.some((existingHero: HeroProps) => existingHero.id === hero.id);
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

            return [...prevHeros, ...updatedHeros];
          }
        });
      };

      getHeros();
    }
  }, [dispatch, hash, limit, page, searchName, ts]);

  return (
    <>
      {/* Depois mudar o input search para outro componente quando utilizar o Redux */}
      <InputSearch
        label='Pesquise o seu personagem favorito'
        size='lg'
        placeholder='Ex: Spider-Man'
        onChangeFunction={(e) => {
          dispatch(changeSearchName({ searchName: e.target.value }))
        }}
      />
      <table className='w-full'>
        <TableHeader items={titleHeader} />
        <TableBody startHeroIndex={page * limit} endHeroIndex={(page * limit) + limit} items={heros} />
      </table>
      <div>
        <Pagination />
      </div>
    </>
  )
}
