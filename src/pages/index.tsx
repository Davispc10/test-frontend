import { Button, CardsContainer, HomeContainer, PaginationContainer } from '@/styles/pages/home'
import { FactoryMakeListHeroUseCase } from '../@core/factory/FactoryMakeListHeroUseCase'
import { useQuery } from 'react-query'
import CardHero from '../components/CardHero';
import { useState } from 'react';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';

function Home() {
  const [offset, setOffSet] = useState(0);
  const route = useRouter();
  //offset como array de dependência para quando o estado mudar a função rodar novamente
  const { isLoading, error, data } = useQuery(['query', offset], async () => {
    return FactoryMakeListHeroUseCase(offset).execute();
  });
  return (
    <>
      <HomeContainer>
        <PaginationContainer>
          <Button focus={offset === 0} onClick={() => setOffSet(0)}>1</Button>
          <Button focus={offset === 13} onClick={() => setOffSet(13)}>2</Button>
          <Button focus={offset === 23} onClick={() => setOffSet(23)}>3</Button>
          <Button focus={offset === 33} onClick={() => setOffSet(33)}>4</Button>
          <Button focus={offset === 43} onClick={() => setOffSet(43)}>5</Button>
          <Button focus={offset === 53} onClick={() => setOffSet(53)}>6</Button>
        </PaginationContainer>
        <CardsContainer>
          {data?.map((hero) => (
              <CardHero
                key={hero.id}
                name={hero.name}
                thumbnail={hero.thumbnail}
                isLoading={isLoading}
                onClick={() => route.push(`/${hero.id}`)}
              />
            
          ))
          }
        </CardsContainer>
      </HomeContainer>
    </>
  )
}

export default Home;
