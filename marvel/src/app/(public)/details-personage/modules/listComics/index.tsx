import { ListComicsProps } from '@/components/types'

export function ListComics({ comics }: { comics: ListComicsProps }) {
  if (comics.length === 0) {
    return (
      <div>
        <p className="mt-4 text-xl font-semibold text-center">
          No comics for this character found
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mt-4 text-xl font-semibold ml-2">Character Comics</h2>
      <ul className="w-full grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-6 py-4">
        {comics.map((comic) => (
          <li
            key={comic.id}
            className="p-2 rounded shadow-sm bg-white flex flex-col"
          >
            <img
              src={comic.thumbnail.path}
              alt={`comic ${comic.title}`}
              className="flex-1 object-contain rounded"
            />

            <p className="text-ellipsis line-clamp-1 text-sm mt-2 text-center">
              {comic.title}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
