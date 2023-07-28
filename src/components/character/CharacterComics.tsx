'use client';

import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import NextJsImage from '../NextImage';
import Image from 'next/image';
import Slider from 'react-slick';
import { useState, useRef } from 'react';

interface CharacterComicsProps {
  comics: any[];
}

export default function CharacterComics({ comics }: CharacterComicsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [comicIndex, setComicIndex] = useState(0);
  const captionsRef: any = useRef(null);

  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    slidesPerRow: 3,
    draggable: false,
    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesPerRow: 2,
        },
      },
    ],
  };

  function openLightbox(index: number) {
    setIsOpen(true);
    setComicIndex(index);
  }

  return (
    <div className="max-w-[550px] px-4">
      <Slider className="cursor-pointer" {...settings}>
        {comics.map((comic, i) => (
          <div
            key={comic?.title}
            className={`w-[100px] h-[280px] hover:opacity-50 transition-all ease-in-out bg-[url('https://media.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif')] bg-center`}
            onClick={() => openLightbox(i)}
          >
            <Image
              src={comic?.image}
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
        slides={comics.map((comic) => ({
          src: comic?.image,
          title: comic?.title,
          description: comic?.descriptionText,
          height: 700,
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
