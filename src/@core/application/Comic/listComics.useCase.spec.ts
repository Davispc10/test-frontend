import { ListComicsUseCase } from './listComics.useCase';
import { HeroGateway } from '../../domain/gateways/hero.gateway';
import { Comic } from '../../domain/entities/Comic';
import { mockComic } from '@/mocks/comic';

//mocando a funcão findById do comic para a minha promise
interface HeroGatewayMock extends HeroGateway {
    findComics: jest.Mock<Promise<Comic[]>, [number]> ;
}

describe('ListHeroByIdUseCase', () => {
  let useCase: ListComicsUseCase;
  let heroGateway: HeroGatewayMock;

  beforeEach(() => {
      heroGateway = {
        findComics: jest.fn(),
      } as unknown as HeroGatewayMock;

    useCase = new ListComicsUseCase(heroGateway);
  });

  //Deve chamar o método find by id de Comics
  it('Should call findById method from HeroGateway', async () => {
    await useCase.execute(0);
    expect(heroGateway.findComics).toHaveBeenCalledWith(0);
  });

  // Deve retornar os objetos de comics vindo do HeroGateway
  it('Should return Comic object coming from HeroGateway', async () => {
    const id = 0;
    heroGateway.findComics.mockReturnValue(Promise.resolve<Comic[]>([mockComic]));
    const result = await useCase.execute(0);
    expect(result).toEqual([mockComic]);
  });
});
