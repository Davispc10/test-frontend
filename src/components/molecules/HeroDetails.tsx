import CustomImage from "../atoms/CustomImage";

interface HeroDetailsComponentProps {
  name: string
  description: string
  imgUrl?: string
}

export default function HeroDetails({ name, description, imgUrl }: HeroDetailsComponentProps) {
  return (
    <div className="flex flex-col gap-3">
      <CustomImage className='mx-auto rounded-full border w-[150px] object-contain h-[150px] max-w-[150px] max-h-[150px]' width={150} height={150} src={imgUrl ? imgUrl : ''} />
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-2xl font-bold text-center">{name}</h2>
        <p className="max-w-2xl text-justify text-lg">{description}</p>
      </div>
    </div>
  )
}
