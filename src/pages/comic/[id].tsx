import { FactoryMakeListByIdHeroUseCase } from "@/src/@core/factory/factoryListById/FactoryMakeHeroByIdUseCase";
import { Container, ContainerLoading } from "@/styles/pages/comic";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CardCharacterComic from "@/src/components/CardCharacterComic";
import { FactoryMakeComicsUseCase } from "@/src/@core/factory/factoryListComics/FactoryMakeListComicsUseCase";
import { useComics } from "@/src/hooks/useComic";
import { useHero } from "@/src/hooks/useHero";

export default function PageComic() {
    const { query, push } = useRouter();

    const { data, error, isLoading } = useHero(Number(query.id));
    
    //se tiver erro na requisição volta para a tela de heros
    if( error ) {push('/')}

    return (
        <>
            {/* Sempre é bom pensar na experiência de usuário
                e o useQuery me ajuda nessa tarefa
            */}
            {isLoading ? <ContainerLoading>Loading...</ContainerLoading>
                :
                <Container>
                    <CardCharacterComic
                        id={data!.id}
                        name={data!.name}
                        description={data!.description}
                        thumbnail={data!.thumbnail}
                        push={push}
                    />
                </Container>
            }
        </>
    )
}