'use client';

import { Suspense } from "react";
import CharacterList from "./components/CharacterList";
import CharacterListSkeleton from "./components/skeletons/CharacterListSkeleton";

const Home = () => {
  return (
    <Suspense fallback={<CharacterListSkeleton />}>
      <CharacterList />
    </Suspense>
  );
};

export default Home;
