type CharacterDetailsPageProps = {
  params: {
    characterId: string
  }
}

export default function CharacterDetailsPage({
  params: { characterId },
}: CharacterDetailsPageProps) {
  return <h1>CharacterDetailsPage: {characterId}</h1>
}
