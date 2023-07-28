import { HeroProps } from "@/utils/types";
import { MOCK_DATA, checkIfHeroExistTest } from "./helpers";

describe('checkIfHeroExist function', () => {
  it('should update heros array correctly', () => {
    const heros: HeroProps[] = [
      {
        id: 1,
        name: 'Hero 1',
        description: 'Description 1',
        thumbnail: { path: 'path1', extension: 'ext1' },
        imgUrl: 'imgUrl1',
      },
    ];

    const updatedHeros = checkIfHeroExistTest(MOCK_DATA, heros);

    const expectedHeros: HeroProps[] = [
      ...heros,
      ...MOCK_DATA,
    ];
    expect(updatedHeros).toEqual(expectedHeros);
  });
});