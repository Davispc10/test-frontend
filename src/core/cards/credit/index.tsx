import Navigator from "@/utils/navigator"

interface IDate {
  data: SiteCredit
}

export default function CardCredit({ data }: IDate) {

  return (
    <Navigator title={`Open the page: ${data.title}`} href={data.externalUrl} target='_blank'>
      <div className='flex flex-row mt-4 hover:bg-zinc-700 rounded w-72 md:w-80 px-2 py-4 transition-all'>
        <figure className='w-14 h-14 md:w-20 md:h-20 min-w-[64px] mr-4 flex justify-center items-center'>
          <img className='w-14 h-14 md:w-20 md:h-20' src={data.imgUrl} alt={`Image of ${data.title}`} />
        </figure>
        <figcaption className='flex flex-col justify-center' >
          <h2 className='text-white text-lg font-semibold mb-1'>{data.title}</h2>
          <p className='text-white text-xs'>{data.explanation}</p>
        </figcaption>
      </div>
    </Navigator>
  )
}
