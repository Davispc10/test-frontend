import CharacterForm from "@/components/organisms/CharacterForm";
import CardListTemplate from "@/components/templates/CardListTemplate";
import { fetchCharacters } from "@/libs/fetchCharacters";

export default async function Home() {
  const initalData = await fetchCharacters({});

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <CharacterForm />
      <CardListTemplate initData={initalData} />
    </main>
  );
}
