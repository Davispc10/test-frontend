import { ListHeroUseCase } from "../../application/Comic/listComics.useCase";
import { AxiosHttpGateway } from "../../infra/gateways/axios-http.geteway";
import { HeroHttpGateway } from "../../infra/gateways/herosGatewayHttp";

export function FactoryMakeComicsUseCase(offset = 0) {
    const httpGateway = new AxiosHttpGateway();
    const heroGateway = new HeroHttpGateway(httpGateway, String(process.env.NEXT_PUBLIC_BASEURL), String(process.env.NEXT_PUBLIC_PUBLICKEY), 12, 'name', offset);
    const useCase = new ListHeroUseCase(heroGateway);

    return useCase;
}
