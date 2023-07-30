import React from 'react'

import { Metadata, ResolvingMetadata } from 'next'
import { useRouter } from 'next/router'
// import HomePainel from '@/painels/home'
import CharacterPainel from '@/painels/character'

import Nav from '@/utils/nav'
import { customMetadata } from '@/utils/meta/index';
import MarvelHelper from '@/helpers/MarvelHelper';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60


export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id

  const data = new MarvelHelper()

  const response = await data.getCharacterById(Number(id));
  const result = response.data.results[0]

  const metadata: Metadata = customMetadata({
    common: {
      title: `${result.name} - Marvel Character`,
      description: result.description,
      imagemUrl: `${result.thumbnail.path}.${result.thumbnail.extension}`,
    }
  })

  return {
    ...metadata
  }
}

export default async function Page({ params, searchParams }: Props) {
  const id = params["id"];
  const data = new MarvelHelper();
  const response = await data.getCharacterById(Number(id));
  const result = response.data.results[0]

  return (
    <>
      <Nav />
      <CharacterPainel data={result} />
    </>
  );
}
