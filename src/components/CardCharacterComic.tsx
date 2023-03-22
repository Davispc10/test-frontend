import { memo, useCallback, useMemo } from "react";
import { Thumbnail } from "../@core/domain/entities/Hero";
import Image from "next/image";
import { ButtonBack, CarrouselContainer, Container } from "@/styles/components/cardCharacterComic";
import Comic from "./Comic";
import { FactoryMakeComicsUseCase } from "../@core/factory/factoryListComics/FactoryMakeListComicsUseCase";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { Comic as ComicInterface } from "../@core/domain/entities/Comic";

interface props {
    name: string;
    thumbnail: Thumbnail;
    description: string;
    push: (route: string) => void;
    comics: ComicInterface[];
    isLoadingComic: boolean;
}
function CardCharacterComic({ name, thumbnail, description, push, comics, isLoadingComic }: props) {
    
    //usando o useCallback para memorizar esta função
    //useCallback memoriza funções, para não precisarem ser refeitas na proxima rederização
    const thumbnailFormatted = useCallback((T: Thumbnail) => {
        return T?.path?.includes("image_not_available") ?
            '/marvel.svg' :
            `${T.path}.${T.extension}`
    }, []);

    //usando o useMemo para memorizar esse valor
    //useMemo memoriza valor, para não precisar ser refeito na proxima rederização
    const descriptionFormatted = useMemo(() => {
        return description ?
            description :
            'Description not informed'
    }, [description]);

    return (
        <Container>
            <Image
                height={280}
                width={280}
                src={thumbnailFormatted(thumbnail)}
                alt={name}
            />
            <h3>{name}</h3>
            <h4>{descriptionFormatted}</h4>
            <ButtonBack onClick={() => push('/')}>Voltar</ButtonBack>
            {
                <CarrouselContainer>
                    {
                        isLoadingComic ? <div style={{ width: '500px', background: 'white' }}>Loading...</div> :
                        comics?.map((comic) => (
                            <Comic
                                key={comic.id}
                                title={comic.title}
                                thumbnail={comic.thumbnail}
                                thumbnailFormatted={thumbnailFormatted}
                            />
                        )) 
                    }
                </CarrouselContainer>
            }
        </Container>
    );
}

export default memo(CardCharacterComic);