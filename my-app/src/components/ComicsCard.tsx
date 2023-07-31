import React from "react";
import Image from "next/image";

interface ComicsProps {
  title: string;
  src: string;
}

function ComicsCard({ title, src }: ComicsProps) {
  return (
    <div className="flex flex-row lg:w-96 items-center m-4 justify-between border-dotted rounded-lg border-4 border-zinc-400">
      <div className="h-12">
        <p className="text-base text-center text-zinc-800 px-4">{title}</p>
      </div>
      <Image
        src={src}
        alt={title}
        width={150}
        height={150}
        unoptimized
        priority
        className="max-w-full	rounded-xl h-52	"
      />
    </div>
  );
}

export default ComicsCard;
