import Image from "next/image";
import FadeUpAnimation from "../animations/FadeUp";

const HomeHeader = () => {
  return (
    <header className="flex flex-wrap justify-around gap-2 p-4 lg:justify-between lg:py-8 lg:px-20 ">
      {/* Brand */}
      <FadeUpAnimation className="flex flex-col items-center justify-center mt-4 lg:flex-row lg:gap-4">
        <Image
          unoptimized
          width={500}
          height={500}
          priority
          src="/images/marvel-logo.png"
          alt="Marvel Logo"
          className="w-32 lg:w-48"
        />
        <h1 className="text-2xl font-bold text-center uppercase font-marvel lg:text-5xl">
          CHARACTERS CODEX
        </h1>
      </FadeUpAnimation>
    </header>
  );
};

export default HomeHeader;
