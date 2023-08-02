import { retrieveCharactersList } from '@/services';

import CharacterListCards from './CharacterListCards';

interface CharacterListProps {
  offset?: number;
  name?: string;
}

export default async function CharacterList({
  offset,
  name,
}: CharacterListProps) {
  async function getCharacters() {
    try {
      const response: any = await retrieveCharactersList(offset ?? 0, name);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const results = await getCharacters();

  return (
    <section className="flex w-full flex-col items-center max-[1160px]:h-[300px] max-[1160px]:justify-center">
      <CharacterListCards characters={results} offset={offset} />
    </section>
  );
}
