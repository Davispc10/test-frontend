import {
  QueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
  type DefaultOptions,
} from '@tanstack/react-query'
import type { HTTPError } from 'ky'

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })

export type ExtractFnReturnType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FnType extends (...args: Array<any>) => unknown,
> = Awaited<ReturnType<FnType>>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryConfig<QueryFnType extends (...args: Array<any>) => unknown> =
  Omit<
    UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
    'queryKey' | 'queryFn'
  >

export type MutationConfig<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  MutationFnType extends (...args: Array<any>) => any,
> = UseMutationOptions<
  ExtractFnReturnType<MutationFnType>,
  HTTPError,
  Parameters<MutationFnType>[0]
>
