import { ListCharactersUseCase } from "@core/application/character/list-characters.use-case";
import { CharacterAdapterFindAllParams } from "@core/domain/adapters/character.adapter";
import { Character, CharacterJSON } from "@core/domain/entities/character";
import { container, Registry } from "@core/infra/container";
import { useQuery } from "@tanstack/react-query";

export type UseCharactersResultProps = {
  characters: Character[];
  error: any;
  isLoading: boolean;
  isError: boolean;
};
export type UseCharactersParamsProps = {
  search: { nameStartsWith?: string } & CharacterAdapterFindAllParams;
  initialData?: Character[] | CharacterJSON[];
};

// listCharacterUseCase with Http Adapter
const listCharacterUseCase = container.getNamed<ListCharactersUseCase>(
  Registry.ListCharactersUseCase,
  Registry.CharacterHttpAdapter
);

export const useCharacters: (
  params: UseCharactersParamsProps
) => UseCharactersResultProps = ({ search, initialData }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: [
      "characters",
      search.offset,
      search.limit,
      search.orderBy,
      // TODO: implementing nameStartsWith after
      search.nameStartsWith || "",
    ],
    queryFn: () => {
      return listCharacterUseCase.execute({
        limit: search.limit,
        offset: search.offset,
        orderBy: search.orderBy,
      });
    },
    ...(initialData && {
      initialData: initialData.map((character: Character | CharacterJSON) =>
        // Se o objeto passado for uma lista de Character, retorna ele mesmo, senão, retorna um novo Character
        character instanceof Character ? character : new Character(character)
      ),
    }),
  });

  return {
    characters: data,
    error,
    isLoading,
    isError,
  };
};
