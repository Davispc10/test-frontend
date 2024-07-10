import ComicCard from "@/components/molecules/comicCard/ChomicCard";
import { IComic } from "@/interfaces/CharacterComics";
import React from "react";

const ComicList = ({ data }: { data?: IComic[] }) => {
  return (
    <div className="flex justify-center flex-wrap gap-6">
      {data && data.length > 0 ? (
        data.map((comic) => <ComicCard key={comic.id} comic={comic} />)
      ) : (
        <p>Nenhum quadrinho encontrado para o personagem!</p>
      )}
    </div>
  );
};

export default ComicList;
