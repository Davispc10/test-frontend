'use client'
import { HeroDetailsProps } from "@/utils/types";
import { useEffect, useState } from "react";
import { PUBLIC_KEY, hash, ts } from "@/utils/keys";
import HeroDetails from "../molecules/HeroDetails";
import Loading from "../atoms/Loading";
import ReturnLink from "../atoms/ReturnLink";
import NoContentToPresent from "../atoms/NoContentToPresent";
import HeroImageComics from "../molecules/HeroImageComics";

export default function Hero({ params }: { params: { id: string } }) {
  const [hero, setHero] = useState<HeroDetailsProps>({
    name: "",
    description: "",
    images: [],
    id: 0,
    thumbnail: {
      extension: '',
      path: ''
    }
  })
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getHero() {
      const images: string[] = []
      const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
      const data = await res.json();
      const heroData = data.data.results[0];

      if (heroData.comics && heroData.comics.items && heroData.comics.items.length > 0) {
        for (const item of heroData.comics.items) {
          const res = await fetch(
            `${item.resourceURI}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`
          );
          const comicData = await res.json();
          if (comicData.data.results[0].images) {
            for (const image of comicData.data.results[0].images) {
              images.push(`${image.path}.${image.extension}`);
            }
          }
        }
      }

      setHero({
        name: data.data.results[0].name,
        description: data.data.results[0].description,
        images: images,
        id: parseInt(params.id),
        thumbnail: {
          extension: data.data.results[0].thumbnail.extension,
          path: data.data.results[0].thumbnail.path,
        },
        imgUrl: `${data.data.results[0].thumbnail.path
          }.${data.data.results[0].thumbnail.extension}`
      })

      setIsLoading(false);
    }
    getHero()
  }, [params.id])

  return (
    <main className="px-3 md:px-2 py-3 bg-slate-50">
      <section className="bg-white border rounded px-5 py-3 flex flex-col gap-5 min-h-screen">
        <div className="mx-auto flex flex-col gap-10 w-full">
          <ReturnLink path="/" />
          <HeroDetails description={hero.description} imgUrl={hero.imgUrl} name={hero.name} />
          {isLoading ? (
            <Loading />
          ) : hero.images.length > 0 ? (
            <HeroImageComics images={hero.images} />
          ) : (
            <NoContentToPresent text="Não há imagens para apresentar" />
          )}
        </div>
      </section>
    </main >
  )
}
