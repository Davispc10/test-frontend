import CharacterCard from "./CharacterCard"

interface CharactersSectionProps {
    isLoading: boolean
    characters: {
        id: number
        name: string
        description: string
        imageSource: string
    }[]
}

export default function CharactersSection({ isLoading, characters }: CharactersSectionProps) {

    if (isLoading) {
        return <h1 className="text-4xl font-medium font-mono text-center mb-12">Buscando personagens...</h1>
    }

    if (characters.length == 0) {
        return <h1 className="text-4xl font-medium font-mono text-center mb-12">Não foi encontrado nenhum personagem...</h1>
    }

    return (
        <>
            <h1 className="text-6xl font-medium font-mono mb-12">PERSONAGENS EM DESTAQUE</h1>

            <div className="w-full grid grid-cols-5 gap-4 mb-10">
                {characters.map(({ id, name, description, imageSource }) =>
                    <CharacterCard key={id} name={name} description={description} imageSource={imageSource} />)}
            </div>
        </>
    );
}