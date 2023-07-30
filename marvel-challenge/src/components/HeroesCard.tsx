import Link from "next/link";
import { heroesWithoutPhoto } from "@/utils/heroesWithoutPhoto";
import { heroesWithoutDescription } from "@/utils/heroesWithoutDescription";
import { Thumbnail } from "./Thumbnail";

export function HeroesCard({ ...props }) {
  return (
    <>
      <Link
        href={`/hero/${props.id}`}
        key={props.id}
        className=" w-full h-full flex flex-col gap-2 bg-white/5 p-3 rounded-md hover:bg-white/10"
      >
        <Thumbnail
          src={heroesWithoutPhoto(
            `${props.thumbnail.path}.${props.thumbnail.extension}`
          )}
          className="w-full object-cover h-[250px]  max-h-[250px]"
        />
        <strong className="font-semibold">{props.name}</strong>
        <span className="text-xs text-zinc-500">
          {heroesWithoutDescription(props.description)}
        </span>
      </Link>
    </>
  );
}
