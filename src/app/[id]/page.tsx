import CharacterCard from '../../components/character/CharacterCard';
import * as U from '@/utils';
import * as S from '@/services';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: {
    id: string;
  };
}): Promise<Metadata> => {
  const { mainName, descriptionText, image } = await S.retrieveCharacterInfo(
    params.id
  );
  return U.getMetadataInfo(mainName, descriptionText, image, params.id);
};

export default async function TaskDetails({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { mainName, subName, descriptionText, image } =
    await S.retrieveCharacterInfo(params.id);

  const comics = await S.retrieveCharacterComicsInfo(params.id);

  return (
    <CharacterCard
      name={mainName}
      subName={subName}
      description={descriptionText}
      image={image}
      comics={comics}
    />
  );
}
