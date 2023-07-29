import Link from "next/link";
import { Thumbnail } from "./Thumbnail";

export function Header() {
  return (
    <header className="h-[80px] bg-zinc-800 border-t border-zinc-700 px-6 py-4 flex items-center justify-between">
      <Link className="" href="/">
        <h1 className="font-bold text-lg">MARVEL UNIVERSE</h1>
      </Link>
    </header>
  );
}
