import { FactoryMakeListByIdHeroUseCase } from "@/src/@core/factory/factoryListById/FactoryMakeHeroByIdUseCase";
import { Container, ContainerLoading } from "@/styles/pages/comic";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import CardCharacterComic from "@/src/components/CardCharacterComic";

export default function PageComic() {
    const { query, push } = useRouter();

    const { isLoading, error, data } = useQuery(['query'], async () => {
        return FactoryMakeListByIdHeroUseCase().execute(Number(query.id));
    });
    
    if(error) {push('/')}
    return (
        <>
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