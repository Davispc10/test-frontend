import { FloatButtonsCredit } from "@components/float-buttons-credit/float-buttons-credit.component";
import { Button } from "@components/ui/button/button.component";
import { Footer } from "@components/ui/footer/footer.component";
import { Link } from "@components/ui/link/link.component";
import { Navbar } from "@components/ui/navbar/navbar.component";
import { Rubik } from "@next/font/google";
import localFont from "@next/font/local";
import "./globals.css";
import { Providers } from "./providers";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  preload: true,
});

const marvel = localFont({
  src: "../assets/fonts/MarvelRegular.ttf",
  variable: "--font-marvel",
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head />
      <body
        className={`${rubik.variable} ${marvel.variable} font-primary bg-marvel-white`}
      >
        <Navbar className="bg-marvel-primary pt-2 pb-1 border-marvel-black/50">
          <h1 className="text-6xl font-marvel text-marvel-white">MARVEL</h1>
        </Navbar>
        <Providers>{children}</Providers>

        <FloatButtonsCredit>
          <Button
            colorStyle="default"
            as={
              <Link
                href="https://github.com/sydo26/marvel-characters"
                target="_blank"
              />
            }
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            }
          />
        </FloatButtonsCredit>

        <Footer>
          <p className="text-marvel-typo">
            Data provided by{" "}
            <Link href="https://developer.marvel.com/" target="_blank">
              Marvel
            </Link>
            . © 2014 Marvel
          </p>
          <p className="text-marvel-typo">
            Developed by{" "}
            <Link href={"https://github.com/sydo26"} target="_blank">
              Sydo26 💜
            </Link>
            .
          </p>
        </Footer>
      </body>
    </html>
  );
}
