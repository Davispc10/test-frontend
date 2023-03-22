import React from 'react';
import FadeUpAnimation from '../../../components/animations/FadeUp';
import Pagination from './Pagination';

const HomeHeader = () => {
  return (
    <header className="flex justify-between gap-2 p-6 flex-wrap lg:pt-8 lg:px-20 ">
      {/* Brand */}
      <FadeUpAnimation
        className="
      flex lg:flex-row flex-col gap-4 items-center
    "
      >
        <img
          src="/images/marvel-logo.png"
          alt="Marvel Logo"
          className="lg:w-48 w-32"
        />
        <h1 className="font-marvel text-2xl text-center lg:text-6xl font-bold uppercase">
          HEROES CODEX
        </h1>
      </FadeUpAnimation>

      {/* Pagination */}
      <Pagination />
    </header>
  );
};

export default HomeHeader;
