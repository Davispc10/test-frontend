import { CardItem, CardItemSkeleton, Wrapper } from "@/components/molecules"
import { InitialStateProps } from "@/contexts/types"
import { CharacterProps } from "@/types/CharacterProps"

interface Props {
    state: InitialStateProps;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    displayedCharacters: CharacterProps[];
    renderImage: (character: CharacterProps) => JSX.Element;
    setPage: (selectedPage: { selected: number }) => void; // Adicione a função setPage no Props
}

export const Content = ({ state, onChange, displayedCharacters, renderImage, setPage }: Props) => {

    return (
        <div className="relative">
            <div className="flex">
                <Wrapper
                    state={state}
                    onChange={onChange}
                    placeholder="Buscar pelo nome do personagem"
                    loading={state.loading}
                    setPage={setPage}
                />
            </div>

            {state.loading ? <CardItemSkeleton quantity={20} /> : (
                <div id="content" className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {displayedCharacters.map((character: CharacterProps) => (
                        <CardItem
                            key={character.id}
                            character={character}
                            renderImage={renderImage}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}