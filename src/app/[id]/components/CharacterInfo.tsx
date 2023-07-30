import { CharacterInfoPropsSchema } from './CharacterInfo.schema'

export const CharacterInfo = ({ items, title }: CharacterInfoPropsSchema) => {
  return (
    <div>
      <h2 className="relative w-max text-xl before:absolute before:bottom-1 before:h-[2px] before:w-full before:bg-purple-500  ">
        {title}
      </h2>

      <ul className="mt-2 flex flex-col gap-2 px-5">
        {items.map((item) => (
          <li key={item.name} className="list-disc">
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
