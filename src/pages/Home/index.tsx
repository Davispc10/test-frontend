import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';
import { useAtom } from 'jotai';
import { searchAtom } from '@/atoms/search.atom';

import HomeHeader from '@/pages/Home/components/HomeHeader';
import HeroList from '@/pages/Home/components/HeroList';
import HeroListSkeleton from '@/pages/Home/skeletons/HeroListSkeleton';
import Filter from '@/pages/Home/components/Filter';

function Home() {
  const [search, _] = useAtom(searchAtom);
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
    nameStartsWith: search,
  });

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
