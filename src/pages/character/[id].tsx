import { useComics } from "@/features/comics";
import { useHeroDetails } from "@/features/heroes/hooks/useHeroDetails";
import { useRouter } from "next/router";

import CharacterInformation from "@/components/comics/CharacterInformation";
import MainImage from "@/components/comics/MainImage";
import FullscrenLoader from "@/components/FullscrenLoader";
import { useEffect } from "react";
import ErrorPage from "@/components/ErrorPage";
import Head from "next/head";

const Character = () => {
  // Parametros de entrada
  const router = useRouter();
  const id = Number(router.query.id);

  useEffect(() => {
    if (isNaN(id)) {
      router.push("/");
    }
  }, []);

  const heroDetails = useHeroDetails({
    id,
  });

  const comicDetails = useComics({
    id,
  });

  if (heroDetails.isLoading || comicDetails.isLoading) {
    return <FullscrenLoader />;
  }

  if (heroDetails.isError || comicDetails.isError) {
    return <ErrorPage />;
  }

  return (
    <>
      <Head>
        <title>{heroDetails.data?.name} - Marvel Characters Codex</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content={`${heroDetails.data?.name} - Marvel Characters Codex`}
        />
        <meta
          name="og:title"
          content={`${heroDetails.data?.name} - Marvel Characters Codex`}
        />
        <meta
          name="og:description"
          content={`
          Learn More About ${heroDetails.data?.name} on Marvel Characters Codex
        `}
        />
        <meta
          name="og:image"
          content={`${heroDetails.data?.thumbnail.path}.${heroDetails.data?.thumbnail.extension}`}
        />
      </Head>

      <main className="items-center min-h-screen gap-4 md:flex md:flex-row md:h-screen">
        {/* Hero image */}
        <MainImage thumbnail={heroDetails.data?.thumbnail} />

        {/* Hero Information */}
        <CharacterInformation
          hero={heroDetails.data}
          comics={comicDetails.data}
        />
      </main>
    </>
  );
};

export default Character;
