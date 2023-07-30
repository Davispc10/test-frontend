import Link from "next/link";
import { heroesWithoutPhoto } from "@/utils/heroesWithoutPhoto";
import { Thumbnail } from "./Thumbnail";
import { heroesWithoutDescription } from "@/utils/heroesWithoutDescription";

export function HeroesItem({ name, image, description, ...props }) {
  return (
    <>
      <div>
        <Link
          href={`/hero/${props.id}`}
          key={props.id}
          className=" w-full h-full flex flex-col gap-2 bg-white/5 p-3 rounded-md hover:bg-white/10"
        >
          <Thumbnail
            src={image}
            className="w-full object-cover h-[150px]  max-h-[150px]"
          />
          <strong className="font-semibold">{name}</strong>
          <span className="text-xs text-zinc-500">{description}</span>
        </Link>
      </div>
    </>
  );
}
