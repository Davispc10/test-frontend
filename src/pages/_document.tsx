import Document, { Head, Html, Main, NextScript } from "next/document";

export default class ProjectDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        </Head>
        <body>
          <Main />
          <NextScript />

          <div id="porta-content" />
        </body>
      </Html>
    );
  }
}
