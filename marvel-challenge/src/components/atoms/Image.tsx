import React from 'react';
import Image from 'next/image';

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const CustomImage: React.FC<CustomImageProps> = ({ src, alt, width, height }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default CustomImage;