import { useContext } from "react";
import { PaginationContext } from "@/providers/pagination";
import { useHeroes } from "@/features/heroes";
import { useAtom } from "jotai";
import { searchAtom } from "@/atoms/search.atom";

import HomeHeader from "@/components/hero/HomeHeader";
import Filter from "@/components/hero/Filter";
import HeroListSkeleton from "@/components/hero/skeletons/HeroListSkeleton";
import HeroList from "@/components/hero/HeroList";
import Head from "next/head";

function Home() {
  const [search, _] = useAtom(searchAtom);
  const { currentPage } = useContext(PaginationContext);

  const heroes = useHeroes({
    page: currentPage,
    nameStartsWith: search ? search : undefined,
  });

  return (
    <>
      <Head>
        <title>Marvel Characters Codex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="Learn More About your favorite Marvel Characters"
        />
        <meta name="og:title" content="Marvel Characters Codex" />
        <meta
          name="og:description"
          content="Learn More About your favorite Marvel Characters"
        />
        <meta
          name="og:image"
          content="https://marvelcharacterscodex.vercel.app/images/marvel-logo.png"
        />
      </Head>

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
