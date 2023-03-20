import { ListHeroUseCase } from "../application/Hero/list-heros.use-case";
import { AxiosHttpGateway } from "../infra/gateways/axios-http.geteway";
import { HeroHttpGateway } from "../infra/gateways/hero-gateway-http";

export function FactoryMakeListHeroUseCase(offset = 0) {
    const httpGateway = new AxiosHttpGateway();
    const heroGateway = new HeroHttpGateway(httpGateway, String(process.env.NEXT_PUBLIC_BASEURL), String(process.env.NEXT_PUBLIC_PUBLICKEY), 12, 'name', offset);
    const useCase = new ListHeroUseCase(heroGateway);

    return useCase;
}
