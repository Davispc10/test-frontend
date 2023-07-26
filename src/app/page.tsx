import Character from "@/components/character"

type dataMarvelProps = {
  id: number
  name: string
  thumbnail: {
    path: string
    extension: string
  }
}

const dataMarvel: dataMarvelProps[] = []

export default function Home() {
  return (
    <main className={`container ${!dataMarvel.length ? 'showLoader' : ''}`}>
      {!dataMarvel.length ? (
        <div className="loader" />
      ) : (
        dataMarvel.map(({ id, name, thumbnail }) => (
          <Character
            key={id}
            name={name}
            thumbnail={`${thumbnail.path}.${thumbnail.extension}`}
          />
        ))
      )}
    </main>
  )
}
