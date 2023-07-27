import ApplicationContainer from "@/components/ApplicationContainer";
import "./globals.css";
import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";

const inter = Fira_Code({ subsets: ["latin"] });

import "./globals.css";

export const metadata: Metadata = {
  title: "Marvel Project",
  description: "Marvel project for FrontEnd Test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApplicationContainer>{children}</ApplicationContainer>
      </body>
    </html>
  );
}
