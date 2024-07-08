import { BookOpenText } from 'lucide-react';

export function CharacterComics({ available }: { available?: number }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-md border-2 p-2 md:w-40">
      <span className="text text-4xl text-red-500">{available}</span>
      <BookOpenText />
      <p>comics</p>
    </div>
  );
}
