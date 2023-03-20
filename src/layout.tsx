import React from 'react';
import { Outlet } from 'react-router-dom';

import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react';

const Layout = () => {
  return (
    <>
      <header className="bg-marvel-red py-4 px-8 text-white flex items-center justify-between">
        {/* Brand */}
        <a href="/">
          <h1 className="font-marvel text-4xl uppercase"> MARVEL </h1>
        </a>

        {/* Search */}
        <div className="flex items-center bg-neutral-200 rounded-lg gap-2 p-2">
          <input
            type="text"
            className="bg-transparent outline-none text-marvel-red font-semibold"
            placeholder="Search by character name"
          />
          <button className="bg-marvel-red text-white rounded-lg p-2">
            <MagnifyingGlassIcon />
          </button>
        </div>
      </header>
      <Outlet />

      <footer className="fixed bottom-0 w-full">
        <div className="bg-marvel-red py-1 px-2 text-white flex items-center justify-between">
          <p className="font-marvel text-sm font-semibold">
            Data Obtained from{' '}
            <a
              href="https://developer.marvel.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white underline hover:text-slate-800"
            >
              Marvel API
            </a>
          </p>

          <p className="font-marvel text-sm font-bold">
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
