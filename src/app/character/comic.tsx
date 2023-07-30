import React from 'react';

export default function Comic(props) {
  const thumbnailComic = props.comic.thumbnail.path !== "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ?
    `${props.comic.thumbnail.path}.${props.comic.thumbnail.extension}` :
    `/Marvel-Logo.png`;

  return (
    // Função para mostrar o card das comics
    <div className="h-24 w-20 m-4 rounded-lg bg-gradient-to-b from-red-500 to-red-900 columns-1 p-1">
      <div className="relative h-full">
        <img
          src={thumbnailComic}
          alt={props.comic.title}
          className="absolute object-fit w-full h-full rounded-lg z-index-0"
        />
      </div>
    </div>
  )
}
