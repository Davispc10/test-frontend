import Image from "next/image";
import marvelLogo from "@/assets/marvel-logo.png";

export function Banner() {
  return (
    <div className="flex sm:flex-col-reverse relative">
      <div className="flex-1 sm:flex-none flex flex-col gap-2 min-h-[88vh] justify-center p-16 relative">
        <Image height={80} src={marvelLogo} alt="logo" />
        <h2 className="text-xl font-bold">
          Discover Marvel Heroes and Villains Through the Marvel API!
        </h2>
        <span className="text-lg">
          Have you ever imagined having access to a universe full of Marvel
          superheroes and villains? Now it's possible with the incredible Marvel
          API! With this powerful tool, you can access detailed information
          about your favorite characters, such as biographies, abilities, comic
          history, and much more.
        </span>
        <span className="flex mt-2">
          <a
            className="px-4 py-3 bg-red-600 hover:bg-red-700 transition-colors rounded-md text-xl uppercase font-bold"
            href="/characters/pages/1"
          >
            Characters
          </a>
        </span>
        <div className="sm:invisible absolute top-0 right-0 bottom-0 w-52 bg-gradient-to-l from-red-600 to-transparent" />
      </div>
      <div className="flex flex-col gap-2 h-[88vh] sm:h-auto justify-center items-center p-8 bg-red-600">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-900 to-transparent" />
        <Image height={220} src={marvelLogo} alt="logo" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-900 to-transparent" />
      </div>
    </div>
  );
}
