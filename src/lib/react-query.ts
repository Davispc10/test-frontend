import {
  DefaultOptions,
  QueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

import { AxiosError } from 'axios';
import { PromiseValue } from 'type-fest';

const queryConfig: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,

    // A API da Marvel não permite mais de 3000 requisições por dia
    // Portanto, iremos tentar reduzir o máximo possível as requisições
    staleTime: 1000 * 60 * 60 * 24, // 24 horas
    cacheTime: 1000 * 60 * 60 * 24, // 24 horas

    retryDelay: 1000 * 1, // 1 segundo
    retry: 3, // 3 tentativas
  },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

// Aqui estamos criando um tipo que vai extrair o tipo de retorno de uma função
// e retornar o tipo de retorno da Promise desse tipo de retorno de função (PromiseValue)
/* export type ExtractFnReturnType<FnType extends (...args: any) => any> =
  PromiseValue<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
  UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
  'queryKey' | 'queryFn'
>;

export type MutationConfig<MutationFnType extends (...args: any) => any> =
  UseMutationOptions<
    ExtractFnReturnType<MutationFnType>,
    AxiosError,
    Parameters<MutationFnType>[0]
  >;
 */
