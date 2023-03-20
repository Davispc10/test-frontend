import { ListHeroByIdUseCase } from "../../application/Hero/listHeroById.useCase";
import { AxiosHttpGateway } from "../../infra/gateways/axios-http.geteway";
import { HeroHttpGateway } from "../../infra/gateways/herosGatewayHttp";

export function FactoryMakeListByIdHeroUseCase() {
    const httpGateway = new AxiosHttpGateway();
    const heroGateway = new HeroHttpGateway(httpGateway, String(process.env.NEXT_PUBLIC_BASEURL), String(process.env.NEXT_PUBLIC_PUBLICKEY), 1, 'name', 0);
    const useCase = new ListHeroByIdUseCase(heroGateway);

    return useCase;
}
