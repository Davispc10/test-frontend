'use client'
import { HeroDetails, HeroImages } from "@/utils/types";
import Link from "next/link"
import { useEffect, useState } from "react";
import CustomImage from "@/components/atoms/CustomImage";
import { PUBLIC_KEY, hash, ts } from "@/utils/keys";

export default function Hero({ params }: { params: { id: string } }) {
  const [hero, setHero] = useState<HeroDetails>({
    name: "",
    description: "",
    images: [],
    id: 0,
    thumbnail: {
      extension: '',
      path: ''
    }
  })
  useEffect(() => {
    async function getHero() {
      const images: HeroImages[] = []
      const res = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${params.id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
      const data = await res.json();
      data.data.results[0].comics.items.forEach(async (item: { resourceURI: string }) => {
        const res = await fetch(`${item.resourceURI}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash}`);
        const data = await res.json();
        data.data.results[0].images.forEach((image: HeroImages) => {
          images.push(image)
        })
      })
      if (!data.data.results[0].description) {
        data.data.results[0].description = 'Descrição não informada'
      }
      setHero({
        name: data.data.results[0].name,
        description: data.data.results[0].description,
        images: images,
        id: parseInt(params.id),
        thumbnail: {
          extension: data.data.results[0].thumbnail.extension,
          path: data.data.results[0].thumbnail.path,
        }
      })
    }
    getHero()
  }, [params.id])

  return (
    <main className="px-3 md:px-10 py-3 bg-slate-50">
      <div className="mx-auto flex flex-col gap-3 w-full">
        <Link href={'/'}>&larr; Voltar</Link>
        <div>
          <CustomImage className='mx-auto rounded-full border w-[100px] object-contain h-[100px] max-w-[100px] max-h-[100px]' width={0} height={0} src={`${hero.thumbnail.path}.${hero.thumbnail.extension}`} />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">{hero.name}</h2>
            <p className="">{hero.description}</p>
          </div>
        </div>

        {
          hero
            ? hero.images.map((image: HeroImages, index: number) => {
              return (
                <CustomImage key={index} className="w-[150px] h-[200]" width={0} height={0} src={`${image.path}.${image.extension}`} />
              )
            })
            : <p>Não há imagens para apresentar</p>
        }
      </div>
    </main >
  )
}
