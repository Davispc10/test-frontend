import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';
import HomeHeader from '@/pages/Home/components/HomeHeader';
import HeroCard from '@/pages/Home/components/HeroCard';
import HeroList from './components/HeroList';
import HeroListSkeleton from './skeletons/HeroListSkeleton';

function Home() {
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
  });

  console.log('Page: ', currentPage);
  console.log('Heroes: ', heroes.data);

  return (
    <>
      {/* @TODO: Componentization */}
      <HomeHeader />

      {heroes.isLoading || !heroes.data ? (
        <HeroListSkeleton />
      ) : (
        <HeroList heroes={heroes.data} />
      )}
    </>
  );
}

export default Home;
