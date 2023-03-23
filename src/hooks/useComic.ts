import { useQuery } from "react-query";
import { FactoryMakeComicsUseCase } from "../@core/factory/factoryListComics/FactoryMakeListComicsUseCase";

export const useComics = (id: number) => {
    const { isLoading: loadingComic, error: errorComic, data: dataComics } = useQuery(['query'], async () => {
        return FactoryMakeComicsUseCase().execute(Number(id));
    });

    return {
        loadingComic,
        errorComic,
        dataComics
    }
}