import { Head, Html, NextScript, Main } from "next/document";
const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Marvel Characters Codex</title>
        <meta
          name="description"
          content="Learn More About your favorite Marvel Characters"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className="bg-zinc-900 text-white bg-comic">
        <Main />
        <NextScript />
      </body>

      <footer className="">
        <div className="bg-marvel-red/90 py-1 px-8 text-white flex lg:flex-row flex-col items-center justify-between">
          <p className="text-xs lg:text-sm">
            <a
              href="http://marvel.com"
              className="text-white hover:text-marvel-blue font-semibold underline"
            >
              Data provided by Marvel. © 2023 MARVEL
            </a>
          </p>

          <p className="text-xs lg:text-sm font-bold">
            Made by{" "}
            <a
              href="https://rafaeldev.me/"
              target="_blank"
              rel="noreferrer"
              className="text-white underline hover:text-slate-800"
            >
              @rafaelsilva81
            </a>
          </p>
        </div>
      </footer>
    </Html>
  );
};

export default Document;
