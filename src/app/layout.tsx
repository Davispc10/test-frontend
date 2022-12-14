import { Rubik } from "@next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  preload: true,
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head />
      <body className={`${rubik.variable} font-primary bg-stone-200`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
