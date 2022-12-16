import { Button } from "@components/ui/button/button.component";
import { GetCharacterUseCase } from "@core/application/character/get-character.use-case";
import { ListAllCharactersUseCase } from "@core/application/character/list-all-characters.use-case";
import { Character } from "@core/domain/entities/character";
import { container, Registry } from "@core/infra/container";
import { redirect } from "next/navigation";
import { ArrowSmallLeftIcon } from "@heroicons/react/24/solid";
import { CharacterProfile } from "@components/character-profile/character-profile.component";

const getCharactersUseCase = container.getNamed<GetCharacterUseCase>(
  Registry.GetCharacterUseCase,
  Registry.CharacterHttpAdapter
);

const listAllCharactersUseCase = container.getNamed<ListAllCharactersUseCase>(
  Registry.ListAllCharactersUseCase,
  Registry.CharacterHttpAdapter
);

export async function generateStaticParams() {
  const { characters } = await listAllCharactersUseCase.execute({
    orderBy: "name",
    max: 100, // Generate static pages for the first 100 characters
  });

  return characters.map((character) => ({
    id: String(character.id),
  }));
}

export default async function Page({ params }) {
  const { id } = params;

  // Redirect if invalid param
  if (Number.isNaN(parseInt(id))) return redirect("/characters");

  /**
   * Pega as comics na renderização do server component para renderizar
   * a tela com uma primeira visualização.
   *
   * A primeira requisição para esta página irá demorar uns 300ms extras,
   * porém as próximas serão bem mais rápidas pois os dados já estarão em
   * cache no browser, temporariamente.
   */
  const character: Character = await getCharactersUseCase
    .execute(id)
    .catch((res) => null);

  // Redirect if not found character
  if (!character) return redirect("/characters");

  return (
    <div className="container flex mx-auto mt-10 flex-col justify-center items-center">
      {/* <h2 className="text-3xl font-bold text-marvel-typo">{character.name}</h2> */}

      <CharacterProfile character={character.toJSON()} />
    </div>
  );
}
