import { FactoryMakeListByIdHeroUseCase } from "@/src/@core/factory/factoryListById/FactoryMakeHeroByIdUseCase";
import { Container, ContainerLoading } from "@/styles/pages/comic";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CardCharacterComic from "@/src/components/CardCharacterComic";

export default function PageComic() {
    const { query, push } = useRouter();

    //query.id no array de dependência para o caso de quando nesse componente com um id diferente
    //a requisição será refeita
    const { isLoading, error, data } = useQuery(['query', query.id], async () => {
        return FactoryMakeListByIdHeroUseCase().execute(Number(query.id));
    });
    
    //tiver erro na requisição volta para a tela de heros
    if(error) {push('/')}
    return (
        <>
            {/* Sempre é bom pensar na experiência de usuário
                e o useQuery me ajuda nessa tarefa
            */}
            {isLoading ? <ContainerLoading>Loading...</ContainerLoading>
                :
                <Container>
                    <CardCharacterComic
                        name={data!.name}
                        id={data!.id}
                        description={data!.description}
                        thumbnail={data!.thumbnail}
                        comics={data!.comics}
                        push={push}
                    />
                </Container>
            }
        </>
    )
}