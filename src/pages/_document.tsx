import { Head, Html, NextScript, Main } from "next/document";
const Document = () => {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
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
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="nositelinkssearchbox" />
        <meta name="google" content="notranslate" />
        <meta name="og:locale" content="en_US" />
        <meta name="og:type" content="website" />
        <meta name="og:site_name" content="Marvel Characters Codex" />
      </Head>

      <body className="text-white bg-zinc-900 bg-comic">
        <Main />
        <NextScript />
      </body>

      <footer>
        <div className="flex flex-col items-center justify-between px-8 py-1 text-white bg-marvel-red/90 lg:flex-row">
          <p className="text-xs lg:text-sm">
            <a
              href="http://marvel.com"
              className="font-semibold text-white underline hover:text-marvel-blue"
            >
              Data provided by Marvel. © 2023 MARVEL
            </a>
          </p>

          <p className="text-xs font-bold lg:text-sm">
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
