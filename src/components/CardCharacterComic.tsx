import { memo, useCallback, useMemo } from "react";
import { Comics, Thumbnail } from "../@core/domain/entities/Hero";
import Image from "next/image";
import { ButtonBack, CarrouselContainer, Container } from "@/styles/components/cardCharacterComic";
import Comic from "./Comic";

interface props {
    id: number;
    name: string;
    thumbnail: Thumbnail;
    description: string;
    push: (route: string) => void;
    comics: Comics;
}
function CardCharacterComic({ name, thumbnail, description, push, comics }: props) {

    //usando o useMemo para memorizar esses valores para:
    //no caso do componente ser rederizado novamente as funções não precisarem ser refeitas
    const thumbnailFormatted = useMemo(() => {
        return thumbnail?.path?.includes("image_not_available") ?
            '/marvel.svg' :
            `${thumbnail.path}.${thumbnail.extension}`
    }, [thumbnail.path, thumbnail.extension]);

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
                src={thumbnailFormatted}
                alt={name}
            />
            <h3>{name}</h3>
            <h4>{descriptionFormatted}</h4>
            <ButtonBack onClick={() => push('/')}>Voltar</ButtonBack>
            {
                <CarrouselContainer>
                    {
                        comics?.items.map((comic) => (
                            <Comic
                                key={comic.name}
                                title={comic.name}
                            />
                        )) 
                    }
                </CarrouselContainer>
            }
        </Container>
    );
}

export default memo(CardCharacterComic);