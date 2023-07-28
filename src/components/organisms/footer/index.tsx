import { AtomLogo } from "../../atoms/logo";

export const OrganismFooter: React.FC = (): JSX.Element => {
  return (
    <div className="px-3 mt-16 bg-white shadow-lg shadow-slate-400/10">
      <footer className="flex flex-col items-center w-full max-w-5xl m-auto gap-y-3 py-7">
        <AtomLogo />
        <div className="flex flex-col items-center gap-1 text-gray-500 sm:gap-5 sm:flex-row">
          <small>© 2023 - All rights reserved</small>
          <small>
            developed by{" "}
            <a href="" className="font-semibold text-blue-600">
              Rian Junplid
            </a>
          </small>
        </div>
      </footer>
    </div>
  );
};
