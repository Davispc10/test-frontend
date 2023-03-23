import { useQuery } from "react-query";
import { FactoryMakeListByIdHeroUseCase } from "../@core/factory/factoryListById/FactoryMakeHeroByIdUseCase";


//query.id no array de dependência para o caso de quando nesse componente com um id diferente
//a requisição será refeita
export const useHero = (id: number) => {
    const { isLoading, error, data } = useQuery(['query', id], async () => {
        return FactoryMakeListByIdHeroUseCase().execute(id);
    });

    return {
        isLoading,
        error,
        data
    }
}