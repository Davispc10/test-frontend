import FadeUpAnimation from '../../../components/animations/FadeUp';

const HomeHeader = () => {
  return (
    <header className="flex lg:justify-between justify-around gap-2 p-4 flex-wrap lg:py-8 lg:px-20 ">
      {/* Brand */}
      <FadeUpAnimation
        className="
          flex lg:flex-row flex-col lg:gap-4 items-center justify-center mt-4
        "
      >
        <img
          src="/images/marvel-logo.png"
          alt="Marvel Logo"
          className="lg:w-48 w-32"
        />
        <h1 className="font-marvel text-2xl text-center lg:text-5xl font-bold uppercase">
          CHARACTERS CODEX
        </h1>
      </FadeUpAnimation>
    </header>
  );
};

export default HomeHeader;
