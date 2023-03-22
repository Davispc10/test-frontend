import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';
import HomeHeader from '@/pages/Home/components/HomeHeader';
import HeroCard from '@/pages/Home/components/HeroCard';

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

      <main className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-8 pt-2">
        {/* Hero list (hero card) */}
        {heroes.data.map((hero) => (
          <HeroCard hero={hero} key={hero.id} />
        ))}
      </main>
    </>
  );
}

export default Home;
