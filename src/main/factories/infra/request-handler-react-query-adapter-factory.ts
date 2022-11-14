import { RequestHandler } from "@/data/contracts";
import { RequestHandlerReactQueryAdapter } from "@/infra/externals";

export const makeRequestHandlerReactQueryAdapter = <T>(): RequestHandler<T> => {
  return new RequestHandlerReactQueryAdapter();
};
