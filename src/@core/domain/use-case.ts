export interface UseCase<T = any, R = any> {
  execute(params: T): Promise<R>;
}
