import type { AppProps } from "next/app";

import { Header } from "@/components/Header";

import "bootstrap/dist/css/bootstrap.css";
import "@/styles/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}
