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
        <Navbar className="bg-marvel-primary pt-2 pb-1 border-marvel-secondary">
          <h1 className="text-6xl font-marvel text-marvel-white">MARVEL</h1>
        </Navbar>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
