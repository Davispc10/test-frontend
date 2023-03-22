import { Outlet } from 'react-router-dom';
import marvelLogo from '@/assets/images/marvel-logo.png';
import FadeUpAnimation from './animations/FadeUp';

const Layout = () => {
  return (
    <>
      <Outlet />

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
            Made by{' '}
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
    </>
  );
};

export default Layout;
