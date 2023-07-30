import { marvel } from "@/styles/fonts";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import BackgroundImage from "../../public/images/bg.webp";
import Image from "next/image";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={marvel.className}>
        <Image
          src={BackgroundImage}
          alt="Marvel background"
          objectFit="cover"
          priority
          sizes="(max-width: 640px) 640px, 1280px"
          placeholder="blur"
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.1,
            position: "fixed",
            zIndex: -1,
            inset: 0,
            objectFit: "cover",
          }}
        />
        <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}
