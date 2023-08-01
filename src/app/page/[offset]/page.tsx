import { Metadata } from 'next';

import CharacterList from '../../components/characters-list/CharacterList';

export const metadata: Metadata = {
  title: `Marvel Heroes`,
  description: 'Dinheirow Frontend Challenge',
  openGraph: {
    title: `Marvel Heroes`,
    description: 'Dinheirow Frontend Challenge',
    type: 'website',
    locale: 'pt-BR',
    url: `https://marvel-heroes.vercel.app/`,
    images: [
      {
        url: 'https://res.cloudinary.com/domwy2hmn/image/upload/v1690520142/marvel-logo_sta7ve.png',
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Marvel Heroes`,
    description: 'Dinheirow Frontend Challenge',
  },
};

export default function Home({
  params,
}: {
  params: {
    offset: number;
  };
}) {
  return (
    <>
      <CharacterList offset={params.offset} />
    </>
  );
}
