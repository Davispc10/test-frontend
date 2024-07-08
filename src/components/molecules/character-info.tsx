import { Description } from '../atoms/description';
import { NoDescription } from '../atoms/no-description';
import { Title } from '../atoms/title';

type CharacterInfoProps = {
  name?: string;
  description?: string;
};

export function CharacterInfo({ description, name }: CharacterInfoProps) {
  return (
    <div className="flex flex-col gap-2">
      <Title text={name} className="text-white" />
      {description ? <Description /> : <NoDescription />}
    </div>
  );
}
