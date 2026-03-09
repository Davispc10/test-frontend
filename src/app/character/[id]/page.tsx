'use client';
import CharacterDetail from "@/app/components/CharacterDetails";

type PageProps = {
  id: string;
};

const CharacterPage = ({ params }: { params: PageProps }) => {
  return (
    <CharacterDetail id={params.id}></CharacterDetail>
  );
};

export default CharacterPage;
