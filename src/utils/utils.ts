import { QueryClient } from "react-query";
import { MD5 } from "crypto-js";

export const BASE_URL = "https://gateway.marvel.com/v1/public/";
export const marvelLogo =
	"https://static.vecteezy.com/ti/vetor-gratis/p3/19550621-download-dees-gratis-do-logotipo-da-marvel-gratis-vetor.jpg";
export const defaultDescription = "Description not informed";
export const defaultComicsMessage = "No Comics Available";
export const privateKey = "6164a159a8cdaaeb8ca8d16ddafcab55183bc7b6";
export const publicKey = "6cf3ad63e074469da7eac80efb5e08bd";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60 * 30,
		},
	},
});

export const generateMD5Hash = (input: string): string => {
	return MD5(input).toString();
};

export const generateTimestamp = (): number => {
	return Date.now();
};

export const handleImageError = (
	event: React.SyntheticEvent<HTMLImageElement>
) => {
	event.currentTarget.onerror = null;
	event.currentTarget.src = marvelLogo;
};
