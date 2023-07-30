import { CharacterInfoPropsSchema } from './CharacterInfo.schema'

export const CharacterInfo = ({ items, title }: CharacterInfoPropsSchema) => {
  return (
    <div>
      <h2 className="relative mx-auto w-max text-xl font-bold before:absolute before:bottom-1 before:h-[2px] before:w-full before:bg-purple-500 lg:mx-0">
        {title}
      </h2>

      <ul className="mt-2 flex flex-col gap-2 px-5">
        {items.map((item) => (
          <li key={item.name} className="lg:list-disc">
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
