import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query'

import { FactoryMakeListUseCase } from '../@core/factory/factoryListAll/FactoryMakeListHeroUseCase'

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
  const [offset, setOffSet] = useState(0);
  const [stringPattern, setStringPattern] = useState('');

  //offset como array de dependência para quando o estado mudar a função rodar novamente
  const { isLoading, error, data } = useQuery(['query', offset], async () => {
    return FactoryMakeListUseCase(offset).execute();
  });

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
      {isLoading ? <ContainerLoading>Carregando...</ContainerLoading>
      : <HomeContainer>
        <PaginationContainer>
          <Button focus={offset === 0} onClick={() => setOffSet(0)}>1</Button>
          <Button focus={offset === 13} onClick={() => setOffSet(13)}>2</Button>
          <Button focus={offset === 23} onClick={() => setOffSet(23)}>3</Button>
          <Button focus={offset === 33} onClick={() => setOffSet(33)}>4</Button>
          <Button focus={offset === 43} onClick={() => setOffSet(43)}>5</Button>
          <Button focus={offset === 53} onClick={() => setOffSet(53)}>6</Button>
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
                isLoading={isLoading}
              />
            </Link>

          ))
          }
        </CardsContainer>
      </HomeContainer>}
    </>
  )
}

export default Home;
