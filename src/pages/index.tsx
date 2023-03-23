import { useMemo, useState } from 'react';
import Link from 'next/link';

import { useRequest } from '../contexts/requests';

import CardHero from '../components/CardHero';
import { Input } from '../components/Input';
import { Hero } from '../@core/domain/entities/Hero';
import { 
  Button, 
  CardsContainer, 
  ContainerLoading, 
  HomeContainer, 
  PaginationContainer 
} from '@/styles/pages/home'


function Home() {
  // const [offset, setOffSet] = useState(0);
  const [stringPattern, setStringPattern] = useState('');

  //usando meu contexto e hook criado por mim
  const { isLoading, data, offset, handleSetOffset } = useRequest();

  //DataAndSearch vai ser onde vou armazenar o meu data de Heroes
  //E caso alguem digite ele pesquisa no array o heroi com aquele nome
  const dataAndSearch: Hero[] = useMemo(() => {
    if (stringPattern) {
      const search = data?.filter((hero) =>
        hero.name.toLowerCase().includes(stringPattern.toLowerCase())
      );
      return search ? search : [];
    }
    return data ? data : [];
  }, [stringPattern, data]);
 
  return (
    <>
      {isLoading ? <ContainerLoading>Loading...</ContainerLoading>
      : <HomeContainer>
        <PaginationContainer>
          {/* Paginação simples e prática usando o offset para a API 
              Em uma refatoração pode-se fazer um calculo para obter o numero maximo de botões 
              com base no número de herois
          */}
          <Button focus={offset === 0} onClick={() => handleSetOffset(0)}>1</Button>
          <Button focus={offset === 13} onClick={() => handleSetOffset(13)}>2</Button>
          <Button focus={offset === 23} onClick={() => handleSetOffset(23)}>3</Button>
          <Button focus={offset === 33} onClick={() => handleSetOffset(33)}>4</Button>
          <Button focus={offset === 43} onClick={() => handleSetOffset(43)}>5</Button>
          <Button focus={offset === 53} onClick={() => handleSetOffset(53)}>6</Button>
        </PaginationContainer>
        <Input onChange={(event) => setStringPattern(event.target.value)}/>
        <CardsContainer>
          {dataAndSearch?.map((hero) => (
            <Link
              key={hero.id}
              href={`/comic/${hero.id}`}
              style={{ textDecoration: 'none' }}
            >
              <CardHero
                name={hero.name}
                thumbnail={hero.thumbnail}
              />
            </Link>
          ))}
        </CardsContainer>
      </HomeContainer>}
    </>
  )
}

export default Home;
