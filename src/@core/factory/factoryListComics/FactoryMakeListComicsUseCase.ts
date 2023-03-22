import { ListComicsUseCase } from "../../application/Comic/listComics.useCase";
import { AxiosHttpGateway } from "../../infra/gateways/axios-http.geteway";
import { HeroHttpGateway } from "../../infra/gateways/herosGatewayHttp";

//Factory é apenas a fabricação dos meus requests
//Onde optei por criar os requests de forma separadamente
//no caso de eu querer mudar algo em uma request, mudar apenas nela e não em todas
export function FactoryMakeComicsUseCase(offset = 0) {
    const httpGateway = new AxiosHttpGateway();
    const heroGateway = new HeroHttpGateway(httpGateway, String(process.env.NEXT_PUBLIC_BASEURL), String(process.env.NEXT_PUBLIC_PUBLICKEY), 12, 'name', offset);
    const useCase = new ListComicsUseCase(heroGateway);

    return useCase;
}
