import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ReactElement } from "react";

interface DefaultLayoutProps {
    children: ReactElement;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    )
}