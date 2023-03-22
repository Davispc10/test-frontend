import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';
import HomeHeader from '@/pages/Home/components/HomeHeader';
import HeroCard from '@/pages/Home/components/HeroCard';
import HeroList from './components/HeroList';

function Home() {
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
  });

  if (heroes.isLoading || !heroes.data) return <div>Loading...</div>;

  if (heroes.isError) return <div>Error</div>;

  console.log('Page: ', currentPage);
  console.log('Heroes: ', heroes.data);

  return (
    <>
      {/* @TODO: Componentization */}
      <HomeHeader />

      <HeroList heroes={heroes.data} />
    </>
  );
}

export default Home;
