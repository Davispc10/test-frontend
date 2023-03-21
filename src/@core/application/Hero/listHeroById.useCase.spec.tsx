import { ListHeroByIdUseCase } from './listHeroById.useCase';
import { HeroGateway } from '../../domain/gateways/hero.gateway';
import { mockHero } from '@/mocks/hero';
import { Hero } from '../../domain/entities/Hero';

//mocando a funcão findById para a minha promise
export interface HeroGatewayMock extends HeroGateway {
    findById: jest.Mock<Promise<Hero>, [number]> ;
}

describe('ListHeroByIdUseCase', () => {
  let useCase: ListHeroByIdUseCase;
  let heroGateway: HeroGatewayMock;

  beforeEach(() => {
      heroGateway = {
          findById: jest.fn(),
      } as unknown as HeroGatewayMock;

    useCase = new ListHeroByIdUseCase(heroGateway);
  });

  //Deve chamar o método find by id de HeroGateway
  it('Should call findById method from HeroGateway', async () => {
    const id = 123;
    await useCase.execute(id);
    expect(heroGateway.findById).toHaveBeenCalledWith(id);
  });

  // Deve retornar o objeto Hero vindo do HeroGateway
  it('Should return Hero object coming from HeroGateway', async () => {
    const id = 0;
    heroGateway.findById.mockReturnValue(Promise.resolve(mockHero));
    const result = await useCase.execute(0);
    expect(result).toEqual(mockHero);
  });
});
