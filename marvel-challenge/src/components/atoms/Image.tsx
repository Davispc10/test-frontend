import React from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  fallbackSrc: string;
  width: number;
  height: number;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, fallbackSrc, width, height }) => {
  const [imgSrc, setImgSrc] = React.useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc(fallbackSrc)}
    />
  );
};

export default CustomImage;