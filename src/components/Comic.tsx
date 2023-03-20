import { memo } from "react";

import Image from "next/image";
import { Container, ComicName } from "@/styles/components/comicComponent";


interface props {
    title: string;
}
function Comic({ title }: props) {
    
    return (
        <Container>
            <Image
                height={200}
                width={150}
                src={'/quadrinho.jpg'}
                alt={title}
            />
            <ComicName>{title.length > 30 ? `${title.slice(0, 30)}...`: title}</ComicName>
        </Container>
    );
}

export default memo(Comic);