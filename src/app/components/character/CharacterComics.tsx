'use client';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import NextJsImage from '../NextImage';
import Image from 'next/image';
import Slider from 'react-slick';
import { useState, useRef } from 'react';

export default function CharacterComics() {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([
    {
      src: 'https://i.annihil.us/u/prod/marvel/i/mg/4/30/59809e6cb4519.jpg',
      title: 'title',
      description: 'description',
      id: 1,
    },
    {
      src: 'https://i.annihil.us/u/prod/marvel/i/mg/4/30/59809e6cb4519.jpg',
      title: 'title',
      description: 'description',
      id: 2,
    },
    {
      src: 'https://i.annihil.us/u/prod/marvel/i/mg/4/30/59809e6cb4519.jpg',
      title: 'title',
      description: 'description',
      id: 3,
    },
    {
      src: 'https://i.annihil.us/u/prod/marvel/i/mg/4/30/59809e6cb4519.jpg',
      title: 'title',
      description: 'description',
      id: 4,
    },
  ]);
  const [comicIndex, setComicIndex] = useState(0);
  const captionsRef: any = useRef(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    slidesPerRow: 3,
  };

  function openLightbox(index: number) {
    setIsOpen(true);
    setComicIndex(index);
  }

  return (
    <div className="max-w-[550px] px-4">
      <Slider className="cursor-pointer" {...settings}>
        {images.map((comics, i) => (
          <div
            key={comics.id}
            className="w-[100px] bg-red-300 h-[280px] hover:opacity-50 transition-all ease-in-out"
            onClick={() => openLightbox(i)}
          >
            <Image
              src={comics.src}
              alt="comic"
              className="w-full h-full object-cover"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        ))}
      </Slider>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images.map((comics) => ({
          src: comics.src,
          title: comics.title,
          description: comics.description,
          height: 600,
        }))}
        render={{ slide: NextJsImage }}
        index={comicIndex}
        plugins={[Captions]}
        captions={{ ref: captionsRef }}
        on={{
          click: () => {
            (captionsRef.current?.visible
              ? captionsRef.current?.hide
              : captionsRef.current?.show)?.();
          },
        }}
      />
    </div>
  );
}
