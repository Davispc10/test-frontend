import { ListComicsUseCase } from "../../application/Comic/listComics.useCase";
import { AxiosHttpGateway } from "../../infra/gateways/axios-http.geteway";
import { ComicHttpGateway } from "../../infra/gateways/comicGatewayHttp";

//Factory é apenas a fabricação dos meus requests
//Onde optei por criar os requests de forma separadamente
//no caso de eu querer mudar algo em uma request, mudar apenas nela e não em todas
export function FactoryMakeComicsUseCase() {
    const httpGateway = new AxiosHttpGateway();
    const heroGateway = new ComicHttpGateway(httpGateway, String(process.env.NEXT_PUBLIC_BASEURL), String(process.env.NEXT_PUBLIC_PUBLICKEY));
    const useCase = new ListComicsUseCase(heroGateway);

    return useCase;
}
