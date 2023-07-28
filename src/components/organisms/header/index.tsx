import { AtomLogo } from "../../atoms/logo";
import { OrganismForm } from "./form";

export const OrganismHeader: React.FC = (): JSX.Element => {
  return (
    <div className="relative px-3 bg-white shadow-lg shadow-slate-400/10">
      <header className="flex items-center justify-between w-full h-16 max-w-5xl m-auto gap-x-3">
        <AtomLogo />
        <OrganismForm />
      </header>
    </div>
  );
};
