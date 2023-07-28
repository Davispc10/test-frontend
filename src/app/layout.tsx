import './globals.css';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppContext from '../components/AppContext';
import AppContainer from '../components/AppContainer';
import Header from '../components/Header';
import Footer from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Marvel Heroes',
  description: 'Informações detalhadas sobre os heróis da Marvel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext>
          <Header />
          <AppContainer>{children}</AppContainer>
          <Footer />
        </AppContext>
      </body>
    </html>
  );
}
