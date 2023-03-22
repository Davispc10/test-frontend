import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';

import HomeHeader from '@/pages/Home/components/HomeHeader';
import HeroList from '@/pages/Home/components/HeroList';
import HeroListSkeleton from '@/pages/Home/skeletons/HeroListSkeleton';
import Filter from '@/pages/Home/components/Filter';

function Home() {
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
  });

  console.log('Page: ', currentPage);
  console.log('Heroes: ', heroes.data);

  return (
    <>
      <HomeHeader />

      {/* Filter  */}
      <Filter />

      {heroes.isLoading || !heroes.data ? (
        <HeroListSkeleton />
      ) : (
        <HeroList heroes={heroes.data} />
      )}
    </>
  );
}

export default Home;
