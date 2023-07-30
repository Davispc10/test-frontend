import Providers from '@/services/provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/styles.css';

import AppContainer from '../components/AppContainer';
import AppContext from '../components/AppContext';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './globals.css';

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
        <Providers>
          <AppContext>
            <Header />
            <AppContainer>{children}</AppContainer>
            <Footer />
          </AppContext>
        </Providers>
      </body>
    </html>
  );
}
