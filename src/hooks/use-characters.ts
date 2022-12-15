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
    queryKey: ["characters", search],
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

    /**
     * Pela necessidade de limitar a quantidade de requests por sessão,
     * iremos aumentar o cache time e o stale time o máximo possível, para
     * que o usuário não precise fazer muitas requisições para a API.
     *
     * Pois a aplicação não sofrerá grandes mudanças de dados, e o usuário
     * não irá perceber a alteração.
     *
     * Em um projeto para produção, teríamos que adotar outros meios, como
     * por exemplo, um sistema de cache no servidor e/ou um banco de dados
     * para armazenar as informações da api, para que limitemos a quantidade
     * dos requests realizados para API Marvel que possui apenas 3000 requests
     * por dia como limite.
     */
    cacheTime: 1000 * 60 * 60 * 4, // 4 hours
    staleTime: 1000 * 60 * 60 * 2, // 2 hours

    retryDelay: 1000 * 1, // 1 seconds
    retry: 3, // security limit
  });

  return {
    characters: data,
    error,
    isLoading,
    isError,
  };
};
