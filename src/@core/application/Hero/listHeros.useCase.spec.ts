import { ListHeroUseCase } from './listHeros.useCase';
import { HeroGateway } from '../../domain/gateways/hero.gateway';
import { mockHero } from '@/mocks/hero';
import { Hero } from '../../domain/entities/Hero';

//mocando a funcão findAll para a minha promise
interface HeroGatewayMock extends HeroGateway {
    findAll: jest.Mock<Promise<Hero[]>> ;
}

describe('List All Heros', () => {
  let useCase: ListHeroUseCase;
  let heroGateway: HeroGatewayMock;

  beforeEach(() => {
      heroGateway = {
        findAll: jest.fn(),
      } as unknown as HeroGatewayMock;

    useCase = new ListHeroUseCase(heroGateway);
  });

  //Deve chamar o método findAll de HeroGateway
  it('Should call findAll method from HeroGateway', async () => {
    await useCase.execute();
    expect(heroGateway.findAll).toHaveBeenCalled();
  });

  // Deve retornar o Array de Heros
  // Alguns jogos de tipagem, no caso transformando em promise e tudo mais
  it('Should return Hero object coming from HeroGateway', async () => {
    const id = 0;
    heroGateway.findAll.mockReturnValue(Promise.resolve<Hero[]>([mockHero]));
    const result = await useCase.execute();
    expect(result).toEqual([mockHero]);
  });
});
