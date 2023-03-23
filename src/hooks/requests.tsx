import { 
    createContext,
    useContext, 
    ReactNode, 
    useState
} from "react";
import { useQuery } from "react-query";

import { Hero } from "../@core/domain/entities/Hero";
import { FactoryMakeListUseCase } from "../@core/factory/factoryListAll/FactoryMakeListHeroUseCase";

interface RequestContextData {
    offset: number;
    handleSetOffset: (value: number) => void;
    error: any;
    isLoading: boolean;
    data: Hero[] | undefined;
}

interface RequestProviderProps {
    children: ReactNode;
}

const RequestContext = createContext<RequestContextData>({} as RequestContextData);

function RequestProvider({ children }: RequestProviderProps) {
    const [offset, setOffSet] = useState(0);

    //offset como array de dependência para quando o estado mudar a função rodar novamente
    const { isLoading, error, data } = useQuery(['query', offset], async () => {
        return FactoryMakeListUseCase(offset).execute();
    });

    function handleSetOffset(value: number){
        setOffSet(value);
    }

    return <RequestContext.Provider value={{
        data,
        error,
        isLoading,
        offset,
        handleSetOffset
    }}>
        {children}
    </RequestContext.Provider>
}

//Criando o meu hook de request
function useRequest(): RequestContextData {
    const context = useContext(RequestContext)
    return context;
}

export { RequestProvider, useRequest }