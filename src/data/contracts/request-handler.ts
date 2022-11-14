export type RequestHandleResult<T> = {
  isLoading: boolean;
  data: T;
  error?: string;
};

export interface RequestHandler<T> {
  handle: (queryKey: string | string[], callback: () => Promise<T>, options?: Record<any, unknown>) => RequestHandleResult<T>;
}
