import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useCharacterDetails } from '../../hooks/useCharacterDetails';
import { useCharacterComics } from '../../hooks/useCharacterComics';
import ComicList from '../../components/organisms/ComicList';
import Button from '../../components/atoms/Button';
import Header from '../../components/organisms/Header';

const CharacterDetails: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: character, isLoading: characterLoading, error: characterError } = useCharacterDetails(Number(id));
  const { data: comics, isLoading: comicsLoading, error: comicsError } = useCharacterComics(Number(id));

  if (characterLoading || comicsLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (characterError || comicsError) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-red-600 text-2xl">Erro ao carregar dados</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Button onClick={() => router.back()} className="mb-6">
          Voltar para página inicial
        </Button>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <Image
                src={character?.thumbnail || '/marvel-logo.png'}
                alt={character?.name || 'Character'}
                width={400}
                height={400}
                className="h-full w-full object-cover md:w-48"
              />
            </div>
            <div className="p-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{character?.name}</h1>
              <p className="text-gray-600 mb-4">{character?.description}</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mt-12 mb-6">Quadrinhos que o {character?.name} participa</h2>
        <ComicList comics={comics || []} />
      </main>
    </div>
  );
};

export default CharacterDetails;