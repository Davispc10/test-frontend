import type { AppProps } from "next/app";

//providers
import { ThemeProvider } from "styled-components";

//styles and themes
import GlobalStyle from "../src/styles/globalStyle";
import defaultTheme from "../src/themes/default";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
