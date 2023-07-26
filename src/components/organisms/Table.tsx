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

export default function Table() {
  const [page, setPage] = useState<number>(0)
  const [pageTotal, setPageTotal] = useState<number>(0)
  const [limite, setLimite] = useState<number>(10)
  const [heros, setHeros] = useState<HeroProps[]>([])
  const [searchName, setSearchName] = useState<string>('')
  const PUBLIC_KEY = '7bfe41ebd0f4f4631c41dfe891402576';
  const PRIVATE_KEY = '0f4fcdaac01df9619fdf63bcc699d2a5f87896be';
  const ts = Number(new Date());
  let hash = Md5.hashStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`);

  const getHeros = async () => {
    const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}${searchName ? `&nameStartsWith=${searchName}` : ''}&orderBy=name&limit=${limite}&offset=${page * limite}&apikey=${PUBLIC_KEY}&hash=${hash}`)
    return await res.json()
  }

  const { data, error, isLoading } = useQuery('heros', getHeros);

  useEffect(() => {
    if (data) {
      let paginas = Math.ceil(data.data.total / limite)
      setPageTotal(paginas)
      setHeros(prevHeros => (searchName ? [] : prevHeros));
      data.data.results.forEach((hero: any) => {
        setHeros((prevHeros: any) => {
          const heroExists = prevHeros.some((existingHero: any) => existingHero.id === hero.id);
          if (!heroExists) {
            const imageUrl = hero.thumbnail.path;
            const parts = imageUrl.split('/');
            const finalValue = parts[parts.length - 1];
            if (!hero.description) {
              hero.description = 'Descrição não informada'
            }
            if (finalValue === 'image_not_available') {
              hero.thumbnail.path = 'https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-4'
              hero.thumbnail.extension = 'png'
            }
            return [...prevHeros, hero];
          }
          return prevHeros;
        });
      });
    }
  }, [data, limite, searchName])

  return (
    <>
      {/* Depois mudar o input search para outro componente quando utilizar o Redux */}
      <InputSearch
        label='Pesquise o seu personagem favorito'
        size='lg'
        placeholder='Ex: Spider-Man'
        onChangeFunction={(e) => {
          setSearchName(e.target.value)
        }}
      />
      <table className='w-full'>
        <TableHeader items={titleHeader} />
        <TableBody startHeroIndex={page * limite} endHeroIndex={(page * limite) + limite} items={heros} />
      </table>
      <div>
        <button onClick={() => setPage(page + 1)}>Clique</button>
        <Pagination page={page + 1} totalPages={pageTotal} />
      </div>
    </>
  )
}
