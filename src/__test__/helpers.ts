import { HeroProps } from "@/utils/types";

export const MOCK_DATA: HeroProps[] = [
  {
    id: 2,
    name: 'Hero 2',
    description: 'Description 2',
    thumbnail: { path: 'path2', extension: 'ext2' },
    imgUrl: 'imgUrl2',
  },
];

export function checkIfHeroExistTest(data: any, heros: HeroProps[]) {
  const updatedHeros = data.map((hero: HeroProps) => {
    const heroExists = heros.some((existingHero: HeroProps) => existingHero.id === hero.id);
    if (!heroExists) {
      const imageUrl = hero.thumbnail.path;
      const parts = imageUrl.split('/');
      const finalValue = parts[parts.length - 1];
      if (!hero.description) {
        hero.description = 'Descrição não informada';
      }
      if (finalValue === 'image_not_available') {
        hero.thumbnail.path = 'https://logodownload.org/wp-content/uploads/2017/05/marvel-logo-4';
        hero.thumbnail.extension = 'png';
      }
      return hero;
    }
  }).filter(Boolean);

  heros.push(...updatedHeros);

  return [...heros, ...updatedHeros];
}
