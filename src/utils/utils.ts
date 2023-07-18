import { QueryClient } from "react-query"
import { MD5 } from 'crypto-js'

export const BASE_URL = "https://gateway.marvel.com:443/v1/public/"
export const marvelLogo = "https://static.vecteezy.com/ti/vetor-gratis/p3/19550621-download-dees-gratis-do-logotipo-da-marvel-gratis-vetor.jpg"
export const defaultDescription = "Description not informed"

export const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
export const privateKey: string = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 30,
    },
  },
});

export function generateMD5Hash(input: string): string {
  return MD5(input).toString()
}
