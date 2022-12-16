import { ListCharactersUseCase } from "@core/application/character/list-characters.use-case";
import { ListComicsByCharacterUseCase } from "@core/application/character/list-comics-by-character.use-case";
import { CharacterAdapterFindAllParams } from "@core/domain/adapters/character.adapter";
import { ComicAdapterFindAllParams } from "@core/domain/adapters/comic.adapter";
import { Character, CharacterJSON } from "@core/domain/entities/character";
import { Comic, ComicJSON } from "@core/domain/entities/comic";
import { container, Registry } from "@core/infra/container";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export type UseComicsByCharacterResultProps = {
  comics: Comic[];
  error: any;
  isLoading: boolean;
  isError: boolean;
};

export type UseComicsByCharacterParamsProps = {
  search: {} & ComicAdapterFindAllParams;
  initialData?: Comic[] | ComicJSON[];
};

// listComicsByCharacterUseCase with Http Adapter
const listComicsByCharacterUseCase =
  container.getNamed<ListComicsByCharacterUseCase>(
    Registry.ListComicsByCharacterUseCase,
    Registry.CharacterHttpAdapter
  );

export const useComicsByCharacter: (
  characterId: number,
  params: UseComicsByCharacterParamsProps
) => UseComicsByCharacterResultProps = (
  characterId,
  { search, initialData }
) => {
  const initialDataUsed = useRef(false);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["characters", search],
    queryFn: async () => {
      const { comics } = await listComicsByCharacterUseCase.execute({
        limit: search.limit,
        offset: search.offset,
        orderBy: search.orderBy,
        characterId,
      });
      return comics;
    },
    ...(initialData &&
      // Se a lista de personagens já foi carregada, não carrege novamente os dados iniciais do primeiro carregamento
      !initialDataUsed.current &&
      (() => {
        initialDataUsed.current = true;
        return {
          initialData: initialData.map((comic: Comic | ComicJSON) =>
            // Se o objeto passado for uma lista de Comic, retorna ele mesmo, senão, retorna um novo Comic
            comic instanceof Comic ? comic : new Comic(comic)
          ),
        };
      })()),

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
    comics: data,
    error,
    isLoading,
    isError,
  };
};
