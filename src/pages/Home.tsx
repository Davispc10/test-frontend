import marvelLogo from '@/assets/images/marvel-logo.png';
import FadeUpAnimation from '@/components/animations/FadeUp';
import Pagination from '@/components/Pagination';
import { useContext } from 'react';
import { PaginationContext } from '@/providers/pagination';
import { useHeroes } from '@/features/heroes';

function Home() {
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
  });

  if (heroes.isLoading) return <div>Loading...</div>;

  if (heroes.isError) return <div>Error</div>;

  console.log(heroes.data);

  return (
    <>
      <header className="flex justify-between gap-2 p-6 flex-wrap lg:py-8 lg:px-20  ">
        {/* Brand */}
        <FadeUpAnimation
          className="
          flex lg:flex-row flex-col gap-4 items-center
        "
        >
          <img src={marvelLogo} alt="Marvel Logo" className="lg:w-48 w-32" />
          <h1 className="font-marvel text-2xl text-center lg:text-6xl font-bold uppercase">
            HEROES CODEX
          </h1>
        </FadeUpAnimation>

        {/* Pagination */}
        <Pagination />
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-5 gap-4"></main>
    </>
  );
}

export default Home;
