import Image from 'next/image'
function HeroCard({ name, thumbnail }: any) {
  return (
    <>
      <div className="border rounded-md p-4 bg-gray-500">
        <Image
          className="mx-auto rounded-[5px] h-[150px] w-[280px] object-fit"
          src={thumbnail}
          alt={`${name}`}
          width={150}
          height={100}
        />
        <p className="mt-4 text-xl font-semibold">Name: {name}</p>
      </div>
    </>
  )
}

export default HeroCard
