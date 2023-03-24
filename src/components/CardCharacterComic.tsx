import { memo, useCallback, useMemo } from "react";
import { Thumbnail } from "../@core/domain/entities/Hero";
import Image from "next/image";
import { ButtonBack, CarrouselContainer, Container } from "@/styles/components/cardCharacterComic";
import Comic from "./Comic";
import { useComics } from "../hooks/useComic";

interface CardCharacterProps {
    id: number;
    name: string;
    thumbnail: Thumbnail;
    description: string;
    push: (route: string) => void;
}
function CardCharacterComic({ name, thumbnail, description, push, id }: CardCharacterProps) {
    
    //hook criado por mim, caso não usasse ele aqui, teria que passar os comics via props
    //o que eu acho muito "feio"
    const { dataComics, errorComic, loadingComic } = useComics(id);

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

    if( errorComic ) {push('/')}

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
                        loadingComic ? <div style={{ width: '500px', background: 'white' }}>Loading...</div> :
                        dataComics?.map((comic) => (
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