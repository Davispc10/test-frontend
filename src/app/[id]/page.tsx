import CharacterCard from "../components/character/CharacterCard";

export default function TaskDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <CharacterCard />;
}
