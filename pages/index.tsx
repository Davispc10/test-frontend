import { NextPage } from "next";
import Head from "next/head";
import React, { FormEvent } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { fetchCharacters } from "../libs/fetchCharacters";

import { LoaderCircle, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const client = new QueryClient();

  const searchByName = router.query.characterName as string | undefined;

  console.log(searchByName);

  const { data, error, isLoading } = useQuery({
    queryKey: ["characters", 10],
    queryFn: () => fetchCharacters({ limit: 10, nameStartsWith: searchByName }),
  });

  function handleSubmitFilters(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const characterName = formData.get("characterName")?.toString() || "";

    router.push({
      pathname: router.pathname,
      query: { characterName },
    });
  }

  return (
    <main className="bg-neutral-900 h-screen w-full flex items-center justify-center">
      <Head>
        <title>Teste Dinheirow</title>
      </Head>

      <div className="flex flex-col max-w-screen-lg bg-neutral-400 w-full h-1/2 rounded-lg shadow-md shadow-neutral-300">
        <form onSubmit={handleSubmitFilters} className="flex justify-end p-2">
          <label className="flex gap-2 bg-white p-2 rounded-md">
            <input
              type="text"
              name="characterName"
              className="bg-transparent outline-none w-64"
              placeholder="Pequise por nome do personagem"
            />
            <button type="submit">
              <Search />
            </button>
          </label>
        </form>

        {isLoading ? (
          <p>
            Carregando <LoaderCircle className="animate-spin" />
          </p>
        ) : (
          data?.results.map((char) => <div key={char?.id}>{char?.name}</div>)
        )}
      </div>
    </main>
  );
};

export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["characters", 10],
    queryFn: () => fetchCharacters({ limit: 10 }),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Home;
