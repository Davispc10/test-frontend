import { useQuery, UseQueryOptions } from "react-query";

import { RequestHandler, RequestHandleResult } from "@/data/contracts";

export class RequestHandlerReactQueryAdapter<T> implements RequestHandler<T> {
  handle(queryKey: string | string[], callback: () => Promise<T>, options?: UseQueryOptions): RequestHandleResult<T> {
    const { isLoading, data, error } = useQuery({
      queryKey,
      queryFn: callback,
    });
    
    if (error) {
      const formattedError = <string>(error as any).response?.data?.status || "Erro inesperado";
      return { isLoading, data, error: formattedError };
    }
    
    return { isLoading, data };
  }
}
