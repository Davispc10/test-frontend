import { HeroProps } from '@/utils/types';
import { checkIfHeroExistTest } from './helpers';

describe('checkIfHeroExist', () => {
  it('should update heros array correctly', async () => {
    const heros: HeroProps[] = [
      {
        id: 1,
        name: 'Existing Hero 1',
        description: 'Existing Description 1',
        thumbnail: {
          path: 'path1',
          extension: 'ext1',
        },
      },
      {
        id: 2,
        name: 'Existing Hero 2',
        description: 'Existing Description 2',
        thumbnail: {
          path: 'path2',
          extension: 'ext2',
        },
      },
    ];

    const mockData = {
      data: {
        total: 1,
        results: [
          {
            id: 3,
            name: 'New Hero 1',
            description: 'New Description 1',
            thumbnail: {
              path: 'path3',
              extension: 'ext3',
            },
          },
        ],
      },
    };

    checkIfHeroExistTest(mockData.data.results, heros);

    const expectedHeros = [
      {
        id: 1,
        name: 'Existing Hero 1',
        description: 'Existing Description 1',
        thumbnail: {
          path: 'path1',
          extension: 'ext1',
        },
      },
      {
        id: 2,
        name: 'Existing Hero 2',
        description: 'Existing Description 2',
        thumbnail: {
          path: 'path2',
          extension: 'ext2',
        },
      },
      {
        id: 3,
        name: 'New Hero 1',
        description: 'New Description 1',
        thumbnail: {
          path: 'path3',
          extension: 'ext3',
        },
      },
    ];
    expect(heros).toEqual(expectedHeros);
  });
});
