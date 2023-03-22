import { memo } from "react";

import Image from "next/image";
import { Container, ComicName } from "@/styles/components/comicComponent";
import { Thumbnail } from "../@core/domain/entities/Hero";


interface props {
    title: string;
    thumbnail: Thumbnail;
    thumbnailFormatted: (T: Thumbnail) => string;
}
function Comic({ title, thumbnail, thumbnailFormatted }: props) {
    
    return (
        <Container>
            <Image
                height={200}
                width={150}
                src={thumbnailFormatted(thumbnail)}
                alt={thumbnailFormatted(thumbnail)}
            />
            <ComicName>{title.length > 30 ? `${title.slice(0, 30)}...`: title}</ComicName>
        </Container>
    );
}

export default memo(Comic);