import { memo, useMemo } from "react";
import { Container, HeroName } from "@/styles/components/cardHero";
import { Thumbnail } from "../@core/domain/entities/Hero";
import Image from "next/image";

interface props {
    name: string;
    thumbnail: Thumbnail;
}
function CardHero({ name, thumbnail }: props) {

    const thumbnailFormatted = useMemo(() => {
        return thumbnail?.path?.includes("image_not_available") ?
            '/marvel.svg' :
            `${thumbnail.path}.${thumbnail.extension}`
    }, [thumbnail]);

    return (
        <Container >
            <Image
                height={280}
                width={280}
                src={thumbnailFormatted}
                alt={name}
            />
            <HeroName>{name}</HeroName>
        </Container>
    );
}

export default memo(CardHero);