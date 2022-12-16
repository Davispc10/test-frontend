import { ListCharactersUseCase } from "@core/application/character/list-characters.use-case";
import { container, Registry } from "@core/infra/container";
import { CharactersList } from "@components/characters-list/characters-list.component";
import { CharacterAdapterFindAllParams } from "@core/domain/adapters/character.adapter";
import { PaginationInput } from "@components/pagination-input/pagination-input.component";
import { PaginationState } from "@components/pagination-input/pagination-state.hc";
import { PaginationRouteChange } from "@components/pagination-input/pagination-route-change.hc";

const listCharactersUseCase = container.getNamed<ListCharactersUseCase>(
  Registry.ListCharactersUseCase,
  Registry.CharacterHttpAdapter
);

const charactersSearchParams = {
  limit: 20,
  offset: 0,
  orderBy: "name",
} as CharacterAdapterFindAllParams;

export default async function Page() {
  /**
   * Pega os characters na renderização do server component para renderizar
   * a tela com uma primeira visualização.
   *
   * A primeira requisição para esta página irá demorar uns 300ms extras,
   * porém as próximas serão bem mais rápidas pois os dados já estarão em
   * cache no browser, temporariamente.
   */
  const { characters, available, returned } =
    await listCharactersUseCase.execute(charactersSearchParams);

  const pages = Array(Math.round(available / returned))
    .fill(0)
    .map((_, idx) => ({ value: idx + 1 }));

  return (
    <div className="container flex mx-auto mt-10 flex-col justify-center items-center">
      <PaginationState useKeyEvent pages={pages} />
      {/* <PaginationRouteChange replace={{ path: "/characters/:id" }} /> */}
      <div className="flex w-full justify-start">
        <PaginationInput
          showCurrentPage
          message={`🦸 ${available} personagens encontrados.`}
        />
      </div>
      <CharactersList
        limit={charactersSearchParams.limit}
        orderBy={charactersSearchParams.orderBy}
        initialData={characters.map((c) => c.toJSON())}
      />
      <div className="flex w-full justify-start">
        <PaginationInput hiddenArrows />
      </div>
    </div>
  );
}
