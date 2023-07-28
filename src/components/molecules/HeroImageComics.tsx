import CustomImage from "../atoms/CustomImage";

interface HeroImagesComicsProps {
  images: string[]
}

export default function HeroImagesComics({ images }: HeroImagesComicsProps) {
  return (
    <div className="flex gap-6 overflow-x-auto max-w-full" >
      {images.map((image: string, index: number) => (
        <CustomImage key={index} className="w-[150px] h-[200px]" width={150} height={200} src={image} />
      ))}
    </div>
  )
}
